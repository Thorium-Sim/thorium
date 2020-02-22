import {randomFromList} from "../../generic/damageReports/constants";
import planetNames from "../planetNames";
import systemNames from "../systemNames";
import shipNames from "random-ship-names";
import {registerComponent} from "../component";

function randomName(type) {
  if (type === "planet") return randomFromList(planetNames);
  if (type === "system") return randomFromList(systemNames);
  if (type === "ship") return shipNames.civilian;
  return "Entity";
}

export class Identity {
  type: string;
  name: string;
  constructor({type, name}) {
    this.type = type || "ship";
    this.name = name || randomName(type);
  }
}

registerComponent(Identity);
