import uuid from 'uuid';
import { TimelineObject } from './timeline';

export default class Flight extends TimelineObject {
  constructor(params) {
    super(params);
    this.class = 'Flight';
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Flight';
    this.date = params.date || Date.now();
    this.mission = params.mission || null;
    this.simulators = [];
    if (params.simulators.length) {
      params.simulators.forEach(s => {
        this.simulators.push(new FlightSimulator({
          simulatorId: s.id,
          stationSet: s.stationSet,
        }));
      });
    }
  }
  addSimulator(simulator, stationSet) {
    // Add the simulator to a flight simulator
    // Add that to the simulators array
    const flightSimulator = new FlightSimulator({
      simulatorId: simulator.id,
      stationSet,
    });
    this.simulators.push(flightSimulator);
  }
  removeSimulator(simulatorId) {
    this.simulators = this.simulators.filter(s => s.id !== simulatorId);
  }
  updateSimulatorStationSet(simulatorId, stationSet) {
    this.simulators = this.simulators.map(s => {
      const returnVal = s;
      if (returnVal.id === simulatorId) {
        returnVal.stationSet = stationSet;
      }
      return returnVal;
    });
  }
}

class FlightSimulator {
  constructor(params) {
    this.class = 'FlightSimulator';
    this.id = params.simulatorId;
    this.stationSet = params.stationSet;
  }
}
