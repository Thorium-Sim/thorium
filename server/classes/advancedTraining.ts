import uuid from "uuid";

export interface RequiredActionParams {
  id?: string;
  eventName?: string;
  args?: Record<string, any> | null;
}

export class RequiredAction {
  id: string;
  eventName: string;
  args: Record<string, any> | null;

  constructor(params: RequiredActionParams = {}) {
    this.id = params.id || uuid.v4();
    this.eventName = params.eventName || "";
    this.args = params.args || null;
  }
}

export interface SubChapterParams {
  id?: string;
  name?: string;
  requiredActions?: RequiredActionParams[];
}

export class SubChapter {
  id: string;
  name: string;
  requiredActions: RequiredAction[];

  constructor(params: SubChapterParams = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "New Sub-Chapter";
    this.requiredActions = (params.requiredActions || []).map(
      a => new RequiredAction(a),
    );
  }

  setName(name: string) {
    this.name = name;
  }

  setRequiredActions(actions: RequiredActionParams[]) {
    this.requiredActions = actions.map(a => new RequiredAction(a));
  }

  addRequiredAction(action: RequiredActionParams) {
    this.requiredActions.push(new RequiredAction(action));
  }

  removeRequiredAction(actionId: string) {
    this.requiredActions = this.requiredActions.filter(a => a.id !== actionId);
  }
}

export interface ChapterParams {
  id?: string;
  name?: string;
  cardComponent?: string;
  mediaAsset?: string | null;
  autoOpenMedia?: boolean;
  autoAdvance?: boolean;
  autoLogin?: "none" | "immediate" | "on-complete" | boolean;
  cardSwitchBehavior?: "auto" | "manual";
  mediaSize?: "small" | "medium" | "large";
  mediaPosition?: string;
  subChapters?: SubChapterParams[];
}

export class Chapter {
  id: string;
  name: string;
  cardComponent: string;
  mediaAsset: string | null;
  autoOpenMedia: boolean;
  autoAdvance: boolean;
  autoLogin: "none" | "immediate" | "on-complete";
  cardSwitchBehavior: "auto" | "manual";
  mediaSize: "small" | "medium" | "large";
  mediaPosition: string;
  subChapters: SubChapter[];

  constructor(params: ChapterParams = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "New Chapter";
    this.cardComponent = params.cardComponent || "";
    this.mediaAsset = params.mediaAsset || null;
    this.autoOpenMedia = params.autoOpenMedia ?? false;
    this.autoAdvance = params.autoAdvance ?? false;
    // Handle migration from boolean (false → "none", true → "immediate")
    const rawLogin = params.autoLogin;
    this.autoLogin =
      rawLogin === true
        ? "immediate"
        : rawLogin === "immediate" || rawLogin === "on-complete"
        ? rawLogin
        : "none";
    this.cardSwitchBehavior = params.cardSwitchBehavior || "manual";
    this.mediaSize = params.mediaSize || "small";
    this.mediaPosition = params.mediaPosition || "bottom-right";
    this.subChapters = (params.subChapters || []).map(s => new SubChapter(s));
  }

  setName(name: string) {
    this.name = name;
  }

  setCardComponent(component: string) {
    this.cardComponent = component;
  }

  setMediaAsset(asset: string | null) {
    this.mediaAsset = asset;
  }

  setAutoOpenMedia(auto: boolean) {
    this.autoOpenMedia = auto;
  }

  setAutoAdvance(auto: boolean) {
    this.autoAdvance = auto;
  }

  setAutoLogin(value: "none" | "immediate" | "on-complete") {
    this.autoLogin = value;
  }

  setCardSwitchBehavior(behavior: "auto" | "manual") {
    this.cardSwitchBehavior = behavior;
  }

  setMediaSize(size: "small" | "medium" | "large") {
    this.mediaSize = size;
  }

  setMediaPosition(position: string) {
    this.mediaPosition = position;
  }

  addSubChapter(subChapter?: SubChapterParams) {
    const sc = new SubChapter(subChapter);
    this.subChapters.push(sc);
    return sc;
  }

  removeSubChapter(subChapterId: string) {
    this.subChapters = this.subChapters.filter(s => s.id !== subChapterId);
  }

