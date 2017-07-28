import uuid from 'uuid';
import Team from './teams';

export default class Simulator {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Simulator';
    this.layout = params.layout || 'LayoutDefault';
    this.alertlevel = params.alertlevel || '5';
    this.template = params.template || false;
    this.templateId = params.templateId || null;
    this.class = 'Simulator';
    this.stationSet = params.stationSet || null;
    this.stations = params.stations || [];
    this.mission = params.mission || null;
    this.teams = [];
    this.ship = new Ship(params.ship);
    // Set up the teams
    if (params.teams) {
      params.teams.forEach(t => this.teams.push(new Team(t)));
    }

    // Initialize the simulator async
    if (params.launch) {
      setTimeout(() => {
        this.nextTimeline();
      }, 100);
    }
  }
  rename(name) {
    this.name = name;
  }
  setAlertLevel(alertlevel) {
    if (['5', '4', '3', '2', '1', 'p'].indexOf(alertlevel) === -1) {
      throw new Error(
        "Invalid Alert Level. Must be one of '5','4','3','2','1','p'"
      );
    }
    this.alertlevel = alertlevel;
  }
  setLayout(layout) {
    // TODO: Validate this layout against the available layouts
    // This would require the front-end modules being available
    // To the server
    this.layout = layout;
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
  sendCode(code, station) {
    this.ship.remoteAccessCodes.push(new RemoteAccess({ code, station }));
  }
  updateCode(codeId, state) {
    this.ship.remoteAccessCodes.find(c => c.id === codeId).state = state;
  }
  powerMode(powerMode) {
    this.ship.powerMode = powerMode;
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
}

// A separate object for vestigial parts of the ship
class Ship {
  constructor(params = {}) {
    this.clamps = params.clamps || false; // Detached
    this.ramps = params.ramps || false; // Retracted
    this.airlock = params.airlock || false; // Closed
    this.selfDestructTime = params.selfDestructTime || null;
    this.selfDestructCode = params.selfDestructCode || null;
    this.selfDestructAuto = params.selfDestructAuto || false; // Automatically black out stations when self destructed
    this.remoteAccessCodes = [];
    // One of 'internal', 'external', 'offline'
    // Could expand to old Odyssey: 'Cruise', 'Reduced',
    // 'Silent Running', 'Emergency', 'Auxilliary',
    // 'External', 'Minimal', 'Offline'
    this.powerMode = params.powerMode || 'internal';
    const codes = params.remoteAccessCodes || [];
    codes.forEach(c => this.remoteAccessCodes.push(new RemoteAccess(c)));
  }
}

class RemoteAccess {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.code = params.code || '';
    this.state = params.state || 'sent';
    this.station = params.station || '';
    this.timestamp = params.timestamp || new Date().toISOString();
  }
}
