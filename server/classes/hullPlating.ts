import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {System} from "./generic";

export default class HullPlating extends System {
  engaged: boolean;
  mode: string;
  pulse?: boolean;
  constructor(params: any = {}) {
    super(params);
    this.class = "HullPlating";
    this.type = "HullPlating";
    this.wing = params.wing || "left";
    this.name = params.name || "Hull Plating";
    this.displayName = params.displayName || "Hull Plating";
    this.engaged = false;
    this.mode = "kinetic";
    this.pulse = false;
  }
  get stealthFactor() {
    return 0;
  }

  handleUpdate() {
    pubsub.publish(
      "hullPlatingUpdate",
      App.systems.filter(s => s.type === "HullPlating"),
    );
  }

  setEngaged(engaged: boolean) {
    if (!engaged) {
      this.pulse = false;
    }
    this.engaged = engaged;
  }

  setMode(mode: string) {
    if (this.mode !== mode) {
      this.pulse = false;
    }
    this.mode = mode;
  }

  setPulse(pulse: boolean) {
    this.pulse = pulse;
  }

  break(report, destroyed, which) {
    this.mode = "kinetic";
    this.engaged = false;
    this.pulse = false;
    super.break(report, destroyed, which);
    this.handleUpdate();
  }
  repair() {
    super.repair();
    this.handleUpdate();
  }
  setPower(power) {
    super.setPower(power);
    this.handleUpdate();
  }
}
