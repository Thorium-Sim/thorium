import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import {ComputerCore, HackingPreset} from "../classes";
import uuid from "uuid";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type ComputerCore {
    id: ID
    simulatorId: ID
    users: [ComputerCoreUser]
    files: [ComputerCoreFile]
    virii: [ComputerCoreVirus]
    terminals: [ComputerCoreTerminals]
    history: [String]

    hackingActive: Boolean
    activeHackingPreset: HackingPreset
    hackingState: String
    hackingPortScanFrequency: Float
    hackingLog: [String!]!
  }

  type ComputerCoreUser {
    id: ID
    name: String
    password: String
    hacker: Boolean
    level: Int
  }

  type ComputerCoreFile {
    id: ID
    name: String
    level: Int
    corrupted: Boolean
    restoring: Boolean
  }

  type ComputerCoreVirus {
    id: ID
    name: String
  }

  type ComputerCoreTerminals {
    id: ID
    name: String
    status: TERMINAL_STATUS
  }

  enum TERMINAL_STATUS {
    F
    O
    S
    R
  }

  input ComputerCoreUserInput {
    name: String
    password: String
    hacker: Boolean
    level: Int
  }

  type HackingLRM {
    id: String!
    title: String!
    message: String!
  }
  type HackingPreset {
    id: String!
    name: String!
    logs: Boolean!
    longRange: Boolean!
    longRangeMessages: [HackingLRM!]!
    remoteControl: Boolean!
    commandLines: [String!]!
    fileViewer: Boolean!
    files: [ComputerCoreFile!]!
  }

  extend type Query {
    computerCore(simulatorId: ID): [ComputerCore]
    oneComputerCore(id: ID!): ComputerCore
    hackingPresets: [HackingPreset!]!
  }
  extend type Mutation {
    addComputerCoreUser(id: ID!, user: ComputerCoreUserInput): ComputerCoreUser
    """
    Macro: Computer Core: Add Hacker
    Requires:
      - Cards:ComputerCore
      - Systems:ComputerCore
    """
    computerCoreAddHacker(id: ID!, name: String, level: Int): String
    updateComputerCoreUser(
      id: ID!
      userId: ID!
      name: String
      level: Int
      password: String
      hacker: Boolean
    ): String
    removeComputerCoreUser(id: ID!, userId: ID!): String
    restoreComputerCoreFile(
      id: ID!
      fileId: ID
      all: Boolean
      level: Int
    ): String
    deleteComputerCoreVirus(id: ID!, virusId: ID!): String
    restartComputerCoreTerminal(id: ID!, terminalId: ID!): String
    addViriiToComputerCore(id: ID!): String

    """
    Macro: Computer Core: Activate External Hacking
    Requires:
      - Cards:ComputerCore
      - Systems:ComputerCore
    """
    computerCoreActivateHacking(id: ID!): String
    """
    Macro: Computer Core: Deactivate External Hacking
    Requires:
      - Cards:ComputerCore
      - Systems:ComputerCore
    """
    computerCoreDeactivateHacking(id: ID!): String
    """
    Macro: Computer Core: Set External Hacking Preset
    Requires:
      - Cards:ComputerCore
      - Systems:ComputerCore
    """
    computerCoreHackingPreset(id: ID!, presetId: ID!): String
    computerCoreSetHackingState(id: ID!, state: String!): String
    computerCoreAppendLog(id: ID!, log: String!): String
    computerCoreSetHackingFrequency(id: ID!, frequency: Float!): String
    # Hacking Presets
    createHackingPreset(name: String!): String
    deleteHackingPreset(id: ID!): String
    updateHackingPreset(id: ID!, preset: JSON!): String
  }
  extend type Subscription {
    computerCoreUpdate(simulatorId: ID): [ComputerCore]
  }
`;

function performAction(id: string, action: (sys: ComputerCore) => void) {
  const sys: ComputerCore = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore"),
  );
}

const resolver = {
  // ComputerCore: {
  //   locations(rootValue) {
  //     return rootValue.locations.map(r =>
  //       App.rooms.find(room => room.id === r)
  //     );
  //   }
  // },
  Query: {
    computerCore(root, {simulatorId}) {
      let returnVal = App.systems.filter(s => s.class === "ComputerCore");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    },
    oneComputerCore(root, {id}) {
      return App.systems.find(s => s.id === id);
    },
    hackingPresets() {
      return App.hackingPresets;
    },
  },
  Mutation: {
    computerCoreActivateHacking(root, {id}) {
      performAction(id, sys => {
        sys.hackingActive = true;
      });
    },
    computerCoreDeactivateHacking(root, {id}) {
      performAction(id, sys => {
        sys.hackingActive = false;
      });
    },
    computerCoreHackingPreset(root, {id, presetId}) {
      performAction(id, sys => {
        const preset = App.hackingPresets.find(i => i.id === presetId);
        if (preset) {
          sys.activeHackingPreset = preset;
        }
      });
    },
    computerCoreSetHackingState(root, {id, state}) {
      performAction(id, sys => {
        sys.hackingState = state;
      });
    },
    computerCoreAppendLog(root, {id, log}) {
      performAction(id, sys => {
        sys.hackingLog.push(log);
      });
    },
    computerCoreSetHackingFrequency(root, {id, frequency}) {
      performAction(id, sys => {
        sys.hackingPortScanFrequency = frequency;
      });
    },
    createHackingPreset(_, {name}) {
      const preset = new HackingPreset({name});
      App.hackingPresets.push(preset);
    },
    deleteHackingPreset(_, {id}) {
      App.hackingPresets = App.hackingPresets.filter(i => i.id !== id);
    },
    updateHackingPreset(_, {id, preset}: {id: string; preset: HackingPreset}) {
      App.hackingPresets.forEach(i => {
        if (i.id === id) {
          i.name = preset.name;
          i.logs = preset.logs;
          i.longRange = preset.longRange;
          i.longRangeMessages = preset.longRangeMessages;
          i.remoteControl = preset.remoteControl;
          i.commandLines = preset.commandLines;
          i.fileViewer = preset.fileViewer;
          i.files = preset.files;
        }
      });
    },
  },
  Subscription: {
    computerCoreUpdate: {
      resolve(rootValue, {simulatorId}) {
        let returnVal = rootValue;
        if (simulatorId) {
          returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
        }
        return returnVal;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.systems.filter(s => s.class === "ComputerCore");
            if (simulatorId)
              returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "computerCoreUpdate"]);
        },
        (rootValue, {simulatorId}) => {
          let returnVal = rootValue;
          if (simulatorId) {
            returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
          }

          return returnVal.length > 0;
        },
      ),
    },
  },
};

export default {schema, resolver};
