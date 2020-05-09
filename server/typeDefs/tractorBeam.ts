import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {TractorBeam} from "../classes";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type TractorBeamBeam {
    id: ID!
    state: Boolean!
    target: Boolean!
    targetLabel: String!
    strength: Float!
    stress: Float!
    scanning: Boolean!
  }
  type TractorBeam implements SystemInterface {
    id: ID!
    simulatorId: ID
    type: String
    power: Power!
    damage: Damage!
    name: String!
    displayName: String!
    upgradeName: String
    upgraded: Boolean
    stealthFactor: Float
    locations: [Room]
    beams: [TractorBeamBeam!]!
  }
  extend type Query {
    tractorBeam(simulatorId: ID): [TractorBeam]
  }
  extend type Mutation {
    setTractorBeamState(id: ID!, beam: ID!, state: Boolean!): String
    setTractorBeamTarget(id: ID!, beam: ID!, target: Boolean!): String
    setTractorBeamStrength(id: ID!, beam: ID!, strength: Float!): String
    setTractorBeamStress(id: ID!, beam: ID!, stress: Float!): String
    setTractorBeamScanning(id: ID!, beam: ID!, scanning: Boolean!): String
    setTractorBeamTargetLabel(id: ID!, beam: ID!, label: String!): String
    setTractorBeamCount(id: ID!, beams: Int!): String

    """
    Macro: Tractor Beam: Add Target
    Requires:
     - Cards:TractorBeam
     - Systems:TractorBeam
    """
    addTractorTarget(id: ID!, beamId: ID!, label: String): String
    """
    Macro: Tractor Beam: Remove Target
    Requires:
     - Cards:TractorBeam
     - Systems:TractorBeam
    """
    removeTractorTarget(id: ID!, beamId: ID!): String
  }
  extend type Subscription {
    tractorBeamUpdate(simulatorId: ID): [TractorBeam]
  }
`;

function doAction(
  id: string,
  beam: string,
  action: (sys: TractorBeam) => void,
) {
  const system: TractorBeam = App.systems.find(s => s.id === id);
  action(system);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam"),
  );
}

const resolver = {
  Query: {
    tractorBeam(root, {simulatorId}) {
      let returnVal = App.systems.filter(s => s.type === "TractorBeam");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
  },
  Mutation: {
    setTractorBeamCount(rootValue, {id, beams}) {
      doAction(id, null, system => {
        system.setBeamCount(beams);
      });
    },
    setTractorBeamState: (rootValue, {id, beam, state}) => {
      doAction(id, beam, system => {
        system.setState(beam, state);
        system.setScanning(beam, false);
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: system.simulatorId,
          type: "Tractor Beam",
          station: "Core",
          title: `Tractor Beam ${state ? "Activated" : "Deactivated"}`,
          body: "",
          color: "info",
        });
        App.handleEvent(
          {
            simulatorId: system.simulatorId,
            component: "TractorBeamCore",
            title: `Tractor Beam ${state ? "Activated" : "Deactivated"}`,
            body: null,
            color: "info",
          },
          "addCoreFeed",
        );
      });
    },
    setTractorBeamTarget: (rootValue, {id, beam, target}) => {
      doAction(id, beam, sys => {
        sys.setTarget(beam, target);
        sys.setScanning(beam, false);
      });
    },
    setTractorBeamStrength: (rootValue, {id, beam, strength}) => {
      doAction(id, beam, system => {
        system.setStrength(beam, strength);
      });
    },
    setTractorBeamStress: (rootValue, {id, beam, stress}) => {
      doAction(id, beam, system => {
        system.setStress(beam, stress);
      });
    },
    setTractorBeamScanning: (rootValue, {id, beam, scanning}) => {
      doAction(id, beam, system => {
        system.setScanning(beam, scanning);
        App.handleEvent(
          {simulatorId: system.simulatorId, component: "TractorBeamCore"},
          "addCoreFeed",
        );
      });
    },
    setTractorBeamTargetLabel: (rootValue, {id, beam, label}) => {
      doAction(id, beam, system => {
        system.setTargetLabel(beam, label);
      });
    },
    addTractorTarget: (rootValue, {id, simulatorId, beam, label}) => {
      let sys: TractorBeam;
      if (id) {
        sys = App.systems.find(s => s.id === id);
      } else {
        sys = App.systems.find(
          s => s.simulatorId === simulatorId && s.class === "TractorBeam",
        );
      }
      if (!sys) return;
      const beamId = beam || sys.beams[0].id;
      sys.setTargetLabel(beamId, label);
      sys.setTarget(beamId, true);
      sys.setScanning(beamId, false);
      pubsub.publish(
        "tractorBeamUpdate",
        App.systems.filter(s => s.type === "TractorBeam"),
      );
    },
    removeTractorTarget: (rootValue, {id, simulatorId, beam, label}) => {
      let sys: TractorBeam;
      if (id) {
        sys = App.systems.find(s => s.id === id);
      } else {
        sys = App.systems.find(
          s => s.simulatorId === simulatorId && s.class === "TractorBeam",
        );
      }
      if (!sys) return;
      const beamId = beam || sys.beams[0].id;

      sys.setTargetLabel(beamId, label);
      sys.setTarget(beamId, false);
      pubsub.publish(
        "tractorBeamUpdate",
        App.systems.filter(s => s.type === "TractorBeam"),
      );
    },
  },
  Subscription: {
    tractorBeamUpdate: {
      resolve(rootValue, {simulatorId}) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.systems.filter(s => s.class === "TractorBeam");
            if (simulatorId)
              returnVal = returnVal.filter(s => s.simulatorId === simulatorId);

            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "tractorBeamUpdate"]);
        },
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
