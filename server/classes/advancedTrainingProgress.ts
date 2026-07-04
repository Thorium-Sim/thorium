import uuid from "uuid";

export interface AdvancedTrainingProgressParams {
  id?: string;
  clientId?: string;
  simulatorId?: string;
  stationName?: string;
  activeChapterId?: string | null;
  activeSubChapterId?: string | null;
  completedChapterIds?: string[];
  completedSubChapterIds?: string[];
  observedActions?: Record<string, string[]>;
  globalObservedEvents?: string[];
  mediaViewerOpen?: boolean;
  chapterListOpen?: boolean;
  inFlightHelp?: boolean;
  inFlightHelpCard?: string | null;
}

export class AdvancedTrainingProgress {
  id: string;
  clientId: string;
  simulatorId: string;
  stationName: string;
  activeChapterId: string | null;
  activeSubChapterId: string | null;
  completedChapterIds: string[];
  completedSubChapterIds: string[];
  observedActions: Record<string, string[]>;
  globalObservedEvents: string[];
  mediaViewerOpen: boolean;
  chapterListOpen: boolean;
  // True when this session was launched as ad-hoc in-flight help (the crew
  // clicked the help button mid-flight) rather than as a full training run.
  // In-flight help never auto-advances into the main sequence and never
  // auto-closes on chapter completion — it stays until the crew dismisses it.
  inFlightHelp: boolean;
  // When set, the card component this in-flight help was launched on. Used for
  // help shown on a card without a dedicated in-flight chapter: navigating to a
  // different card auto-closes the help. Null means no card binding.
  inFlightHelpCard: string | null;

  constructor(params: AdvancedTrainingProgressParams = {}) {
    this.id = params.id || uuid.v4();
    this.clientId = params.clientId || "";
    this.simulatorId = params.simulatorId || "";
    this.stationName = params.stationName || "";
    this.activeChapterId = params.activeChapterId || null;
    this.activeSubChapterId = params.activeSubChapterId || null;
    this.completedChapterIds = params.completedChapterIds || [];
    this.completedSubChapterIds = params.completedSubChapterIds || [];
    this.observedActions = params.observedActions || {};
    this.globalObservedEvents = params.globalObservedEvents || [];
    this.mediaViewerOpen = params.mediaViewerOpen ?? false;
    this.chapterListOpen = params.chapterListOpen ?? false;
    this.inFlightHelp = params.inFlightHelp ?? false;
    this.inFlightHelpCard = params.inFlightHelpCard ?? null;
  }

  setActiveChapter(chapterId: string | null) {
    this.activeChapterId = chapterId;
    this.activeSubChapterId = null;
  }

  setActiveSubChapter(subChapterId: string | null) {
    this.activeSubChapterId = subChapterId;
  }

  recordAction(subChapterId: string, eventName: string) {
    if (!this.observedActions[subChapterId]) {
      this.observedActions[subChapterId] = [];
    }
    if (!this.observedActions[subChapterId].includes(eventName)) {
      this.observedActions[subChapterId].push(eventName);
    }
  }

  observeEvent(eventName: string) {
    if (!this.globalObservedEvents.includes(eventName)) {
      this.globalObservedEvents.push(eventName);
    }
  }

  completeSubChapter(subChapterId: string) {
    if (!this.completedSubChapterIds.includes(subChapterId)) {
      this.completedSubChapterIds.push(subChapterId);
    }
  }

  completeChapter(chapterId: string) {
    if (!this.completedChapterIds.includes(chapterId)) {
      this.completedChapterIds.push(chapterId);
    }
  }

  isSubChapterComplete(subChapterId: string): boolean {
    return this.completedSubChapterIds.includes(subChapterId);
  }

  isChapterComplete(chapterId: string): boolean {
    return this.completedChapterIds.includes(chapterId);
  }

  setMediaViewerOpen(open: boolean) {
    this.mediaViewerOpen = open;
  }

  setChapterListOpen(open: boolean) {
    this.chapterListOpen = open;
  }

  reset() {
    this.activeChapterId = null;
    this.activeSubChapterId = null;
    this.completedChapterIds = [];
    this.completedSubChapterIds = [];
    this.observedActions = {};
    this.globalObservedEvents = [];
    this.mediaViewerOpen = false;
    this.chapterListOpen = false;
    this.inFlightHelp = false;
    this.inFlightHelpCard = null;
  }
}
