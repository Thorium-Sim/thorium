import uuid from "uuid";
import randomOnSphere from "./randomOnSphere";
import systemNames from "./systemNames";
import planetNames from "./planetNames";
import { randomFromList } from "../generic/damageReports/constants";

class StellarObject {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "StellarObject";
    this.parentId = params.parentId || null;
    this.name =
      params.name ||
      (params.type === "planet"
        ? randomFromList(planetNames)
        : randomFromList(systemNames));
    this.position = params.position || randomOnSphere(500);
    this.image = params.image || "";
    this.stageScale = params.stageScale || 1 / 20;
    this.scale = params.scale || 30;
    this.type = params.type || "star";
    this.hsl = params.hsl || [Math.random(), 1, 0.5];
  }
}

export default class Universe {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Universe";
    this.objects = [];
    params.object.forEach(o => this.objects.push(new StellarObject(o)));
  }
}
