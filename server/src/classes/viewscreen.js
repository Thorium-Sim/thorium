import { randomFromList } from "./generic/damageReports/constants";

export default class Viewscreen {
  constructor(params) {
    this.id = params.id; // Since the ID is the same as the client ID, it doesn't work if we don't have an ID.
    this.class = "Viewscreen";
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || params.id;
    this.component = params.component || "ShipLogo";
    this.data = params.data || `{}`;
    this.auto = false;
    this.secondary = params.secondary || false;
  }
  updateName(name) {
    if (name) this.name = name;
  }
  updateAuto(auto) {
    this.auto = auto;
  }
  updateComponent(component = "ShipLogo", data = {}) {
    this.component = component;
    this.updateData(data);
  }
  updateData(data = {}) {
    if (typeof data === "object") {
      this.data = JSON.stringify(data);
    } else {
      this.data = data;
    }

    const datum = JSON.parse(this.data);

    // If the component is 'video' and data.asset is an array, pick a random one.
    if (this.component === "Video" && Array.isArray(datum.asset)) {
      this.data = JSON.stringify({
        ...datum,
        asset: randomFromList(datum.asset)
      });
    }
  }
}
