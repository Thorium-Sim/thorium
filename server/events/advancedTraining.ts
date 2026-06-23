import App from "../app";
import {AdvancedTrainingProgress} from "../classes/advancedTrainingProgress";
import {CARD_PREREQUISITES} from "../classes/trainingPrerequisites";
import {
  getClientTrainingConfig,
  publishProgress,
  publishClientChanged,
  autoCompleteIfEmpty,
  advanceToNextChapter,
  activateChapter,
} from "./advancedTrainingHelpers";
// Registers the FD-intervention and UI-state listeners as a side effect.
import "./advancedTrainingFdEvents";

// Ensure the array exists on App
if (!App.advancedTrainingProgress) {
  App.advancedTrainingProgress = [];
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
    if (!simulatorId) {
      return;
    }

    const affected = (App.advancedTrainingProgress || []).filter(
      (p: any) => p.simulatorId === simulatorId,
    );
    if (affected.length === 0) {
      return;
    }

    for (const prog of affected) {
      prog.observeEvent(eventName);
    }
    publishProgress();
  });
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
  if (!client) {
    return;
  }

  const config = getClientTrainingConfig(clientId);
  if (!config) {
    return;
  }

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
    mediaViewerOpen: !!(
      startChapter?.autoOpenMedia && startChapter?.mediaAsset
    ),
  });

  App.advancedTrainingProgress.push(progress);

  // Fire immediate auto-login before auto-complete so the clientLogin action is
  // tracked against the loginChapter while it's still the active chapter.
  // (If it fired after chaining, it would land on whatever chapter ended up active.)
  if (config.loginChapter?.autoLogin === "immediate") {
    App.emit("clientLogin", {client: clientId, loginName: client.station});
    App.emit("clientAdvancedTrainingAction", {
      clientId,
      eventName: "clientLogin",
      args: null,
    });
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
  if (!client) {
    return;
  }

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
  if (!progress || !progress.activeChapterId) {
    return;
  }

  // Track every event globally for prerequisite checking
  progress.observeEvent(eventName);

  const config = getClientTrainingConfig(clientId);
  if (!config) {
    return;
  }

  const chapter = config.findChapter(progress.activeChapterId);
  if (!chapter) {
    return;
  }

  // Find the active sub-chapter, or check all incomplete sub-chapters in order
  const subChaptersToCheck = progress.activeSubChapterId
    ? [chapter.getSubChapter(progress.activeSubChapterId)].filter(Boolean)
    : chapter.subChapters.filter(
        (sc: any) => !progress.isSubChapterComplete(sc.id),
      );

  for (const subChapter of subChaptersToCheck) {
    if (!subChapter) {
      continue;
    }

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

          // In-flight help is ad-hoc — once finished it stays on screen until
          // the crew dismisses it (or navigates away). Never auto-advance into
          // the main chapter sequence and never auto-close.
          if (progress.inFlightHelp || config.isInFlightChapter(chapter.id)) {
            break;
          }

          // Auto-login on login chapter completion if configured
          if (
            config.loginChapter?.id === chapter.id &&
            config.loginChapter?.autoLogin === "on-complete"
          ) {
            const clientObj = App.clients.find((c: any) => c.id === clientId);
            if (clientObj) {
              App.emit("clientLogin", {
                client: clientId,
                loginName: clientObj.station,
              });
              App.emit("clientAdvancedTrainingAction", {
                clientId,
                eventName: "clientLogin",
                args: null,
              });
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
  if (!progress) {
    return;
  }

  const config = getClientTrainingConfig(clientId);
  if (!config) {
    return;
  }

  const chapter = config.findChapter(chapterId);
  if (!chapter) {
    return;
  }

  // Block navigation to locked chapters in sequential mode
  // (skip for login/completion chapters — those are auto-managed)
  const isSpecialChapter =
    config.loginChapter?.id === chapterId ||
    config.completionChapter?.id === chapterId;

  if (!isSpecialChapter && config.sequentialChapters) {
    const chapterIdx = config.chapters.findIndex(
      (c: any) => c.id === chapterId,
    );
    if (chapterIdx > 0) {
      const prevChapter = config.chapters[chapterIdx - 1];
      if (!progress.isChapterComplete(prevChapter.id)) {
        return;
      }
    }
  }

  // Block navigation to chapters whose system prerequisites haven't fired
  if (!isSpecialChapter) {
    const prerequisites = CARD_PREREQUISITES[chapter.cardComponent] || [];
    const unmet = prerequisites.filter(
      (evt: string) => !progress.globalObservedEvents.includes(evt),
    );
    if (unmet.length > 0) {
      return;
    }
  }

  activateChapter(progress, config, chapter, clientId);

  publishProgress();
});

// --- In-flight help events ---

App.on("clientRequestTrainingHelp", ({clientId}: any) => {
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client) {
    return;
  }

  const config = getClientTrainingConfig(clientId);

  // No advanced training enabled for this station — fall back to the default
  // help/question-mark behavior (legacy tour, handled by clientSetTraining).
  if (!config) {
    App.handleEvent({client: clientId, training: true}, "clientSetTraining");
    return;
  }

  // Resolve the crew's current card component (same source as the currentCard
  // resolver: the simulator's per-client card assignment).
  const simulator = App.simulators.find(
    (s: any) => s.id === client.simulatorId,
  );
  const station = simulator?.stations?.find(
    (s: any) => s.name === client.station,
  );
  const currentCardName = simulator?.clientCards?.[clientId];
  const currentCard = station?.cards?.find(
    (c: any) => c.name === currentCardName,
  );
  const cardComponent = currentCard?.component || "";

  // Priority: an in-flight help chapter dedicated to this card, else fall back
  // to a regular chapter associated with it. Skip entirely if we can't resolve
  // the current card so a chapter with an empty cardComponent is never matched
  // by accident.
  const inFlightChapter = cardComponent
    ? config.findInFlightChapterByCard(cardComponent)
    : undefined;
  // Fallback: a regular sequence chapter authored for this card, used when the
  // card has no dedicated in-flight chapter ("location that doesn't have it
  // defined").
  const fallbackChapter =
    !inFlightChapter && cardComponent
      ? config.chapters.find((c: any) => c.cardComponent === cardComponent)
      : undefined;
  const target = inFlightChapter || fallbackChapter;

  // No chapter associated with this card — default begin-training behavior
  // (full advanced training from the start, via clientSetTraining).
  if (!target) {
    App.handleEvent({client: clientId, training: true}, "clientSetTraining");
    return;
  }

  // Ensure a training session exists without resetting one already in progress.
  let progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) {
    progress = new AdvancedTrainingProgress({
      clientId: client.id,
      simulatorId: client.simulatorId,
      stationName: client.station,
    });
    App.advancedTrainingProgress.push(progress);
    client.setTraining(true);
  }

  // Mark this as an in-flight help session so completion never auto-advances or
  // auto-closes — it stays until the crew dismisses it. When the help came from
  // the fallback (a card without a dedicated in-flight chapter), bind it to the
  // current card so navigating away auto-closes it.
  progress.inFlightHelp = true;
  progress.inFlightHelpCard = fallbackChapter ? cardComponent : null;

  // Jump straight to the target chapter, bypassing sequential/prerequisite
  // locks — this is an explicit help request.
  activateChapter(progress, config, target, clientId);

  publishProgress();
  publishClientChanged();
});

// In-flight help launched on a card without a dedicated in-flight chapter is
// bound to that card. When the crew navigates to a different card, the ad-hoc
// help is no longer relevant, so auto-close it. (This listener runs alongside
// the primary clientSetCard handler in events/clients.ts.)
App.on("clientSetCard", ({id, card}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === id,
  );
  if (!progress || !progress.inFlightHelpCard) {
    return;
  }

  const client = App.clients.find((c: any) => c.id === id);
  if (!client) {
    return;
  }

  const simulator = App.simulators.find(
    (s: any) => s.id === client.simulatorId,
  );
  const station = simulator?.stations?.find(
    (s: any) => s.name === client.station,
  );
  const newCard = station?.cards?.find((c: any) => c.name === card);
  const newComponent = newCard?.component || "";

  // Still on the bound card (e.g. the help itself switched the crew to it) —
  // leave the session open.
  if (newComponent === progress.inFlightHelpCard) {
    return;
  }

  App.handleEvent({clientId: id}, "clientStopAdvancedTraining");
});
