import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type CommandLine {
    id: ID
    name: String
    commands: [CommandLineCommand]
    components: JSON
    connections: JSON
    values: JSON
    config: JSON
  }

  type CommandLineCommand {
    name: String
    help: String
    hidden: Boolean
  }
  extend type Query {
    commandLine(simulatorId: ID): [CommandLine]
    commandLineCommands(simulatorId: ID!): [CommandLineCommand]
  }
  extend type Mutation {
    addCommandLine(name: String!): String
    renameCommandLine(id: ID!, name: String!): String
    removeCommandLine(id: ID!): String
    updateCommandLine(
      id: ID!
      components: JSON
      connections: JSON
      values: JSON
      config: JSON
    ): String
    executeCommandLine(simulatorId: ID!, command: String!, arg: String): String
    """
    Macro: Command Line: Add command line
    """
    addCommandLineToSimulator(simulatorId: ID!, commandLine: ID!): String
    """
    Macro: Command Line: Remove command line
    """
    removeCommandLineFromSimulator(simulatorId: ID!, commandLine: ID!): String
  }
  extend type Subscription {
    commandLineUpdate(simulatorId: ID): [CommandLine]
  }
`;

const resolver = {
  Query: {
    commandLine(root, { simulatorId }) {
      let returnVal = App.commandLine;
      if (simulatorId) {
        returnVal.filter(c => c.simulatorId === simulatorId);
      } else {
        returnVal = returnVal.filter(c => !c.simulatorId);
      }
      return returnVal;
    },
    commandLineCommands(root, { simulatorId }) {
      return App.commandLine
        .filter(c => c.simulatorId === simulatorId)
        .reduce((prev, next) => prev.concat(next.commands), []);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    commandLineUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(c => c.simulatorId === simulatorId);
        }
        return rootValue.filter(c => !c.simulatorId);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("commandLineUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId)
            return rootValue.find(c => c.simulatorId === simulatorId);
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
