import {registerComponent} from "../component";
import {immerable} from "immer";

export class Simulator {
  [immerable] = true;
  static class = "Simulator";
  class = "Simulator";
}

registerComponent(Simulator);
