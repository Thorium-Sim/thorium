import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {AdvancedTrainingConfig} from "../classes/advancedTraining";
import {AdvancedTrainingProgress} from "../classes/advancedTrainingProgress";
import {CARD_PREREQUISITES} from "../classes/trainingPrerequisites";

// Ensure the array exists on App
if (!App.advancedTrainingProgress) {
  App.advancedTrainingProgress = [];
}

// Helper to find a station's advanced training config
function getStationConfig(stationSetID: string, stationName: string) {
  const stationSet = App.stationSets.find(
    (s: any) => s.id === stationSetID,
  );
  if (!stationSet) return null;
  const station = stationSet.stations.find(
    (s: any) => s.name === stationName,
  );
  return station;
}

// Helper to get a client's training config from their station
function getClientTrainingConfig(clientId: string) {
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client || !client.simulatorId || !client.station) return null;

  // Look up the station directly on the simulator (not the station set template,
  // which has a different simulatorId — the template's, not the flight instance's)
  const simulator = App.simulators.find(
    (s: any) => s.id === client.simulatorId,
  );
  if (!simulator) return null;

  const station = simulator.stations?.find(
    (s: any) => s.name === client.station,
  );
  if (!station || !station.advancedTraining?.enabled) return null;

  return station.advancedTraining;
}

function publishProgress() {
  pubsub.publish(
    "advancedTrainingProgressUpdate",
    App.advancedTrainingProgress || [],
  );
}

function publishClientChanged() {
  pubsub.publish("clientChanged", App.clients);
}

// Register global listeners for prerequisite events so FD-fired mutations
// (not just crew actions) unlock chapters as expected.
const allPrerequisiteEvents = new Set<string>(
  Object.values(CARD_PREREQUISITES).flat(),
);

for (const eventName of allPrerequisiteEvents) {
  App.on(eventName, (args: any) => {
    const simulatorId =
      args?.simulatorId ||
      (args?.clientId
        ? App.clients.find((c: any) => c.id === args.clientId)?.simulatorId
        : null);
    if (!simulatorId) return;

    const affected = (App.advancedTrainingProgress || []).filter(
      (p: any) => p.simulatorId === simulatorId,
    );
    if (affected.length === 0) return;

    for (const prog of affected) {
      prog.observeEvent(eventName);
    }
    publishProgress();
  });
}

// Auto-complete a chapter that has no subchapters immediately upon activation.
function autoCompleteIfEmpty(progress: AdvancedTrainingProgress, chapter: any) {
  if ((chapter.subChapters || []).length === 0) {
    progress.completeChapter(chapter.id);
    return true;
  }
  return false;
}

// Advance to the chapter that follows completedChapter, respecting autoAdvance,
// autoOpenMedia, and cardSwitchBehavior. Resets mediaViewerOpen before opening.
function advanceToNextChapter(
  progress: AdvancedTrainingProgress,
  config: any,
  completedChapter: any,
  clientId: string,
) {
  if (!completedChapter.autoAdvance) return;

  let nextChapter: any = null;

  if (config.loginChapter?.id === completedChapter.id) {
    nextChapter = config.chapters[0] || null;
  } else if (config.completionChapter?.id === completedChapter.id) {
    nextChapter = null;
  } else {
    const chapterIdx = config.chapters.findIndex(
      (c: any) => c.id === completedChapter.id,
    );
    if (chapterIdx === -1) return;
    nextChapter = config.chapters[chapterIdx + 1] || null;
    if (!nextChapter && config.completionChapter) {
      nextChapter = config.completionChapter;
    }
  }

  if (!nextChapter) return;

  progress.setMediaViewerOpen(false);
  progress.setActiveChapter(nextChapter.id);

  if (!autoCompleteIfEmpty(progress, nextChapter)) {
    const firstSub = nextChapter.subChapters[0];
    progress.setActiveSubChapter(firstSub?.id || null);
  } else {
    // nextChapter had no sub-chapters and was immediately auto-completed.
    // Chain forward so a sequence of empty autoAdvance chapters doesn't stall.
    advanceToNextChapter(progress, config, nextChapter, clientId);
    return;
  }

  if (nextChapter.autoOpenMedia && nextChapter.mediaAsset) {
    progress.setMediaViewerOpen(true);
  }

  if (nextChapter.cardSwitchBehavior === "auto" && nextChapter.cardComponent) {
    const client = App.clients.find((c: any) => c.id === clientId);
    if (client) {
      const simulator = App.simulators.find(
        (s: any) => s.id === client.simulatorId,
      );
      if (simulator) {
        const station = simulator.stations?.find(
          (s: any) => s.name === client.station,
        );
        const targetCard = station?.cards?.find(
          (c: any) => c.component === nextChapter.cardComponent,
        );
        if (targetCard) {
          App.handleEvent(
            {id: clientId, card: targetCard.name},
            "clientSetCard",
            {clientId},
          );
        }
      }
    }
  }
}

// --- Configuration events ---
// These are handled by explicit mutation resolvers in the typeDef.
// The event handlers here are no-ops; they exist so App.emit doesn't
// throw an "unhandled event" warning.

