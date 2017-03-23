import uuid from 'uuid';
import { TimelineObject } from './timeline';

export default class Simulator extends TimelineObject {
  constructor(params) {
    super(params);
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Simulator';
    this.layout = params.layout || 'LayoutDefault';
    this.alertlevel = params.alertlevel || '5';
    this.template = params.template || false;
    this.class = 'Simulator';
    this.crewCount = params.crewCount || 50;
    this.ship = new Ship(params.ship)
    // Initialize the simulator async
    if (params.launch) {
      setTimeout(() => { this.nextTimeline(); }, 100);
    }
  }
  rename(name) {
    this.name = name;
  }
  setAlertLevel(alertlevel) {
    if (['5', '4', '3', '2', '1', 'p'].indexOf(alertlevel) === -1) {
      throw new Error("Invalid Alert Level. Must be one of '5','4','3','2','1','p'");
    }
    this.alertlevel = alertlevel;
  }
  setLayout(layout) {
    // TODO: Validate this layout against the available layouts
    // This would require the front-end modules being available
    // To the server
    this.layout = layout;
  }
  setCrewCount(count) {
    this.crewCount = count;
  }
  clamps(tf) {
    this.ship.clamps = tf;
  }
  ramps(tf) {
    this.ship.ramps = tf;
  }
  airlock(tf) {
    this.ship.airlock = tf;
  }
}

// A separate object for vestigial parts of the ship
class Ship {
  constructor(params = {}) {
    this.clamps = params.clamps || false; // Detached
    this.ramps = params.ramps || false; // Retracted
    this.airlock = params.airlock || false; // Closed
  }
}