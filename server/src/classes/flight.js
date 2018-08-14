import uuid from "uuid";
import randomWords from "random-words";
export default class Flight {
  constructor(params) {
    this.class = "Flight";
    this.id = params.id || uuid.v4();
    this.name = params.name || randomWords(3).join("-");
    this.date = params.date || Date.now();
    this.running = params.running || false;
    this.simulators = params.simulators || [];
  }
  addSimulator(simulator) {
    this.simulators.push(simulator.id);
  }
  removeSimulator(simulatorId) {
    this.simulators = this.simulators.filter(s => s !== simulatorId);
  }
  stopFlight() {
    this.running = false;
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
  }
}
