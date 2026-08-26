import uuid from "uuid";

// The Fabricator lets crews combine up to four cargo stacks from a single
// room into a new item. Recipes are simulator aspects: they're configured on
// the template simulator and cloned onto each flight's simulator by
// addAspects, so per-flight changes (FD edits, secret recipe discovery)
// never touch the template.

export const MAX_RECIPE_INPUTS = 4;

export interface FabricationRecipeItem {
  name: string;
  count: number;
  // When false the item must be present in the room but isn't used up —
  // a tool or catalyst rather than an ingredient
  consumed?: boolean;
}

export interface FabricationOutputMetadata {
  type?: string;
  size?: number;
  description?: string;
  image?: string;
  science?: boolean;
  defense?: boolean;
  // For torpedo outputs: which warhead type lands in the launcher
  warheadType?: string;
}

export interface FabricationRecipeOutput {
  name: string;
  count: number;
  metadata?: FabricationOutputMetadata;
}

export type FabricationRecipeCategory =
  | "repair"
  | "weapon"
  | "probe"
  | "upgrade"
  | "science"
  | "misc";

interface FabricationRecipeParams {
  id?: string;
  simulatorId?: string;
  templateId?: string;
  name?: string;
  description?: string;
  category?: FabricationRecipeCategory;
  inputs?: FabricationRecipeItem[];
  output?: FabricationRecipeOutput;
  duration?: number;
  secret?: boolean;
  discovered?: boolean;
  hint?: string;
  hintVisible?: boolean;
  nearMiss?: boolean;
  nearMissCount?: number;
}

function sanitizeItems(items: FabricationRecipeItem[] = []) {
  // Merge duplicate names: the crew card combines same-name stacks into one
  // slot, so a recipe listing an item twice could never be matched. If any
  // duplicate is consumed, the merged stack is consumed.
  const merged: FabricationRecipeItem[] = [];
  items
    .filter(i => i && i.name && i.name.trim())
    .forEach(i => {
      const item = {
        name: i.name.trim(),
        count: Math.max(1, Math.round(i.count) || 1),
        consumed: i.consumed !== false,
      };
      const existing = merged.find(
        m => m.name.toLowerCase() === item.name.toLowerCase(),
      );
      if (existing) {
        existing.count += item.count;
        existing.consumed = existing.consumed || item.consumed;
      } else {
        merged.push(item);
      }
    });
  return merged.slice(0, MAX_RECIPE_INPUTS);
}

