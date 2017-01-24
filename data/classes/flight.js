import uuid from 'uuid';

export default class Flight {
  constructor(params) {
    this.class = 'Flight';
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Flight';
    this.date = params.date || new Date();
    this.simulators = [];
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
