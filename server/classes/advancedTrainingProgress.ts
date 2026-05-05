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
  mediaViewerOpen?: boolean;
  chapterListOpen?: boolean;
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
  mediaViewerOpen: boolean;
  chapterListOpen: boolean;

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
    this.mediaViewerOpen = params.mediaViewerOpen ?? false;
    this.chapterListOpen = params.chapterListOpen ?? false;
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
    this.mediaViewerOpen = false;
    this.chapterListOpen = false;
  }
}
