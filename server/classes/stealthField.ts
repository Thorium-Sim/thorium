import App from "../app";
import {System} from "./generic";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";

interface StealthQuadrants {
  fore: number;
  aft: number;
  port: number;
  starboard: number;
}

export default class StealthField extends System {
  class: "StealthField" = "StealthField";
  type: "StealthField" = "StealthField";
  name: string;
  wing: "left" | "right";
  charge: boolean;
  activated: boolean;
  state: boolean;
  changeAlert: boolean;
  sensorsSonar: boolean;
  quadrants: StealthQuadrants;
  constructor(params: Partial<StealthField>) {
    super(params);

    this.name = params.name || "Stealth Field";
    this.wing = params.wing || "left";

    this.charge = params.charge || false;
    this.activated = params.activated || false;
    this.state = params.state || !this.activated;
    this.changeAlert = params.changeAlert || false;
    this.sensorsSonar = params.sensorsSonar || false;
    this.quadrants = params.quadrants || {
      fore: 0,
      aft: 0,
      port: 0,
      starboard: 0,
    };
  }
  setActivated(tf: boolean) {
    this.activated = tf;
    this.state = !tf;
  }
  setCharge(tf: boolean) {
    this.charge = tf;
  }
  setChangeAlert(tf: boolean) {
    this.changeAlert = tf;
  }
  setSensorsSonar(tf: boolean) {
    this.sensorsSonar = tf;
  }
  activate() {
    if (this.charge) {
      if (
        this.quadrants.fore !== 0.5 ||
        this.quadrants.aft !== 0.5 ||
        this.quadrants.starboard !== 0.5 ||
        this.quadrants.port !== 0.5
      ) {
        return;
      }
    }
    this.state = true;
  }
  deactivate() {
    this.state = false;
  }
  setQuadrant(which: "fore" | "aft" | "port" | "starboard", value: number) {
    this.quadrants[which] = value;
  }
  fluxQuadrants() {
    this.quadrants.fore = Math.round(Math.random() * 20) / 20;
    this.quadrants.aft = Math.round(Math.random() * 20) / 20;
    this.quadrants.starboard = Math.round(Math.random() * 20) / 20;
    this.quadrants.port = Math.round(Math.random() * 20) / 20;
  }
  break(report: string, destroyed: boolean, which: string) {
    this.deactivate();
    if (this.state) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        type: "Stealth Field",
        station: "Core",
        title: `Stealth Deactivated`,
        body: "",
        color: "info",
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Stealth Deactivated`,
          component: "StealthFieldCore",
          body: null,
          color: "info",
        },
        "addCoreFeed",
      );
    }
    super.break(report, destroyed, which);
  }
  setPower(powerLevel: number) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      if (this.state) {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: this.simulatorId,
          type: "Stealth Field",
          station: "Core",
          title: `Stealth Deactivated`,
          body: "",
          color: "info",
        });
        App.handleEvent(
          {
            simulatorId: this.simulatorId,
            title: `Stealth Deactivated`,
            component: "StealthFieldCore",
            body: null,
            color: "info",
          },
          "addCoreFeed",
        );
      }
      this.deactivate();
    }
    super.setPower(powerLevel);
  }
}
