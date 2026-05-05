import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {AdvancedTrainingConfig} from "../classes/advancedTraining";
import {AdvancedTrainingProgress} from "../classes/advancedTrainingProgress";

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
    mediaViewerOpen: startChapter?.autoOpenMedia ?? false,
  });

  App.advancedTrainingProgress.push(progress);

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

          // Auto-advance to next chapter if configured
          if (chapter.autoAdvance) {
            let nextChapter: any = null;

            if (config.loginChapter?.id === chapter.id) {
              // Login chapter complete → go to first regular chapter
              nextChapter = config.chapters[0] || null;
            } else if (config.completionChapter?.id === chapter.id) {
              // Completion chapter is terminal, no further advance
              nextChapter = null;
            } else {
              // Regular chapter — find the next one
              const chapterIdx = config.chapters.findIndex(
                (c: any) => c.id === chapter.id,
              );
              nextChapter = config.chapters[chapterIdx + 1] || null;
              // If no next regular chapter, go to completion chapter if configured
              if (!nextChapter && config.completionChapter) {
                nextChapter = config.completionChapter;
              }
            }

            if (nextChapter) {
              progress.setActiveChapter(nextChapter.id);
              const firstSub = nextChapter.subChapters[0];
              progress.setActiveSubChapter(firstSub?.id || null);

              // Auto-open media if configured
              if (nextChapter.autoOpenMedia && nextChapter.mediaAsset) {
                progress.setMediaViewerOpen(true);
              }

              // Handle card switching (only for regular chapters with a cardComponent)
              if (nextChapter.cardSwitchBehavior === "auto" && nextChapter.cardComponent) {
                const client = App.clients.find(
                  (c: any) => c.id === clientId,
                );
                if (client) {
                  // Find the card on the station that matches the next chapter's component
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
          }
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

  progress.setActiveChapter(chapterId);
  const firstIncompleteSub = chapter.subChapters.find(
    (sc: any) => !progress.isSubChapterComplete(sc.id),
  );
  progress.setActiveSubChapter(
    firstIncompleteSub?.id || chapter.subChapters[0]?.id || null,
  );

  // Auto-open media if configured
  if (chapter.autoOpenMedia && chapter.mediaAsset) {
    progress.setMediaViewerOpen(true);
  }

  // Handle card switching
  if (chapter.cardSwitchBehavior === "auto") {
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

  // Check if this completes the chapter
  const config = getClientTrainingConfig(clientId);
  if (config && progress.activeChapterId) {
    const chapter = config.getChapter(progress.activeChapterId);
    if (chapter) {
      const chapterDone = chapter.subChapters.every((sc: any) =>
        progress.isSubChapterComplete(sc.id),
      );
      if (chapterDone) {
        progress.completeChapter(chapter.id);
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
      progress.setActiveSubChapter(startChapter.subChapters[0]?.id || null);
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
