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
    hackingPorts: HackingPorts!
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

  input ComputerCoreFileInput {
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
  type HackingPorts {
    logs: Int
    longRange: Int
    remoteControl: Int
    fileViewer: Int
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
    computerCoreAddFile(id: ID!, file: ComputerCoreFileInput!): String

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
    computerCoreHackingPreset(id: ID!, presetId: ID): String
    computerCoreSetHackingState(id: ID!, state: String!): String
    computerCoreAppendLog(id: ID!, log: String!): String
    computerCoreDeleteLog(id: ID!, index: Int!): String
    computerCoreSetHackingFrequency(id: ID!, frequency: Float!): String
    computerCoreUpdateHackingFiles(id: ID!, files: JSON!): String
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
        if (sys.hackingState === "hacking") {
          sys.hackingLog.unshift(
            "Remote client fe80::4c3:2e73:2557:c71a was disconnected.",
          );
        }
        sys.hackingState = "idle";
      });
    },
    computerCoreHackingPreset(root, {id, presetId}) {
      performAction(id, sys => {
        const preset = App.hackingPresets.find(i => i.id === presetId);
        if (preset) {
          sys.activeHackingPreset = preset;
          sys.hackingPorts = {
            logs: preset.logs ? Math.round(Math.random() * 16385 + 1000) : null,
            longRange: preset.longRange
              ? Math.round(Math.random() * 16385 + 17385)
              : null,
            // remoteControl: preset.remoteControl
            //   ? Math.round(Math.random() * 16385 + 33770)
            //   : null,
            fileViewer: preset.fileViewer
              ? Math.round(Math.random() * 16385 + 50155)
              : null,
          };
        } else {
          sys.activeHackingPreset = null;
          sys.hackingPorts = {};
          sys.hackingActive = false;
          sys.hackingLog = [];
          sys.hackingState = "idle";
        }
      });
    },
    computerCoreSetHackingState(root, {id, state}) {
      performAction(id, (sys: ComputerCore) => {
        if (state === "scanning") {
          sys.hackingLog.unshift("Ports scanned by fe80::4c3:2e73:2557:c71a");
          if (sys.training) {
            setTimeout(() => {
              sys.hackingState = "hacking";
              pubsub.publish(
                "computerCoreUpdate",
                App.systems.filter(s => s.class === "ComputerCore"),
              );
            }, 5000);
          }
        }
        if (state === "idle") {
          sys.hackingLog.unshift(
            "Connection with fe80::4c3:2e73:2557:c71a terminated",
          );
        }
        if (state === "hacking") {
          sys.hackingLog.unshift(
            "Unauthorized connection established with fe80::4c3:2e73:2557:c71a",
          );
        }
        sys.hackingState = state;
      });
    },
    computerCoreAppendLog(root, {id, log}) {
      performAction(id, sys => {
        sys.hackingLog.unshift(log);
      });
    },
    computerCoreDeleteLog(root, {id, index}) {
      performAction(id, (sys: ComputerCore) => {
        sys.hackingLog.splice(index, 1);
      });
    },
    computerCoreSetHackingFrequency(root, {id, frequency}) {
      performAction(id, sys => {
        sys.hackingPortScanFrequency = frequency;
      });
    },
    computerCoreUpdateHackingFiles(root, {id, files}) {
      performAction(id, sys => {
        if (sys.activeHackingPreset) {
          sys.activeHackingPreset.files = files;
        }
      });
    },
    computerCoreAddFile(root, {id, file}) {
      performAction(id, sys => {
        if (sys.activeHackingPreset) {
          sys.addFile(file);
        }
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
