import {registerComponent} from "../component";
import {immerable} from "immer";

export class Stage {
  [immerable] = true;
  static class = "Stage";
  class = "Stage";
  scaleLabel: string;
  scaleLabelShort: string;
  skyboxKey: string;
  constructor({scaleLabel, scaleLabelShort, skyboxKey}) {
    this.scaleLabel = scaleLabel || "Meter";
    this.scaleLabelShort = scaleLabelShort || "M";
    this.skyboxKey = skyboxKey || "";
  }
}

registerComponent(Stage);