  reorderSubChapters(subChapterId: string, newIndex: number) {
    const idx = this.subChapters.findIndex(s => s.id === subChapterId);
    if (idx === -1) {
      return;
    }
    const [item] = this.subChapters.splice(idx, 1);
    this.subChapters.splice(newIndex, 0, item);
  }

  getSubChapter(subChapterId: string): SubChapter | undefined {
    return this.subChapters.find(s => s.id === subChapterId);
  }
}

export interface AdvancedTrainingConfigParams {
  enabled?: boolean;
  sequentialChapters?: boolean;
  chapters?: ChapterParams[];
  inFlightChapters?: ChapterParams[];
  loginChapter?: ChapterParams | null;
  completionChapter?: ChapterParams | null;
  stripPosition?: "top" | "bottom";
}

export class AdvancedTrainingConfig {
  enabled: boolean;
  sequentialChapters: boolean;
  chapters: Chapter[];
  // Ad-hoc help chapters reachable mid-flight via the question-mark widget.
  // Tied to a card component; kept out of the normal sequential progression.
  inFlightChapters: Chapter[];
  loginChapter: Chapter | null;
  completionChapter: Chapter | null;
  stripPosition: "top" | "bottom";

  constructor(params: AdvancedTrainingConfigParams = {}) {
    this.enabled = params.enabled ?? false;
    this.sequentialChapters = params.sequentialChapters ?? false;
    this.chapters = (params.chapters || []).map(c => new Chapter(c));
    this.inFlightChapters = (params.inFlightChapters || []).map(
      c => new Chapter(c),
    );
    this.loginChapter = params.loginChapter
      ? new Chapter(params.loginChapter)
      : null;
    this.completionChapter = params.completionChapter
      ? new Chapter(params.completionChapter)
      : null;
    this.stripPosition = params.stripPosition || "bottom";
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setSequentialChapters(sequential: boolean) {
    this.sequentialChapters = sequential;
  }

  setLoginChapter(params: ChapterParams | null) {
    this.loginChapter = params ? new Chapter(params) : null;
  }

  setCompletionChapter(params: ChapterParams | null) {
    this.completionChapter = params ? new Chapter(params) : null;
  }

  addChapter(chapter?: ChapterParams) {
    const ch = new Chapter(chapter);
    this.chapters.push(ch);
    return ch;
  }

  removeChapter(chapterId: string) {
    this.chapters = this.chapters.filter(c => c.id !== chapterId);
  }

  reorderChapters(chapterId: string, newIndex: number) {
    const idx = this.chapters.findIndex(c => c.id === chapterId);
    if (idx === -1) {
      return;
    }
    const [item] = this.chapters.splice(idx, 1);
    this.chapters.splice(newIndex, 0, item);
  }

  getChapter(chapterId: string): Chapter | undefined {
    return this.chapters.find(c => c.id === chapterId);
  }

  addInFlightChapter(chapter?: ChapterParams) {
    const ch = new Chapter(chapter);
    this.inFlightChapters.push(ch);
    return ch;
  }

  removeInFlightChapter(chapterId: string) {
    this.inFlightChapters = this.inFlightChapters.filter(
      c => c.id !== chapterId,
    );
  }

  getInFlightChapter(chapterId: string): Chapter | undefined {
    return this.inFlightChapters.find(c => c.id === chapterId);
  }

  /**
   * Find the in-flight help chapter authored for a given card component, if any.
   * Used when the crew presses the help widget while on that card.
   */
  findInFlightChapterByCard(cardComponent: string): Chapter | undefined {
    if (!cardComponent) {
      return undefined;
    }
    return this.inFlightChapters.find(c => c.cardComponent === cardComponent);
  }

  /** True if the given chapter ID belongs to the in-flight help chapters. */
  isInFlightChapter(chapterId: string): boolean {
    return this.inFlightChapters.some(c => c.id === chapterId);
  }

  /**
   * Find any chapter by ID, including loginChapter, completionChapter, and
   * in-flight help chapters.
   */
  findChapter(chapterId: string): Chapter | undefined {
    if (this.loginChapter?.id === chapterId) {
      return this.loginChapter;
    }
    if (this.completionChapter?.id === chapterId) {
      return this.completionChapter;
    }
    return (
      this.chapters.find(c => c.id === chapterId) ||
      this.inFlightChapters.find(c => c.id === chapterId)
    );
  }
}
