import {camelCase} from "change-case";
type ClassDef = {new (...args: any[]): any};
export const componentRegistry: {[key: string]: ClassDef} = {};

export function registerComponent(component) {
  componentRegistry[camelCase(component.class)] = component;
}