export class FabricationRecipe {
  id: string;
  class: "FabricationRecipe";
  simulatorId: string | null;
  templateId: string | null;
  name: string;
  description: string;
  category: FabricationRecipeCategory;
  inputs: FabricationRecipeItem[];
  output: FabricationRecipeOutput;
  duration: number;
  secret: boolean;
  discovered: boolean;
  // FD-authored clue for a secret recipe, shown to the crew only after the
  // FD makes it visible
  hint: string;
  hintVisible: boolean;
  // When enabled, slotting a strict subset of this recipe's components tells
  // the crew the mixture is "almost viable"
  nearMiss: boolean;
  // How many times the crew has come close to this recipe without hitting
  // it — surfaced on the FD core so they can decide when to show the hint
  nearMissCount: number;
  constructor(params: FabricationRecipeParams = {}) {
    this.class = "FabricationRecipe";
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;
    this.name = params.name || "New Recipe";
    this.description = params.description || "";
    this.category = params.category || "misc";
    this.inputs = sanitizeItems(params.inputs);
    const output = params.output || {name: "", count: 1};
    this.output = {
      name: (output.name || "").trim(),
      count: Math.max(1, Math.round(output.count) || 1),
      metadata: output.metadata || {},
    };
    this.duration = Math.max(5, Math.round(params.duration) || 60);
    this.secret = Boolean(params.secret);
    this.discovered = Boolean(params.discovered);
    this.hint = params.hint || "";
    this.hintVisible = Boolean(params.hintVisible);
    this.nearMiss = Boolean(params.nearMiss);
    this.nearMissCount = Math.max(0, Math.round(params.nearMissCount) || 0);
  }
  update({
    name,
    description,
    category,
    inputs,
    output,
    duration,
    secret,
    hint,
    nearMiss,
  }: FabricationRecipeParams) {
    if (name || name === "") this.name = name || this.name;
    if (description || description === "") this.description = description;
    if (category) this.category = category;
    if (inputs) this.inputs = sanitizeItems(inputs);
    if (output) {
      this.output = {
        name: (output.name || "").trim(),
        count: Math.max(1, Math.round(output.count) || 1),
        metadata: output.metadata || this.output.metadata || {},
      };
    }
    if (duration) this.duration = Math.max(5, Math.round(duration) || 60);
    if (secret === true || secret === false) {
      this.secret = secret;
      if (!secret) {
        this.discovered = false;
        this.hintVisible = false;
      }
    }
    if (hint || hint === "") this.hint = hint;
    if (nearMiss === true || nearMiss === false) this.nearMiss = nearMiss;
  }
  reveal() {
    this.discovered = true;
  }
  showHint() {
    this.hintVisible = true;
  }
  // True when the given input stacks exactly match this recipe's inputs,
  // regardless of slot order. Names compare case-insensitively; whether an
  // item is consumed doesn't affect matching.
  matches(inputs: FabricationRecipeItem[]) {
    const normalize = (items: FabricationRecipeItem[]) =>
      items
        .map(i => `${i.name.trim().toLowerCase()}|${i.count}`)
        .sort()
        .join("::");
    if (inputs.length !== this.inputs.length) return false;
    return normalize(inputs) === normalize(this.inputs);
  }
  // True when the given stacks are a strict subset of this recipe's inputs —
  // right items, but something is missing or short. Only meaningful for
  // secret recipes with near-miss feedback enabled.
  isNearMiss(inputs: FabricationRecipeItem[]) {
    if (!this.nearMiss || this.discovered) return false;
    if (inputs.length === 0 || this.matches(inputs)) return false;
    return inputs.every(stack => {
      const match = this.inputs.find(
        i => i.name.toLowerCase() === stack.name.trim().toLowerCase(),
      );
      return match && stack.count <= match.count;
    });
  }
  // True when the given stacks use exactly this recipe's component names but
  // the quantities are wrong — a more precise clue than a near miss. Only
  // meaningful for secret recipes with near-miss feedback enabled.
  isProportionMiss(inputs: FabricationRecipeItem[]) {
    if (!this.nearMiss || this.discovered) return false;
    if (inputs.length === 0 || this.matches(inputs)) return false;
    const names = (items: FabricationRecipeItem[]) =>
      items
        .map(i => i.name.trim().toLowerCase())
        .sort()
        .join("::");
    return names(inputs) === names(this.inputs);
  }
  recordNearMiss() {
    this.nearMissCount += 1;
    return this.nearMissCount;
  }
}

export type FabricationJobStatus = "active" | "complete" | "cancelled";

interface FabricationJobParams {
  id?: string;
  simulatorId?: string;
  templateId?: string;
  recipeId?: string;
  recipeName?: string;
  roomId?: string;
  inputs?: FabricationRecipeItem[];
  output?: FabricationRecipeOutput;
  duration?: number;
  elapsed?: number;
  status?: FabricationJobStatus;
  completedTime?: number;
}

export class FabricationJob {
  id: string;
  class: "FabricationJob";
  simulatorId: string | null;
  templateId: string | null;
  recipeId: string | null;
  recipeName: string;
  roomId: string | null;
  // The stacks consumed when the job started, kept so a cancel can refund them
  inputs: FabricationRecipeItem[];
  output: FabricationRecipeOutput;
  duration: number;
  elapsed: number;
  status: FabricationJobStatus;
  // Timestamp (ms) when the job finished or was cancelled, for auto-cleanup
  completedTime: number | null;
  constructor(params: FabricationJobParams = {}) {
    this.class = "FabricationJob";
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;
    this.recipeId = params.recipeId || null;
    this.recipeName = params.recipeName || "Unknown";
    this.roomId = params.roomId || null;
    this.inputs = params.inputs || [];
    this.output = params.output || {name: "", count: 1};
    this.duration = params.duration || 60;
    this.elapsed = params.elapsed || 0;
    this.status = params.status || "active";
    this.completedTime = params.completedTime || null;
  }
  get progress() {
    if (this.status === "complete") return 1;
    return Math.min(1, this.elapsed / this.duration);
  }
  tick(seconds = 1) {
    if (this.status !== "active") return;
    this.elapsed += seconds;
  }
  complete() {
    this.status = "complete";
    this.elapsed = this.duration;
    this.completedTime = Date.now();
  }
  cancel() {
    this.status = "cancelled";
    this.completedTime = Date.now();
  }
}

export default FabricationRecipe;