App.on("setStationAdvancedTraining", () => {});
App.on("toggleAdvancedTrainingMode", () => {});

// --- Client training session events ---

App.on("clientStartAdvancedTraining", ({clientId}: any) => {
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client) return;

  const config = getClientTrainingConfig(clientId);
  if (!config) return;

  // Remove any existing progress for this client
  App.advancedTrainingProgress = (App.advancedTrainingProgress || []).filter(
    (p: any) => p.clientId !== clientId,
  );

  // Create new progress — start at login chapter if configured, else first regular chapter
  const startChapter = config.loginChapter || config.chapters[0];
  const firstSubChapter = startChapter?.subChapters?.[0];
  const progress = new AdvancedTrainingProgress({
    clientId: client.id,
    simulatorId: client.simulatorId,
    stationName: client.station,
    activeChapterId: startChapter?.id || null,
    activeSubChapterId: firstSubChapter?.id || null,
    mediaViewerOpen: !!(startChapter?.autoOpenMedia && startChapter?.mediaAsset),
  });

  App.advancedTrainingProgress.push(progress);

  // Fire immediate auto-login before auto-complete so the clientLogin action is
  // tracked against the loginChapter while it's still the active chapter.
  // (If it fired after chaining, it would land on whatever chapter ended up active.)
  if (config.loginChapter?.autoLogin === "immediate") {
    App.emit("clientLogin", {client: clientId, loginName: client.station});
    App.emit("clientAdvancedTrainingAction", {clientId, eventName: "clientLogin", args: null});
  }

  // Auto-complete the starting chapter if it has no sub-chapters, then chain
  // forward if it also has autoAdvance. Guard on activeChapterId in case the
  // clientAdvancedTrainingAction above already advanced the chapter (e.g. a
  // clientLogin sub-chapter completed it).
  if (startChapter && progress.activeChapterId === startChapter.id) {
    if (autoCompleteIfEmpty(progress, startChapter)) {
      advanceToNextChapter(progress, config, startChapter, clientId);
    }
  }

  // Also set the legacy training flag so the system knows
  client.setTraining(true);

  publishProgress();
  publishClientChanged();
});

App.on("clientStopAdvancedTraining", ({clientId}: any) => {
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client) return;

  App.advancedTrainingProgress = (App.advancedTrainingProgress || []).filter(
    (p: any) => p.clientId !== clientId,
  );

  client.setTraining(false);

  publishProgress();
  publishClientChanged();
});

// --- Action tracking ---

App.on("clientAdvancedTrainingAction", ({clientId, eventName, args}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress || !progress.activeChapterId) return;

  // Track every event globally for prerequisite checking
  progress.observeEvent(eventName);

  const config = getClientTrainingConfig(clientId);
  if (!config) return;

  const chapter = config.findChapter(progress.activeChapterId);
  if (!chapter) return;

  // Find the active sub-chapter, or check all incomplete sub-chapters in order
  const subChaptersToCheck = progress.activeSubChapterId
    ? [chapter.getSubChapter(progress.activeSubChapterId)].filter(Boolean)
    : chapter.subChapters.filter(
        (sc: any) => !progress.isSubChapterComplete(sc.id),
      );

  for (const subChapter of subChaptersToCheck) {
    if (!subChapter) continue;

    // Check if this action matches any required action in this sub-chapter.
    // Match on eventName alone — args like simulatorId, clientId, etc. will
    // always differ between the recording session and a live flight, so
    // strict arg comparison would never match.
    // __videoComplete__ is a synthetic event fired by the media viewer and
    // can be added as a required action just like any other event.
    const matchingAction = subChapter.requiredActions.find(
      (ra: any) => ra.eventName === eventName,
    );

    if (matchingAction) {
      progress.recordAction(subChapter.id, eventName);

      // Check if all required actions for this sub-chapter are now done
      const allDone = subChapter.requiredActions.every((ra: any) =>
        (progress.observedActions[subChapter.id] || []).includes(ra.eventName),
      );

      if (allDone) {
        progress.completeSubChapter(subChapter.id);

        // Move to next incomplete sub-chapter
        const nextSubChapter = chapter.subChapters.find(
          (sc: any) => !progress.isSubChapterComplete(sc.id),
        );
        progress.setActiveSubChapter(nextSubChapter?.id || null);

        // Check if all sub-chapters for this chapter are complete
        const chapterDone = chapter.subChapters.every((sc: any) =>
          progress.isSubChapterComplete(sc.id),
        );

        if (chapterDone) {
          progress.completeChapter(chapter.id);

          // Auto-login on login chapter completion if configured
          if (
            config.loginChapter?.id === chapter.id &&
            config.loginChapter?.autoLogin === "on-complete"
          ) {
            const clientObj = App.clients.find((c: any) => c.id === clientId);
            if (clientObj) {
              App.emit("clientLogin", {client: clientId, loginName: clientObj.station});
              App.emit("clientAdvancedTrainingAction", {clientId, eventName: "clientLogin", args: null});
            }
          }

          advanceToNextChapter(progress, config, chapter, clientId);
        }
      }

      // Only process the first matching sub-chapter
      break;
    }
  }

  publishProgress();
});

