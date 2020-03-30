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
    entityRemoveEngine(id: ID!): String
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
      const entityId = id || context.entityId;
      if (!entityId && entityId !== 0) return;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      const template = Boolean(App.entities[entityIndex].template);
      if (entityIndex === -1) return;

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
      pubsub.publish("entities", {
        flightId,
        template: template ?? null,
        entities: App.entities,
      });
    },
  },
};

export default {schema, resolver};
