import uuid from "uuid";
import { TimelineObject } from "./timeline";
export default class Mission extends TimelineObject {
  constructor(params = {}) {
    super(params);
    this.class = "Mission";
    this.id = params.id || uuid.v4();
    this.name = params.name || "Mission";
    this.description = params.description || "";
    this.aux = params.aux || false;
    this.simulators = params.simulators || [];
  }
  update({ name, description, aux, simulators }) {
    if (name || name === "") this.name = name;
    if (description || description === "") this.description = description;
    if (aux || aux === false) this.aux = aux;
    if (simulators) this.simulators = simulators;
  }
}
