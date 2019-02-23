import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Probes {
    id: ID
    simulatorId: ID
    type: String
    name: String
    power: Power
    damage: Damage
    torpedo: Boolean
    processedData: String
    probes(network: Boolean): [Probe]
    equipment: [ProbeEquipment]
    types: [ProbeType]
    scienceTypes: [ScienceType]
  }

  type Probe {
    id: ID
    name: String
    type: ID
    #Whether the probe is launched by tactical or not
    launched: Boolean
    equipment: [ProbeEquipment]
    engine: Engine
    phaser: Phaser
    navigation: Navigation
    query: String
    querying: Boolean
    response: String
    charge: Float
    history: [History]
  }

  type History {
    date: String
    text: String
  }

  type ScienceProbeEvent {
    simulatorId: ID!
    name: String!
    type: String!
    charge: Float!
  }

  input ProbeInput {
    name: String
    type: ID
    equipment: [EquipmentInput]
  }

  input EquipmentInput {
    id: ID
    count: Int
  }

  # For now, probe equipment will be static.
  # TODO: Make it so probe equipment is cargo based.
  type ProbeEquipment {
    id: ID
    description: String
    name: String
    size: Float
    count: Int
    damage: Damage
    availableProbes: [String]
  }

  input ProbeEquipmentInput {
    description: String
    name: String
    size: Float
    count: Int
  }

  type ProbeType {
    id: ID
    name: String
    description: String
    size: Float
    count: Int
    availableEquipment: [ProbeEquipment]
  }

  input ProbeTypeInput {
    id: ID
    name: String
    size: Float
    count: Int
  }

  type ScienceType {
    id: ID
    name: String
    type: SCIENCE_BURST_DETECTOR
    description: String
    equipment: [String]
  }

  enum SCIENCE_BURST_DETECTOR {
    burst
    detector
  }
  extend type Query {
    probes(simulatorId: ID!): [Probes]
    probe(id: ID!): Probes
  }
  extend type Mutation {
    destroyProbe(id: ID!, probeId: ID!): String
    launchProbe(id: ID!, probe: ProbeInput!): String
    fireProbe(id: ID!, probeId: ID!): String
    updateProbeType(id: ID!, probeType: ProbeTypeInput!): String
    updateProbeEquipment(id: ID!, probeEquipment: ProbeEquipmentInput!): String
    probeQuery(id: ID!, probeId: ID!, query: String): String
    probeQueryResponse(id: ID!, probeId: ID!, response: String): String

    #Macro: Probes: Probe Processed Data
    probeProcessedData(id: ID!, data: String, flash: Boolean): String
    setProbeTorpedo(id: ID!, torpedo: Boolean!): String
    setProbeCharge(id: ID!, probeId: ID!, charge: Float!): String
    activateProbeEmitter(id: ID!, probeId: ID!): String
  }
  extend type Subscription {
    probesUpdate(simulatorId: ID!): [Probes]
    scienceProbeEmitter(simulatorId: ID!): ScienceProbeEvent
  }
`;

const resolver = {
  Probes: {
    probes(launcher, { network }) {
      if (network) {
        return launcher.probes.filter(p => {
          return p.equipment.find(e => e.id === "probe-network-package");
        });
      }
      return launcher.probes;
    }
  },
  Probe: {
    equipment(probe) {
      const parent = App.systems.find(s => s.id === probe.parentId);
      return probe.equipment.map(e => {
        const eq = parent.equipment.find(eqi => eqi.id === e.id);
        return {
          id: e.id,
          name: eq.name,
          count: e.count,
          description: eq.description,
          size: eq.size
        };
      });
    }
  },
  ProbeType: {
    availableEquipment(probeType) {
      const parent = App.systems.find(s => s.id === probeType.parentId);
      return parent.equipment.filter(e => {
        if (e.availableProbes.length === 0) return true;
        if (e.availableProbes.indexOf(probeType.id) > -1) return true;
        return false;
      });
    }
  },
  Query: {
    probes(rootValue, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Probes");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    probe(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    probesUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId) {
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        }
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("probesUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    },
    scienceProbeEmitter: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("scienceProbeEmitter"),
        (rootValue, { simulatorId }) => rootValue.simulatorId === simulatorId
      )
    }
  }
};

export default { schema, resolver };
