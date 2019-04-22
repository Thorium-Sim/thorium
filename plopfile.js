const path = require("path");
const fs = require("fs");
const { camelCase } = require("change-case");
module.exports = function(plop) {
  // controller generator
  plop.addPrompt("filePath", require("inquirer-file-path"));
  plop.addHelper("absPath", function(p) {
    return path.resolve(plop.getPlopfilePath(), p);
  });
  plop.addHelper("lowerCase", function(p) {
    return p.toLowerCase();
  });
  plop.addHelper("camelCase", function(p) {
    return camelCase(p);
  });
  plop.addPrompt("recursive", require("inquirer-recursive"));
  plop.setGenerator("full class", {
    description: "Create a new class, including events, resolvers, and schema",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the class? Title case.",
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "name is required";
        }
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: '{{absPath "server/src/typeDefs"}}/{{camelCase name}}.js',
        template: `import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql\`
  type {{name}} {
    id: ID
    simulatorId: ID
  }
  extend type Query {
    {{camelCase name}}(simulatorId: ID):[{{name}}]
  }
  extend type Mutation {
    _template: String
  }
  extend type Subscription {
    {{camelCase name}}Update(simulatorId: ID):[{{name}}]
  }
\`;

const resolver = {
  Query: {
    {{camelCase name}}(root, { simulatorId }) {
      let returnVal = [];
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    {{camelCase name}}Update: {
      resolve(rootQuery) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("{{camelCase name}}Update"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
`
      },
      {
        type: "add",
        path: '{{absPath "server/src/events"}}/{{camelCase name}}.js',
        template: `import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";
`
      },
      {
        type: "add",
        path: '{{absPath "server/src/classes"}}/{{camelCase name}}.js',
        template: `import uuid from "uuid";

export default class {{name}} {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "{{name}}";
    this.simulatorId = params.simulatorId || null;
  }
}
`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/classes"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `export {default as {{name}} } from "./{{camelCase name}}";`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/events"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `import "./{{camelCase name}}.js";`
      }
    ] // array of actions
  });
};
