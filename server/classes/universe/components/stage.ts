import {registerComponent} from "../component";
import {immerable} from "immer";

export class Stage {
  [immerable] = true;
  static class = "Stage";
  class = "Stage";
  scaleLabel: string;
  scaleLabelShort: string;
  skyboxKey: string;
  rootStage: boolean;
  constructor({
    scaleLabel,
    scaleLabelShort,
    skyboxKey,
    rootStage,
  }: Partial<Stage>) {
    this.scaleLabel = scaleLabel || "Meters";
    this.scaleLabelShort = scaleLabelShort || "Meter";
    this.skyboxKey = skyboxKey || "Star background";
    this.rootStage = rootStage || false;
  }
}

registerComponent(Stage);
