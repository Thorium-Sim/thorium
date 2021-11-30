import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {StealthField, Sensors} from "../classes";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type StealthField implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    stealthFactor: Float
    activated: Boolean
    charge: Boolean
    changeAlert: Boolean
    sensorsSonar: Boolean
    state: Boolean
    quadrants: StealthQuad
    locations: [Room]
  }

  type StealthQuad {
    fore: Float
    aft: Float
    port: Float
    starboard: Float
  }
  extend type Query {
    stealthField(simulatorId: ID): [StealthField]
    stealth(id: ID!): StealthField
  }
  extend type Mutation {
    setStealthActivated(id: ID, state: Boolean): String
    setStealthCharge(id: ID, state: Boolean): String
    activateStealth(id: ID): String
    deactivateStealth(id: ID): String
    setStealthQuadrant(id: ID, which: String, value: Float): String
    fluxStealthQuadrants(id: ID): String
    stealthChangeAlert(id: ID!, change: Boolean!): String
    stealthSensorsSonar(id: ID!, sonar: Boolean!): String
  }
  extend type Subscription {
    stealthFieldUpdate(simulatorId: ID): [StealthField]
  }
`;

const resolver = {
  StealthField: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r),
      );
    },
  },
  Query: {
    stealthField(root, {simulatorId}) {
      let returnVal = App.systems.filter(s => s.type === "StealthField");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    stealth(root, {id}) {
      return App.systems.find(s => s.id === id);
    },
  },
  Mutation: {
    setStealthActivated(rootValue, {id, state}) {
      const sys = App.systems.find(s => s.id === id);
      sys.setActivated(state);
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
      if (sys.changeAlert) pubsub.publish("simulatorsUpdate", App.simulators);
    },
    setStealthCharge(rootValue, {id, state}) {
      App.systems.find(s => s.id === id).setCharge(state);
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
    },
    activateStealth(rootValue, {id}) {
      const system = App.systems.find(s => s.id === id) as StealthField;
      system.activate();
      if (system.state) {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: system.simulatorId,
          type: "Stealth Field",
          station: "Core",
          title: `Stealth Activated`,
          body: "",
          color: "info",
        });
        App.handleEvent(
          {
            simulatorId: system.simulatorId,
            title: `Stealth Activated`,
            component: "StealthFieldCore",
            body: null,
            color: "info",
          },
          "addCoreFeed",
        );
      }
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
      if (system.changeAlert)
        pubsub.publish("simulatorsUpdate", App.simulators);
      if (system.sensorsSonar) {
        const sensors = App.systems.find(
          s =>
            s.simulatorId === system.simulatorId &&
            s.class === "Sensors" &&
            s.domain === "external",
        ) as Sensors;
        if (sensors) {
          sensors.pings = true;
          pubsub.publish(
            "sensorsUpdate",
            App.systems.filter(s => s.type === "Sensors"),
          );
        }
      }
    },
    deactivateStealth(rootValue, {id}) {
      const system = App.systems.find(s => s.id === id);
      system.deactivate();
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: system.simulatorId,
        type: "Stealth Field",
        station: "Core",
        title: `Stealth Deactivated`,
        body: "",
        color: "info",
      });
      App.handleEvent(
        {
          simulatorId: system.simulatorId,
          title: `Stealth Deactivated`,
          component: "StealthFieldCore",
          body: null,
          color: "info",
        },
        "addCoreFeed",
      );
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
      if (system.changeAlert)
        pubsub.publish("simulatorsUpdate", App.simulators);
      if (system.sensorsSonar) {
        const sensors = App.systems.find(
          s =>
            s.simulatorId === system.simulatorId &&
            s.class === "Sensors" &&
            s.domain === "external",
        ) as Sensors;
        if (sensors) {
          sensors.pings = false;
          pubsub.publish(
            "sensorsUpdate",
            App.systems.filter(s => s.type === "Sensors"),
          );
        }
      }
    },
    setStealthQuadrant(rootValue, {id, which, value}) {
      App.systems.find(s => s.id === id).setQuadrant(which, value);
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
    },
    fluxStealthQuadrants(rootValue, {id}) {
      App.systems.find(s => s.id === id).fluxQuadrants();
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
    },
    stealthChangeAlert(rootValue, {id, change}) {
      App.systems.find(s => s.id === id).setChangeAlert(change);
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
    stealthSensorsSonar(rootValue, {id, sonar}) {
      App.systems.find(s => s.id === id)?.setSensorsSonar(sonar);
      pubsub.publish(
        "stealthFieldUpdate",
        App.systems.filter(s => s.type === "StealthField"),
      );
    },
  },
  Subscription: {
    stealthFieldUpdate: {
      resolve(rootValue, {simulatorId}) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("stealthFieldUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
