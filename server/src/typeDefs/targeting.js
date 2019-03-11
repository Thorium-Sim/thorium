import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Targeting {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    power: Power
    damage: Damage
    contacts: [TargetingContact]
    classes: [TargetingClass]
    quadrants: Boolean
    range: Float
    coordinateTargeting: Boolean
    interference: Float
    targetedSensorContact: SensorContact
    calculatedTarget: StringCoordinates
    enteredTarget: StringCoordinates
  }

  type StringCoordinates {
    x: String
    y: String
    z: String
  }

  input StringCoordinatesInput {
    x: String
    y: String
    z: String
  }
  type TargetingClass {
    id: ID
    name: String
    size: Float
    icon: String
    picture: String
    speed: Float
    quadrant: Int
    moving: Boolean
  }

  input TargetClassInput {
    id: ID
    name: String
    size: Float
    icon: String
    picture: String
    speed: Float
    quadrant: Int
    moving: Boolean
  }

  type TargetingContact {
    id: ID
    class: ID
    name: String
    size: Float
    targeted: Boolean
    system: String
    icon: String
    picture: String
    speed: Float
    quadrant: Int
    destroyed: Boolean
    moving: Boolean
  }
  extend type Query {
    targeting(id: ID, simulatorId: ID): [Targeting]
  }
  extend type Mutation {
    createTargetingContact(id: ID!, targetClass: ID!): String
    targetTargetingContact(id: ID!, targetId: ID!): String
    untargetTargetingContact(id: ID!, targetId: ID!): String
    targetSystem(id: ID!, targetId: ID!, system: String!): String
    removeTarget(id: ID!, targetId: ID!): String
    addTargetClass(id: ID!, classInput: TargetClassInput!): String
    removeTargetClass(id: ID!, classId: ID!): String
    updateTargetClass(id: ID!, classInput: TargetClassInput!): String
    setTargetClassCount(id: ID!, classId: ID!, count: Int!): String
    setCoordinateTargeting(id: ID!, which: Boolean!): String
    setTargetingCalculatedTarget(
      id: ID
      simulatorId: ID
      coordinates: CoordinatesInput
      contactId: ID
    ): String
    setTargetingEnteredTarget(
      id: ID!
      coordinates: StringCoordinatesInput
    ): String
    """
    Macro: Targeting: Clear Targeting Classes
    """
    clearAllTargetingContacts(id: ID!): String
    setTargetingRange(id: ID!, range: Float!): String

    """
    Macro: Targeting: Set Targeting Classes
    """
    setTargetingClasses(id: ID!, classInput: [TargetClassInput]!): String
  }
  extend type Subscription {
    targetingUpdate(simulatorId: ID): [Targeting]
  }
`;

function getClassValue({ systemId, class: classId, key }) {
  const system = App.systems.find(s => s.id === systemId);
  const targetClass = system.classes.find(c => c.id === classId);
  if (targetClass) {
    return targetClass[key];
  }
}

const resolver = {
  Targeting: {
    targetedSensorContact(targeting) {
      const sensors = App.systems.find(
        s =>
          s.simulatorId === targeting.simulatorId &&
          s.type === "Sensors" &&
          s.domain === "external"
      );
      if (
        targeting.calculatedTarget &&
        targeting.enteredTarget &&
        targeting.calculatedTarget.x === targeting.enteredTarget.x &&
        targeting.calculatedTarget.y === targeting.enteredTarget.y &&
        targeting.calculatedTarget.z === targeting.enteredTarget.z
      ) {
        return sensors
          ? sensors.contacts.find(c => c.id === targeting.targetedSensorContact)
          : null;
      }
      return null;
    },
    interference(targeting) {
      const sensors = App.systems.find(
        s =>
          s.simulatorId === targeting.simulatorId &&
          s.type === "Sensors" &&
          s.domain === "external"
      );
      return sensors ? sensors.interference : 0;
    }
  },
  TargetingContact: {
    name(rootValue) {
      return getClassValue({ ...rootValue, key: "name" });
    },
    size(rootValue) {
      return getClassValue({ ...rootValue, key: "size" });
    },
    icon(rootValue) {
      return getClassValue({ ...rootValue, key: "icon" });
    },
    picture(rootValue) {
      return getClassValue({ ...rootValue, key: "picture" });
    },
    speed(rootValue) {
      return getClassValue({ ...rootValue, key: "speed" });
    },
    quadrant(rootValue) {
      return getClassValue({ ...rootValue, key: "quadrant" });
    },
    moving(rootValue) {
      return getClassValue({ ...rootValue, key: "moving" });
    }
  },
  Query: {
    targeting(root, { id, simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Targeting");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      if (id) {
        returnVal = returnVal.filter(s => s.id === id);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    targetingUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("targetingUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
