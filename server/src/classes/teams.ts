import uuid from "uuid";
import Crew from "./crew";

export default class Team {
  id: string;
  class: string;
  simulatorId: string | null;
  type: string;
  name: string;
  location: string | null;
  priority: string;
  orders: string;
  officers: string[];
  cleared: boolean;
  constructor(params: Partial<Team> = {}) {
    this.id = params.id || uuid.v4();
    this.class = "Team";
    this.simulatorId = params.simulatorId || null;
    this.type = params.type || "generic";
    this.name =
      params.name ||
      `New ${
        this.type.substr(0, 1).toUpperCase() + this.type.substr(1).toLowerCase()
      } Team`;
    // Location is either a deckID or a roomID
    this.location = params.location || null;
    this.priority = params.priority || "low";
    this.orders = params.orders || "";
    this.officers = params.officers || [];
    this.cleared = params.cleared || false;
  }
  update({name, location, orders, priority, officers}) {
    if (name || name === "") this.name = name;
    if (location) this.location = location;
    if (orders || orders === "") this.orders = orders;
    if (priority) this.priority = priority;
    if (officers) this.officers = officers;
  }
  addOfficer(officerId) {
    this.officers.push(officerId);
  }
  removeOfficer(officerId) {
    this.officers = this.officers.filter(o => o !== officerId);
  }
  clear() {
    this.cleared = true;
  }
}
