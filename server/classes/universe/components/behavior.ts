import {Coordinates} from "./location";
import {registerComponent} from "../component";
import {immerable} from "immer";
enum Behaviors {
  // Hold position is basically the same
  // as doing no behavior, so it is the
  // default
  holdPosition = "holdPosition",
  wander = "wander",
  follow = "follow",
  avoid = "avoid",
  attack = "attack",
}

export class Behavior {
  [immerable] = true;
  static class = "Behavior";
  class = "Behavior";
  behavior: Behaviors;
  targetId?: string;
  // The destination might not be the same as the location of the target.
  // For example, with "Avoid", the destination is somewhere away from
  // where the target is.
  // If destination is null, we hold position
  destination?: Coordinates;
  constructor({
    behavior = Behaviors.holdPosition,
    targetId = null,
    destination = null,
  } = {}) {
    this.behavior = behavior;
    this.targetId = targetId;
    this.destination = destination;
  }
}

registerComponent(Behavior);
