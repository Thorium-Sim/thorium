import uuid from "uuid";

export default class Objective {
  id: string;
  class: string;
  simulatorId: string | null;
  timestamp: string;
  station: string | null;
  title: string;
  description: string;
  completed: boolean;
  cancelled: boolean;
  crewComplete: boolean;
  order: number;
  constructor(params: Partial<Objective>) {
    this.id = params.id || uuid.v4();
    this.class = "Objective";
    this.simulatorId = params.simulatorId || null;
    this.timestamp = params.timestamp || new Date().toString();
    this.station = params.station || null;
    this.title = params.title || "Objective";
    this.description = params.description || "";
    this.completed = params.completed || false;
    this.cancelled = params.cancelled || false;
    this.crewComplete = params.crewComplete || false;
    this.order = params.order || 999;
  }
  complete() {
    this.completed = true;
  }
  uncomplete() {
    this.completed = false;
    this.cancelled = false;
  }
  cancel() {
    this.completed = true;
    this.cancelled = true;
  }
  setCrewComplete(cc) {
    this.crewComplete = cc;
  }
  setOrder(order) {
    this.order = order;
  }
}
