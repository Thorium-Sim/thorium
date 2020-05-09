import App from "../../app";
import produce from "immer";
import * as components from "../../classes/universe/components";
import {pascalCase} from "change-case";
import {pubsub} from "../../helpers/subscriptionManager";

export function setComponent<C>(componentProperty, publish = true) {
  const ComponentClass = components[pascalCase(componentProperty)] as C &
    (new (p) => C);
  type keys = keyof C;
  return function mutationHandler(rootQuery, {id, ...properties}, context) {
    const entityId = id || context.entityId;
    if (!entityId && entityId !== 0) return;
    const entityIndex = App.entities.findIndex(e => e.id === entityId);
    if (entityIndex === -1) return;
    const flightId = App.entities[entityIndex].flightId;
    const stageId =
      App.entities[entityIndex]?.stageChild?.parentId ||
      (App.entities[entityIndex].stage && App.entities[entityIndex].id);
    const template = Boolean(App.entities[entityIndex].template);
    if (Object.keys(properties).length === 0 && !id) {
      // No properties are being added, and the ID isn't
      // explicitly set; this component wasn't intended
      // to be added.
      return;
    }
    App.entities = produce(App.entities, draft => {
      const entity = draft[entityIndex];
      if (!entity[componentProperty]) {
        entity[componentProperty] = new ComponentClass({
          ...properties,
        });
      } else {
        Object.entries(properties).forEach(([key, value]) => {
          entity[componentProperty][key] = value;
        });
      }
    });
    if (publish) {
      pubsub.publish("entities", {
        flightId,
        stageId,
        template: template ?? null,
        entities: App.entities,
      });
    }
  };
}

export function removeComponent(componentProperty) {
  return function mutationHandler(rootQuery, {id}, context) {
    const entityId = id || context.entityId;
    if (!entityId && entityId !== 0) return;
    const entityIndex = App.entities.findIndex(e => e.id === entityId);
    if (entityIndex === -1) return;
    const flightId = App.entities[entityIndex].flightId;
    const stageId =
      App.entities[entityIndex]?.stageChild?.parentId ||
      (App.entities[entityIndex].stage && App.entities[entityIndex].id);
    const template = Boolean(App.entities[entityIndex].template);
    App.entities = produce(App.entities, draft => {
      const entity = draft[entityIndex];
      entity[componentProperty] = null;
    });
    pubsub.publish("entities", {
      flightId,
      stageId,
      template: template ?? null,
      entities: App.entities,
    });
  };
}
