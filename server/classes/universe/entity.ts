import {camelCase} from "change-case";
import uuid from "uuid";
import {
  Appearance,
  Behavior,
  Identity,
  Location,
  Stage,
  StageChild,
  Glow,
  Light,
  Template,
  Simulator,
  EnginesImpulse,
  EnginesWarp,
  Thrusters,
} from "./components";
import {componentRegistry} from "./component";
import {immerable} from "immer";
import {Physical} from "./components/physical";

// An entity is an object that exists within the
// sandbox space. It's properties will correspond
// to the components that are assigned to it
export class Entity {
  [immerable] = true;
  id?: string;
  templateId?: string;
  flightId: string;
  interval?: number;
  // Possible components
  physical?: Physical;
  appearance?: Appearance;
  behavior?: Behavior;
  identity?: Identity;
  location?: Location;
  stage?: Stage;
  stageChild?: StageChild;
  glow?: Glow;
  light?: Light;
  template?: Template;
  simulator?: Simulator;
  enginesImpulse?: EnginesImpulse;
  enginesWarp?: EnginesWarp;
  thrusters?: Thrusters;

  static class = "Entity";
  class = "Entity";
  constructor({
    id = uuid.v4(),
    templateId = id,
    flightId,
    interval = 1,
    ...components
  }: Partial<Entity>) {
    this.id = id;
    this.flightId = flightId || null;
    this.templateId = templateId;
    this.interval = interval;
    // Apply the components
    Object.entries(components).forEach(([key, component]) => {
      if (["class", "id", "flightId", "interval"].includes(key)) return;
      const Comp = componentRegistry[camelCase(component.class)];
      this[key] = new Comp(component);
    });
  }
}
