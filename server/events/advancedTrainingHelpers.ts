import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {AdvancedTrainingProgress} from "../classes/advancedTrainingProgress";

// Shared helpers for the advanced-training event handlers. Kept separate from
// the listener registrations in ./advancedTraining so neither file grows
// unwieldy.

// Resolve a client's training config from the station they're currently on.
// Returns null unless the station has advanced training explicitly enabled.
export function getClientTrainingConfig(clientId: string) {
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client || !client.simulatorId || !client.station) {
    return null;
  }

  // Look up the station directly on the simulator (not the station set template,
  // which has a different simulatorId — the template's, not the flight instance's)
  const simulator = App.simulators.find(
    (s: any) => s.id === client.simulatorId,
  );
  if (!simulator) {
    return null;
  }

  const station = simulator.stations?.find(
    (s: any) => s.name === client.station,
  );
  if (!station || !station.advancedTraining?.enabled) {
    return null;
  }

  return station.advancedTraining;
}

export function publishProgress() {
  pubsub.publish(
    "advancedTrainingProgressUpdate",
    App.advancedTrainingProgress || [],
  );
}

export function publishClientChanged() {
  pubsub.publish("clientChanged", App.clients);
}

// Auto-complete a chapter that has no subchapters immediately upon activation.
export function autoCompleteIfEmpty(
  progress: AdvancedTrainingProgress,
  chapter: any,
) {
  if ((chapter.subChapters || []).length === 0) {
    progress.completeChapter(chapter.id);
    return true;
  }
  return false;
}

// Switch the crew's card to the one backing a chapter, when that chapter
// requests automatic card switching. No-ops gracefully if the card isn't on the
// station (e.g. an in-flight help chapter authored for a card added later).
function autoSwitchCardForChapter(chapter: any, clientId: string) {
  if (chapter.cardSwitchBehavior !== "auto" || !chapter.cardComponent) {
    return;
  }
  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client) {
    return;
  }
  const simulator = App.simulators.find(
    (s: any) => s.id === client.simulatorId,
  );
  const station = simulator?.stations?.find(
    (s: any) => s.name === client.station,
  );
  const targetCard = station?.cards?.find(
    (c: any) => c.component === chapter.cardComponent,
  );
  if (targetCard) {
    App.handleEvent({id: clientId, card: targetCard.name}, "clientSetCard", {
      clientId,
    });
  }
}

// Advance to the chapter that follows completedChapter, respecting autoAdvance,
// autoOpenMedia, and cardSwitchBehavior. Resets mediaViewerOpen before opening.
export function advanceToNextChapter(
  progress: AdvancedTrainingProgress,
  config: any,
  completedChapter: any,
  clientId: string,
) {
  if (!completedChapter.autoAdvance) {
    return;
  }

  let nextChapter: any = null;

  if (config.loginChapter?.id === completedChapter.id) {
    nextChapter = config.chapters[0] || null;
  } else if (config.completionChapter?.id === completedChapter.id) {
    nextChapter = null;
  } else {
    const chapterIdx = config.chapters.findIndex(
      (c: any) => c.id === completedChapter.id,
    );
    if (chapterIdx === -1) {
      return;
    }
    nextChapter = config.chapters[chapterIdx + 1] || null;
    if (!nextChapter && config.completionChapter) {
      nextChapter = config.completionChapter;
    }
  }

  if (!nextChapter) {
    return;
  }

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

  autoSwitchCardForChapter(nextChapter, clientId);
}

// Activate a chapter for a client: set it active, seek the first incomplete
// sub-chapter (or auto-complete it if empty), open media if configured, and
// switch the crew's card if the chapter requests auto card switching. Does NOT
// enforce sequential/prerequisite locks — callers gate that themselves.
export function activateChapter(
  progress: AdvancedTrainingProgress,
  config: any,
  chapter: any,
  clientId: string,
) {
  progress.setActiveChapter(chapter.id);

  if (!autoCompleteIfEmpty(progress, chapter)) {
    const firstIncompleteSub = chapter.subChapters.find(
      (sc: any) => !progress.isSubChapterComplete(sc.id),
    );
    progress.setActiveSubChapter(
      firstIncompleteSub?.id || chapter.subChapters[0]?.id || null,
    );
  }

  progress.setMediaViewerOpen(!!(chapter.autoOpenMedia && chapter.mediaAsset));

  autoSwitchCardForChapter(chapter, clientId);
}
