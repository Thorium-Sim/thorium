import App from "../app";
import {randomFromList} from "./generic/damageReports/constants";

export default class Viewscreen {
  id: string;
  class: string;
  simulatorId: string | null;
  name: string;
  component: string;
  data: string;
  auto: boolean;
  secondary: boolean;
  pictureInPicture: {
    component: string;
    data: Record<string, any>;
    position: string;
    size: string;
  } | null;
  constructor(params: Partial<Viewscreen>) {
    if (!params.id) throw new Error("ID is required");
    this.id = params.id; // Since the ID is the same as the client ID, it doesn't work if we don't have an ID.
    this.class = "Viewscreen";
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || params.id;
    this.component = params.component || "ShipLogo";
    this.data = params.data || `{}`;
    this.auto = false;
    this.secondary = params.secondary || false;
    this.pictureInPicture = params.pictureInPicture || null;
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
  updateData(data: object | string = {}) {
    if (typeof data === "object") {
      this.data = JSON.stringify(data);
    } else {
      this.data = data;
    }

    const datum = JSON.parse(this.data);

    // If the component is 'TacticalMap', change data.tacticalMapId to be an actual map
    if (this.component === "TacticalMap") {
      const flight = App.flights.find(
        f => this.simulatorId && f.simulators.includes(this.simulatorId),
      );
      if (!flight) throw new Error("Flight not found");
      const tacticalMap = App.tacticalMaps.find(
        t => t.templateId === datum.tacticalMapId && t.flightId === flight.id,
      );
      if (!tacticalMap) return;
      this.data = JSON.stringify({
        ...datum,
        tacticalMapId: tacticalMap.id,
      });
    }

    // If the component is 'video' and data.asset is an array, pick a random one.
    if (this.component === "Video" && Array.isArray(datum.asset)) {
      this.data = JSON.stringify({
        ...datum,
        asset: randomFromList(datum.asset),
      });
    }
  }
  setPictureInPicture(
    component = "ShipLogo",
    data = {},
    position = "bottomRight",
    size = "medium",
  ) {
    this.pictureInPicture = {component, data, position, size};
  }
  clearPictureInPicture() {
    this.pictureInPicture = null;
  }
}
