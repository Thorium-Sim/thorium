import {camelCase} from "change-case";
import uuid from "uuid";
import "./components";
import {componentRegistry} from "./component";
import {immerable} from "immer";

// An entity is an object that exists within the
// sandbox space. It's properties will correspond
// to the components that are asssigned to it
export class Entity {
  [immerable] = true;
  id: string;
  flightId: string;
  class = "Entity";
  constructor({id, flightId, ...components}) {
    this.id = id || uuid.v4();
    this.flightId = flightId || null;

    // Apply the components
    Object.entries(components).forEach(([key, component]) => {
      const Comp = componentRegistry[camelCase(component.class)];
      this[camelCase(component.class)] = new Comp(component);
    });
  }
}
