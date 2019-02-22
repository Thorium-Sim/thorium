import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import { symptoms } from "../classes/medical/symptoms";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Sickbay implements SystemInterface {
    id: ID
    simulatorId: ID
    name: String
    displayName: String
    type: String
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]

    deconProgram: String
    deconLocation: String
    deconActive: Boolean
    deconOffset: Float
    autoFinishDecon: Boolean

    sickbayRoster: [Crew]
    bunks: [SickbayBunk]
  }

  type SickbayBunk {
    id: ID
    sickbayId: ID
    scanRequest: String
    scanResults: String
    scanning: Boolean
    patient: Crew
  }

  type Chart {
    id: ID
    admitTime: String
    dischargeTime: String
    bloodPressure: String
    heartRate: Float
    temperature: Float
    o2levels: Float
    symptoms: [String]
    diagnosis: [String]
    treatment: String
    treatmentRequest: Boolean
    painPoints: [PainPoint]
  }

  type PainPoint {
    x: Float
    y: Float
  }
  input PainPointInput {
    x: Float
    y: Float
  }

  input ChartInput {
    id: ID
    admitTime: String
    dischargeTime: String
    bloodPressure: String
    heartRate: Float
    temperature: Float
    o2levels: Float
    symptoms: [String]
    treatment: String
    treatmentRequest: Boolean
    painPoints: [PainPointInput]
  }

  extend type Query {
    sickbay(simulatorId: ID): [Sickbay]
    sickbaySingle(id: ID): Sickbay

    symptoms: [String]
  }
  extend type Mutation {
    setSickbayBunks(id: ID!, count: Int): String
    addSickbayCrew(id: ID!, crew: CrewInput!): String
    removeSickbayCrew(id: ID!, crewId: ID!): String
    updateSickbayCrew(id: ID!, crewId: ID!, crew: CrewInput!): String
    scanSickbayBunk(id: ID!, bunkId: ID!, request: String!): String
    cancelSickbayBunkScan(id: ID!, bunkId: ID!): String
    sickbayBunkScanResponse(id: ID!, bunkId: ID!, response: String!): String
    assignPatient(id: ID!, bunkId: ID!, crewId: ID!): String
    dischargePatient(id: ID!, bunkId: ID!): String
    startDeconProgram(id: ID, program: String!, location: String!): String
    updateDeconOffset(id: ID!, offset: Float!): String
    cancelDeconProgram(id: ID!): String
    completeDeconProgram(id: ID!): String
    setDeconAutoFinish(id: ID!, finish: Boolean!): String
    updatePatientChart(simulatorId: ID, crewId: ID!, chart: ChartInput!): String
  }
  extend type Subscription {
    sickbayUpdate(simulatorId: ID): [Sickbay]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  SickbayBunk: {
    patient(bunk) {
      const sickbay = App.systems.find(s => s.id === bunk.sickbayId);
      return App.crew
        .concat(sickbay ? sickbay.sickbayRoster : [])
        .find(c => c.id === bunk.patient);
    }
  },
  Query: {
    sickbay(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.class === "Sickbay");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    },
    sickbaySingle(root, { id }) {
      return App.systems.find(s => s.id === id);
    },
    symptoms() {
      return symptoms;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    sickbayUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("sickbayUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
