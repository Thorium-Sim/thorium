import App from "../app";
import { System } from "./generic";
import heatMixin from "./generic/heatMixin";
import uuid from "uuid";
import { pubsub } from "../helpers/subscriptionManager.js";

const baseQuad = {
  field: { required: 25, value: 0 },
  core: { required: 25, value: 0 },
  warp: { required: 25, value: 0 }
};
export default class Transwarp extends heatMixin(System) {
  static quads = ["quad1", "quad2", "quad3", "quad4"];
  static fields = ["field", "core", "warp"];
  constructor(params) {
    super(params);
    this.class = "Transwarp";
    this.type = "Transwarp";
    this.name = params.name || "Transwarp";

    this.quad1 = params.quad1 || {
      field: { required: 25, value: 0 },
      core: { required: 25, value: 0 },
      warp: { required: 25, value: 0 }
    };
    this.quad2 = params.quad2 || {
      field: { required: 25, value: 0 },
      core: { required: 25, value: 0 },
      warp: { required: 25, value: 0 }
    };
    this.quad3 = params.quad3 || {
      field: { required: 25, value: 0 },
      core: { required: 25, value: 0 },
      warp: { required: 25, value: 0 }
    };
    this.quad4 = params.quad4 || {
      field: { required: 25, value: 0 },
      core: { required: 25, value: 0 },
      warp: { required: 25, value: 0 }
    };

    this.active = params.active || false;
    this.power = params.power || {
      power: 0,
      powerLevels: [40],
      defaultLevel: -1
    };
  }
  get stealthFactor() {
    if (!this.active) return 0;
    else return 0.9;
  }
  break(report, destroyed, which) {
    if (this.active) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        station: "Core",
        type: "Transwarp",
        title: `Transwarp Drive Deactivated`,
        body: ``,
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Transwarp Drive Deactivated`,
          component: "TranswarpCore",
          body: null,
          color: "info"
        },
        "addCoreFeed"
      );
    }
    this.active = false;
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        station: "Core",
        type: "Transwarp",
        title: `Transwarp Drive Deactivated`,
        body: ``,
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Transwarp Drive Deactivated`,
          component: "TranswarpCore",
          body: null,
          color: "info"
        },
          "addCoreFeed"
        );
      this.active = false;
    }
    super.setPower(powerLevel);
  }
  setActive(tf) {
    this.active = tf;
    if(this.active){
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        station: "Core",
        type: "Transwarp",
        title: `Transwarp Drive Activated`,
        body: ``,
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Transwarp Drive Activated`,
          component: "TranswarpCore",
          body: null,
          color: "info"
        },
        "addCoreFeed"
      );
    }
    else{
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: this.simulatorId,
      station: "Core",
      type: "Transwarp",
      title: `Transwarp Drive Deactivated`,
      body: ``,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: this.simulatorId,
        title: `Transwarp Drive Deactivated`,
        component: "TranswarpCore",
        body: null,
        color: "info"
      },
      "addCoreFeed"
    );
    }
  }
  flux(quad, field) {
    if (!quad) {
      return Transwarp.quads.forEach(q =>
        Transwarp.fields.forEach(f => this.flux(q, f))
      );
    }
    if (!field) {
      return Transwarp.fields.forEach(f => this.flux(quad, f));
    }
    if (!Transwarp.quads.includes(quad)) return;
    if (!Transwarp.fields.includes(field)) return;
    this[quad][field].required = Math.ceil(Math.random() * 25);
  }
  normal(quad, field) {
    if (!quad) {
      return Transwarp.quads.forEach(q =>
        Transwarp.fields.forEach(f => this.normal(q, f))
      );
    }
    if (!field) {
      return Transwarp.fields.forEach(f => this.normal(quad, f));
    }
    if (!Transwarp.quads.includes(quad)) return;
    if (!Transwarp.fields.includes(field)) return;
    this[quad][field].required = 25;
  }
  setValue(quad, field, value) {
    if (!Transwarp.quads.includes(quad)) return;
    if (!Transwarp.fields.includes(field)) return;
    this[quad][field].value = value;
  }
}
