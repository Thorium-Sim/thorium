// A set is a collection of clients
import uuid from 'uuid';

export default class Set {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = 'Set';
    this.name = params.name || 'Default Set';
    this.clients = params.clients || [];
  }
  addClient(client) {
    this.clients.push(new SetClient(client));
  }
  removeClient(id) {
    this.clients = this.clients.filter(c => c.id !== id);
  }
  updateClient(setClientInput) {
    this.clients.find(c => c.id === setClientInput.id).update(setClientInput);
  }
}

// The default configuration for a set
class SetClient {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.stationSet = params.stationSet || null;
    this.station = params.station || null;
  }
  update({clientId, simulatorId, stationSet, station}) {
    if (clientId) this.clientId = clientId;
    if (simulatorId) this.simulatorId = simulatorId;
    if (stationSet) this.stationSet = stationSet;
    if (station) this.station = station;
  }
}