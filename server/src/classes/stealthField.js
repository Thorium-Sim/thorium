import App from "../app";
import { System } from "./generic";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

export default class StealthField extends System {
  constructor(params) {
    super(params);
    this.class = "StealthField";
    this.type = "StealthField";
    this.name = params.name || "Stealth Field";
    this.charge = params.charge || false;
    this.activated = params.activated || true;
    this.state = params.state || !this.activated;
    this.changeAlert = params.changeAlert || false;
    this.quadrants = params.quadrants || {
      fore: 0,
      aft: 0,
      port: 0,
      starboard: 0
    };
  }
  setActivated(tf) {
    this.activated = tf;
    this.state = !tf;
  }
  setCharge(tf) {
    this.charge = tf;
  }
  setChangeAlert(tf) {
    this.changeAlert = tf;
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
  setQuadrant(which, value) {
    this.quadrants[which] = value;
  }
  fluxQuadrants() {
    this.quadrants.fore = Math.round(Math.random() * 20) / 20;
    this.quadrants.aft = Math.round(Math.random() * 20) / 20;
    this.quadrants.starboard = Math.round(Math.random() * 20) / 20;
    this.quadrants.port = Math.round(Math.random() * 20) / 20;
  }
  break(report, destroyed, which) {
    this.deactivate();
    if (this.state) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        type: "Stealth Field",
        station: "Core",
        title: `Stealth Deactivated`,
        body: "",
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Stealth Deactivated`,
          component: "StealthFieldCore",
          body: null,
          color: "info"
        },
        "addCoreFeed"
      );
    }
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
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
          color: "info"
        });
        App.handleEvent(
          {
            simulatorId: this.simulatorId,
            title: `Stealth Deactivated`,
            component: "StealthFieldCore",
            body: null,
            color: "info"
          },
          "addCoreFeed"
        );
      }
      this.deactivate();
    }
    super.setPower(powerLevel);
  }
}