// --- Navigation events ---

App.on("advancedTrainingSetActiveChapter", ({clientId, chapterId}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) return;

  const config = getClientTrainingConfig(clientId);
  if (!config) return;

  const chapter = config.findChapter(chapterId);
  if (!chapter) return;

  // Block navigation to locked chapters in sequential mode
  // (skip for login/completion chapters — those are auto-managed)
  const isSpecialChapter =
    config.loginChapter?.id === chapterId ||
    config.completionChapter?.id === chapterId;

  if (!isSpecialChapter && config.sequentialChapters) {
    const chapterIdx = config.chapters.findIndex((c: any) => c.id === chapterId);
    if (chapterIdx > 0) {
      const prevChapter = config.chapters[chapterIdx - 1];
      if (!progress.isChapterComplete(prevChapter.id)) return;
    }
  }

  // Block navigation to chapters whose system prerequisites haven't fired
  if (!isSpecialChapter) {
    const prerequisites = CARD_PREREQUISITES[chapter.cardComponent] || [];
    const unmet = prerequisites.filter(
      (evt: string) => !progress.globalObservedEvents.includes(evt),
    );
    if (unmet.length > 0) return;
  }

  progress.setActiveChapter(chapterId);
  // Auto-complete chapter if it has no subchapters; otherwise seek first incomplete
  if (!autoCompleteIfEmpty(progress, chapter)) {
    const firstIncompleteSub = chapter.subChapters.find(
      (sc: any) => !progress.isSubChapterComplete(sc.id),
    );
    progress.setActiveSubChapter(
      firstIncompleteSub?.id || chapter.subChapters[0]?.id || null,
    );
  }

  progress.setMediaViewerOpen(!!(chapter.autoOpenMedia && chapter.mediaAsset));

  // Handle card switching
  if (chapter.cardSwitchBehavior === "auto" && chapter.cardComponent) {
    const client = App.clients.find((c: any) => c.id === clientId);
    if (client) {
      const simulator = App.simulators.find(
        (s: any) => s.id === client.simulatorId,
      );
      if (simulator) {
        const station = simulator.stations?.find(
          (s: any) => s.name === client.station,
        );
        const targetCard = station?.cards?.find(
          (c: any) => c.component === chapter.cardComponent,
        );
        if (targetCard) {
          App.handleEvent(
            {id: clientId, card: targetCard.name},
            "clientSetCard",
            {clientId},
          );
        }
      }
    }
  }

  publishProgress();
});

// --- FD intervention events ---

App.on("fdCompleteTrainingSubChapter", ({clientId, subChapterId}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) return;

  progress.completeSubChapter(subChapterId);

  const config = getClientTrainingConfig(clientId);
  if (config && progress.activeChapterId) {
    const chapter = config.findChapter(progress.activeChapterId);
    if (chapter) {
      const nextSubChapter = chapter.subChapters.find(
        (sc: any) => !progress.isSubChapterComplete(sc.id),
      );
      progress.setActiveSubChapter(nextSubChapter?.id || null);

      const chapterDone = chapter.subChapters.every((sc: any) =>
        progress.isSubChapterComplete(sc.id),
      );
      if (chapterDone) {
        progress.completeChapter(chapter.id);

        if (
          config.loginChapter?.id === chapter.id &&
          config.loginChapter?.autoLogin === "on-complete"
        ) {
          const clientObj = App.clients.find((c: any) => c.id === clientId);
          if (clientObj) {
            App.emit("clientLogin", {client: clientId, loginName: clientObj.station});
          }
        }

        advanceToNextChapter(progress, config, chapter, clientId);
      }
    }
  }

  publishProgress();
});

App.on("fdResetTrainingProgress", ({clientId}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) return;

  const config = getClientTrainingConfig(clientId);
  progress.reset();

  // Re-activate first chapter (login chapter if configured, else first regular)
  if (config) {
    const startChapter = config.loginChapter || config.chapters[0] || null;
    if (startChapter) {
      progress.setActiveChapter(startChapter.id);
      if (!autoCompleteIfEmpty(progress, startChapter)) {
        progress.setActiveSubChapter(startChapter.subChapters[0]?.id || null);
      } else {
        advanceToNextChapter(progress, config, startChapter, clientId);
      }
    }

    if (config.loginChapter?.autoLogin === "immediate") {
      const client = App.clients.find((c: any) => c.id === clientId);
      if (client) {
        App.emit("clientLogin", {client: clientId, loginName: client.station});
        App.emit("clientAdvancedTrainingAction", {clientId, eventName: "clientLogin", args: null});
      }
    }
  }

  publishProgress();
});

// --- UI state events ---

App.on("advancedTrainingToggleMediaViewer", ({clientId, open}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) return;
  progress.setMediaViewerOpen(open);
  publishProgress();
});

App.on("advancedTrainingToggleChapterList", ({clientId, open}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) return;
  progress.setChapterListOpen(open);
  publishProgress();
});
