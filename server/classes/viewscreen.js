export default class Viewscreen {
  constructor(params) {
    this.id = params.id; // Since the ID is the same as the client ID, it doesn't work if we don't have an ID.
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || params.id;
    this.component = params.component || "ShipLogo";
  }
  updateName(name) {
    if (name) this.name = name;
  }
  updateComponent(component = "ShipLogo") {
    this.component = component;
  }
}
