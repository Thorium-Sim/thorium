// A set is a collection of clients
import uuid from 'uuid';

export default class Set {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = 'Set';
    this.name = params.name || 'Default Set';
    this.clients = params.clients || [];
    this.simulatorId = params.simulatorId || null;
  }
  setSimulatorId(id) {
    this.simulatorId = id;
  }
  addClient(id) {
    this.clients.push(new SetClient(id));
  }
  removeClient(id) {
    this.clients = this.clients.filter(c => c.id !== id);
  }
  setClientStation(id, station) {
    this.clients.find(c => c.id === id).setStation(station);
  }
}

// The default configuration for a set
class SetClient {
  constructor(params = {}) {
    this.id = params.id;
    this.station = params.station || null;
  }
  setStation(name) {
    this.station = name;
  }
}