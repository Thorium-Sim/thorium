import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Crew {
    id: ID
    simulatorId: ID
    firstName: String
    lastName: String
    name: String
    gender: String
    age: Int
    rank: String
    position: String
    killed: Boolean
    location: Deck
    workRoom: Room
    restRoom: Room
    inventory: [InventoryItem]
    charts: [Chart]
  }

  input CrewInput {
    id: ID
    simulatorId: ID
    firstName: String
    lastName: String
    gender: String
    age: String
    rank: String
    position: String
    killed: Boolean
    workRoom: Int
    restRoom: Int
  }
  extend type Query {
    crew(simulatorId: ID, position: String, killed: Boolean): [Crew]
    crewCount(simulatorId: ID!, position: String, killed: Boolean): Int
  }
  extend type Mutation {
    addCrewmember(crew: CrewInput): String
    removeCrewmember(id: ID): String
    updateCrewmember(crew: CrewInput): String
    newRandomCrewmember(
      simulatorId: ID!
      type: String
      position: String
    ): String
    removeAllCrew(simulatorId: ID!): String
    crewImport(simulatorId: ID!, crew: [CrewInput]!): String
  }
  extend type Subscription {
    crewUpdate(simulatorId: ID, position: String, killed: Boolean): [Crew]
    crewCountUpdate(simulatorId: ID, position: String, killed: Boolean): Int
  }
`;

function getCrew(simulatorId, position, killed, crew) {
  let returnVal = crew || App.crew.concat();
  if (simulatorId) {
    returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
  }
  if (killed === false) {
    returnVal = returnVal.filter(c => !c.killed);
  }
  if (killed === true) {
    returnVal = returnVal.filter(c => c.killed);
  }
  if (position) {
    // Special considerations for the security and damage
    if (position === "security") {
      const regex = /security/gi;
      returnVal = returnVal.filter(c => regex.test(c.position));
    } else if (position === "damage") {
      const damagePositions = [
        "Computer Specialist",
        "Custodian",
        "Quality Assurance",
        "Electrician",
        "Explosive Expert",
        "Fire Control",
        "General Engineer",
        "Hazardous Waste Expert",
        "Maintenance Officer",
        "Mechanic",
        "Plumber",
        "Structural Engineer",
        "Welder"
      ];
      returnVal = returnVal.filter(
        c => damagePositions.indexOf(c.position) > -1
      );
    } else if (position === "medical") {
      const medicalPositions = ["Medical", "Nurse", "Doctor"];
      returnVal = returnVal.filter(c =>
        medicalPositions.find(p => c.position.indexOf(p) > -1)
      );
    }
  }
  return returnVal;
}
const resolver = {
  Crew: {
    name(crew) {
      return crew.firstName + " " + crew.lastName;
    },
    inventory(crew) {
      return App.inventory
        .filter(i => Object.keys(i.crewCount).indexOf(crew.id) > -1)
        .map(i => {
          i.count = i.crewCount[crew.id];
          return i;
        });
    }
  },
  Query: {
    crew(root, { id, simulatorId, position, killed }) {
      return getCrew(simulatorId, position, killed);
    },
    crewCount(root, { simulatorId, position, killed }) {
      return getCrew(simulatorId, position, killed).length;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    crewUpdate: {
      resolve(rootValue, { simulatorId, position, killed }) {
        return getCrew(simulatorId, position, killed, rootValue);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("crewUpdate"),
        rootValue => (rootValue.length > 0 ? true : false)
      )
    },
    crewCountUpdate: {
      resolve(rootValue, { simulatorId, position, killed }) {
        return getCrew(simulatorId, position, killed, rootValue).length;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("crewCountUpdate"),
        rootValue => true
      )
    }
  }
};

export default { schema, resolver };
