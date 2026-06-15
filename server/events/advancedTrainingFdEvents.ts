import App from "../app";
import {
  getClientTrainingConfig,
  publishProgress,
  autoCompleteIfEmpty,
  advanceToNextChapter,
} from "./advancedTrainingHelpers";

// Flight-Director intervention and UI-state listeners for advanced training.
// Split out from ./advancedTraining (which owns the crew-driven session and
// action-tracking listeners) to keep each file focused.

// --- FD intervention events ---

App.on("fdCompleteTrainingSubChapter", ({clientId, subChapterId}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) {
    return;
  }

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

        // In-flight help stays on screen until the crew dismisses it; never
        // auto-advance into the main chapter sequence.
        if (!(progress.inFlightHelp || config.isInFlightChapter(chapter.id))) {
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
            }
          }

          advanceToNextChapter(progress, config, chapter, clientId);
        }
      }
    }
  }

  publishProgress();
});

App.on("fdResetTrainingProgress", ({clientId}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) {
    return;
  }

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
        App.emit("clientAdvancedTrainingAction", {
          clientId,
          eventName: "clientLogin",
          args: null,
        });
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
  if (!progress) {
    return;
  }
  progress.setMediaViewerOpen(open);
  publishProgress();
});

App.on("advancedTrainingToggleChapterList", ({clientId, open}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) {
    return;
  }
  progress.setChapterListOpen(open);
  publishProgress();
});
