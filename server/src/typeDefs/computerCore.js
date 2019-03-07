import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
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
  extend type Query {
    computerCore(simulatorId: ID): [ComputerCore]
    oneComputerCore(id: ID!): ComputerCore
  }
  extend type Mutation {
    addComputerCoreUser(id: ID!, user: ComputerCoreUserInput): ComputerCoreUser
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
  }
  extend type Subscription {
    computerCoreUpdate(simulatorId: ID): [ComputerCore]
  }
`;

const resolver = {
  // ComputerCore: {
  //   locations(rootValue) {
  //     return rootValue.locations.map(r =>
  //       App.rooms.find(room => room.id === r)
  //     );
  //   }
  // },
  Query: {
    computerCore(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.class === "ComputerCore");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    },
    oneComputerCore(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    computerCoreUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnVal = rootValue;
        if (simulatorId) {
          returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
        }
        return returnVal;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("computerCoreUpdate"),
        (rootValue, { simulatorId }) => {
          let returnVal = rootValue;
          if (simulatorId) {
            returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
          }
          return returnVal.length > 0;
        }
      )
    }
  }
};

export default { schema, resolver };
