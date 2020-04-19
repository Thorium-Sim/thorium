import {gql} from "apollo-server-express";
import App from "../../../app";
import * as components from "../../../classes/universe/components";
import {produce} from "immer";
import {pubsub} from "../../../helpers/subscriptionManager";

const schema = gql`
  type EngineComponent {
    maxSpeed: Float
    currentSpeed: Float
    heat: Float
    heatRate: Float
    coolant: Float
    cooling: Boolean
  }
  enum EntityEngineEnum {
    warp
    impulse
  }
  extend type Entity {
    enginesWarp: EngineComponent
    enginesImpulse: EngineComponent
  }
  extend type Mutation {
    entitySetEngine(
      id: ID
      type: EntityEngineEnum!
      maxSpeed: Float
      currentSpeed: Float
      heat: Float
      heatRate: Float
      coolant: Float
      cooling: Boolean
    ): String
    entityRemoveEngine(id: ID!, type: EntityEngineEnum!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetEngine: (root, {id, type, ...properties}, context) => {
      const ComponentClass =
        components[`Engines${type === "impulse" ? "Impulse" : "Warp"}`];
      const componentProperty = `engines${
        type === "impulse" ? "Impulse" : "Warp"
      }`;
      const otherEngine = `engines${type === "impulse" ? "Warp" : "Impulse"}`;
      const entityId = id || context.entityId;
      if (!entityId && entityId !== 0) return;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      if (entityIndex === -1) return;
      const flightId = App.entities[entityIndex]?.flightId;
      const template = Boolean(App.entities[entityIndex].template);

      App.entities = produce(App.entities, draft => {
        const entity = draft[entityIndex];
        if (!entity[componentProperty]) {
          entity[componentProperty] = new ComponentClass({
            ...properties,
          });
        } else {
          Object.entries(properties).forEach(([key, value]) => {
            if (key === "currentSpeed" && value > 0 && entity[otherEngine]) {
              // Change the other engine to be 0
              entity[otherEngine][key] = 0;
            }
            entity[componentProperty][key] =
              value * entity[componentProperty].maxSpeed;
          });
        }
      });
      pubsub.publish("entities", {
        flightId,
        template: template ?? null,
        entities: App.entities,
      });
    },
    entityRemoveEngine: (rootQuery, {id, type}, context) => {
      const componentProperty = `engines${
        type === "impulse" ? "Impulse" : "Warp"
      }`;
      const entityId = id || context.entityId;
      if (!entityId && entityId !== 0) return;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      if (entityIndex === -1) return;
      const flightId = App.entities[entityIndex].flightId;
      const template = Boolean(App.entities[entityIndex].template);
      App.entities = produce(App.entities, draft => {
        const entity = draft[entityIndex];
        entity[componentProperty] = null;
      });
      pubsub.publish("entities", {
        flightId,
        template: template ?? null,
        entities: App.entities,
      });
    },
  },
};

export default {schema, resolver};
