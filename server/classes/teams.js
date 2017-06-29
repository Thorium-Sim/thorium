import uuid from 'uuid';

export default class Team {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = 'Team';
    this.simulatorId = params.simulatorId || null;
    this.type = params.type || 'generic'
    this.name = params.name || `New ${this.type.substr(0,1).toUpperCase() + this.type.substr(1).toLowerCase()} Team`;
    // Location is either a deckID or a roomID
    this.location = params.location || null;
    this.orders = params.orders || '';
    this.officers = params.officers || [];
  }
  update({name, location, orders}) {
    if (name || name === '') this.name = name;
    if (location) this.location = location;
    if (orders || orders === '') this.orders = orders;
  }
  addOfficer(officerId) {
    this.officers.push(officerId);
  }
  removeOfficer(officerId) {
    this.officers = this.officers.filter(o => o !== officerId);
  }
}
