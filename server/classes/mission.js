import uuid from "uuid";
import { TimelineObject } from "./timeline";
export default class Mission extends TimelineObject {
  constructor(params = {}) {
    super(params);
    this.class = "Mission";
    this.id = params.id || uuid.v4();
    this.name = params.name || "Mission";
    this.description = params.description || "";
  }
  update({ name, description }) {
    this.name = name || "";
    this.description = description || "";
  }
}
