import uuid from "uuid";
import Team from "./teams";
import DamageStep from "./generic/damageStep";

class RemoteAccess {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.code = params.code || "";
    this.state = params.state || "sent";
    this.station = params.station || "";
    this.timestamp = params.timestamp || new Date().toISOString();
  }
}
// A separate object for vestigial parts of the ship
class Ship {
  constructor(params = {}) {
    this.clamps = params.clamps || false; // Detached
    this.ramps = params.ramps || false; // Retracted
    this.airlock = params.airlock || false; // Closed
    this.bridgeCrew = params.bridgeCrew || 14;
    this.radiation = params.radiation || 0.1;
    this.speed = params.speed || 0;
    this.selfDestructTime = params.selfDestructTime || null;
    this.selfDestructCode = params.selfDestructCode || null;
    this.selfDestructAuto = params.selfDestructAuto || false; // Automatically black out stations when self destructed
    this.remoteAccessCodes = [];
    this.extraSystems = [];
    const codes = params.remoteAccessCodes || [];
    codes.forEach(c => this.remoteAccessCodes.push(new RemoteAccess(c)));
  }
}

class Assets {
  constructor(params = {}) {
    this.mesh = params.mesh || "/Simulator/default/mesh.obj";
    this.texture = params.texture || "/Simulator/default/texture.png";
    this.side = params.side || "/Simulator/default/side.png";
    this.top = params.top || "/Simulator/default/top.png";
    this.logo = params.logo || "/Simulator/default/logo.svg";
  }
}

export default class Simulator {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Simulator";
    this.layout = params.layout || "LayoutDefault";
    this.alertlevel = params.alertlevel || "5";
    this.template = params.template || false;
    this.templateId = params.templateId || null;
    this.class = "Simulator";
    this.assets = new Assets(params.assets);
    this.stationSet = params.stationSet || null;
    this.stations = params.stations || [];
    this.exocomps = params.exocomps || 0;
    this.mission = params.mission || null;
    this.currentTimelineStep = params.currentTimelineStep || 0;
    this.executedTimelineSteps = params.executedTimelineSteps || [];
    this.bridgeOfficerMessaging = params.bridgeOfficerMessaging || true;
    this.teams = [];
    this.training = params.training || false;
    this.ship = new Ship(params.ship);
    this.panels = params.panels || [];

    // Set up the teams
    if (params.teams) {
      params.teams.forEach(t => this.teams.push(new Team(t)));
    }

    // Damage reports
    this.stepDamage = params.stepDamage || true;
    this.verifyStep = params.verifyStep || false;
    this.requiredDamageSteps = [];
    this.optionalDamageSteps = [];
    params.requiredDamageSteps &&
      params.requiredDamageSteps.forEach(s =>
        this.requiredDamageSteps.push(new DamageStep(s))
      );
    params.optionalDamageSteps &&
      params.optionalDamageSteps.forEach(s =>
        this.optionalDamageSteps.push(new DamageStep(s))
      );
  }
  trainingMode(tf) {
    this.training = tf;
  }
  rename(name) {
    this.name = name;
  }
  setAlertLevel(alertlevel) {
    if (["5", "4", "3", "2", "1", "p"].indexOf(alertlevel) === -1) {
      throw new Error(
        "Invalid Alert Level. Must be one of '5','4','3','2','1','p'"
      );
    }
    this.alertlevel = alertlevel;
  }
  setLayout(layout) {
    this.layout = layout;
  }
  setTimelineStep(step) {
    this.currentTimelineStep = step;
  }
  executeTimelineStep(stepId) {
    this.executedTimelineSteps.push(stepId);
    this.executedTimelineSteps = this.executedTimelineSteps.filter(
      (a, i, arr) => arr.indexOf(a) === i
    );
  }

  // Ship
  clamps(tf) {
    this.ship.clamps = tf;
  }
  ramps(tf) {
    this.ship.ramps = tf;
  }
  airlock(tf) {
    this.ship.airlock = tf;
  }
  bridgeCrew(num) {
    this.ship.bridgeCrew = num;
  }
  radiation(num) {
    this.ship.radiation = num;
  }
  speed(num) {
    this.ship.speed = num;
  }
  sendCode(code, station) {
    this.ship.remoteAccessCodes.push(new RemoteAccess({ code, station }));
  }
  updateCode(codeId, state) {
    this.ship.remoteAccessCodes.find(c => c.id === codeId).state = state;
  }
  setSelfDestructTime(time) {
    this.ship.selfDestructTime = time;
  }
  setSelfDestructCode(code) {
    this.ship.selfDestructCode = code;
  }
  setSelfDestructAuto(tf) {
    this.ship.selfDestructAuto = tf;
  }
  updatePanels(panels) {
    this.panels = panels || [];
  }
  // Damage Steps
  addDamageStep({ name, args, type }) {
    this[`${type}DamageSteps`].push(new DamageStep({ name, args }));
  }
  updateDamageStep({ id, name, args }) {
    const step =
      this.requiredDamageSteps.find(s => s.id === id) ||
      this.optionalDamageSteps.find(s => s.id === id);
    step.update({ name, args });
  }
  removeDamageStep(stepId) {
    // Check both required and optional
    this.requiredDamageSteps = this.requiredDamageSteps.filter(
      s => s.id !== stepId
    );
    this.optionalDamageSteps = this.optionalDamageSteps.filter(
      s => s.id !== stepId
    );
  }
  setAssets(assets) {
    this.assets = new Assets(assets);
  }
}
