import {paramCase} from "change-case";
import uuid from "uuid";
import {componentRegistry} from "./component";

// An entity is an object that exists within the
// sandbox space. It's properties will correspond
// to the components that are asssigned to it
export class Entity {
  id: string;
  class = "Entity";
  constructor({id, name, type, ...components}) {
    this.id = id || uuid.v4();

    // Apply the components
    Object.entries(components).forEach(([key, component]) => {
      const Comp = componentRegistry[paramCase(component.class)];
      this[paramCase(component.class)] = new Comp(component);
    });
  }
}
