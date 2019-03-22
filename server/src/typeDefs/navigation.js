import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Navigation {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    power: Power
    damage: Damage
    calculate: Boolean
    currentCourse: NavLoc
    calculatedCourse: NavLoc
    destination: String
    scanning: Boolean
    destinations: [String]
    presets: [NavPreset]
    thrusters: Boolean
    locations: [Room]
  }

  type NavLoc {
    x: String
    y: String
    z: String
  }

  input NavLocInput {
    x: String
    y: String
    z: String
  }
  type NavPreset {
    name: String
    course: NavLoc
  }
  input NavPresetInput {
    name: String
    course: NavLocInput
  }
  extend type Query {
    navigation(simulatorId: ID): [Navigation]
    navigate(id: ID!): Navigation
  }
  extend type Mutation {
    navCalculateCourse(id: ID!, destination: String!): String
    navCancelCalculation(id: ID!): String

    """
    Macro: Navigation: Send Course
    """
    navCourseResponse(id: ID!, x: String, y: String, z: String): String
    navCourseEntry(id: ID!, x: String, y: String, z: String): String
    navToggleCalculate(id: ID!, which: Boolean!): String
    navSetDestinations(id: ID, destinations: [String]): String
    navSetDestination(id: ID, destination: String): String
    navSetScanning(id: ID, scanning: Boolean): String
    navSetThrusters(id: ID!, thrusters: Boolean): String

    """
    Macro: Navigation: Course Preset
    """
    navSetPresets(id: ID, presets: NavPresetInput): String
  }
  extend type Subscription {
    navigationUpdate(simulatorId: ID): [Navigation]
  }
`;

const resolver = {
  Navigation: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    navigation(rootValue, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Navigation");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    navigate(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    navigationUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("navigationUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
