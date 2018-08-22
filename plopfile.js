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
  plop.setGenerator("mutation", {
    description: "Add a mutation to an existing system",
    prompts: [
      {
        type: "filePath",
        name: "path",
        message: "where would you like to add this mutation?",
        basePath: plop.getPlopfilePath() + "/server/src/schema/mutations"
      },
      {
        type: "input",
        name: "mutation",
        message: "What is the name of the mutation? (eg 'getThing')",
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "mutation is required";
        }
      },
      {
        type: "recursive",
        message: "Add any args? ?",
        name: "args",
        prompts: [
          {
            type: "input",
            name: "name",
            message: "What is arg's name?",
            validate: function(value) {
              if (/.+/.test(value)) {
                return true;
              }
              return "arg is required";
            }
          },
          {
            type: "input",
            name: "type",
            message: "What type?",
            validate: function(value) {
              if (/.+/.test(value)) {
                return true;
              }
              return "type is required!";
            }
          }
        ]
      }
    ],
    actions: [
      ({ path: p, mutation, args }) => {
        const line = `${mutation}(${args
          .map(a => `${a.name}:${a.type}`)
          .join(", ")}):String`;
        const file = fs
          .readFileSync(
            path.resolve(`server/src/schema/mutations/${p}`),
            "utf8"
          )
          .replace(/\n`;/gi, `\n${line}\n\`;`);
        fs.writeFileSync(
          path.resolve(`server/src/schema/mutations/${p}`),
          file
        );
        return `Wrote file: ${`server/src/schema/mutations/${p}`}`;
      },
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/{{path}}',
        pattern: /(Mutations = {[\s\S]*)\n};\n\n/gi,
        template: `$1,\n  {{mutation}}(root, args, context) {\n    App.handleEvent(args, "{{mutation}}", context);\n  }\n\};\n\n`
      },
      ({ path: p, mutation, args }) => {
        const line = `

 App.on("${mutation}", ({${args.map(a => a.name).join(", ")}}) => {

});
`;
        const file =
          fs.readFileSync(path.resolve(`server/src/events/${p}`), "utf8") +
          line;
        fs.writeFileSync(path.resolve(`server/src/events/${p}`), file);
        return `Wrote file: ${`server/src/events/${p}`}`;
      }
    ]
  });
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
        path: '{{absPath "server/src/schema/types"}}/{{camelCase name}}.js',
        template: `export default \`
type {{name}}{
  id: ID
  simulatorId: ID
}
\`;
`
      },
      {
        type: "add",
        path: '{{absPath "server/src/schema/queries"}}/{{camelCase name}}.js',
        template: `export default \`
{{camelCase name}}(simulatorId: ID):[{{name}}]
\`;
`
      },
      {
        type: "add",
        path: '{{absPath "server/src/schema/mutations"}}/{{camelCase name}}.js',
        template: `export default \`
\`;
`
      },
      {
        type: "add",
        path:
          '{{absPath "server/src/schema/subscriptions"}}/{{camelCase name}}.js',
        template: `export default \`
{{camelCase name}}Update(simulatorId: ID):[{{name}}]
\`;
`
      },
      {
        type: "add",
        path: '{{absPath "server/src/resolvers"}}/{{camelCase name}}.js',
        template: `import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const {{name}}Queries = {
  {{camelCase name}}(root, { simulatorId }) {
    let returnVal = [];
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const {{name}}Mutations = {};

export const {{name}}Subscriptions = {
  {{camelCase name}}Update: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("{{camelCase name}}Update"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

`
      },
      {
        type: "add",
        path: '{{absPath "server/src/events"}}/{{camelCase name}}.js',
        template: `import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
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
      },
      {
        type: "modify",
        path: '{{absPath "server/src/schema/mutations"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `export {default as {{name}} } from "./{{camelCase name}}.js";`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/schema/subscriptions"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `export {default as {{name}} } from "./{{camelCase name}}.js";`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/schema/queries"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `export {default as {{name}} } from "./{{camelCase name}}.js";`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/schema/types"}}/index.js',
        pattern: /$(?![\r\n])/im,
        template: `export {default as {{name}} } from "./{{camelCase name}}.js";`
      },
      // Imports
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/queries.js',
        pattern: /(?!<=";\n)(.*)(?=\nconst queryMap)/im,
        template: `import { {{name}}Queries } from "./{{camelCase name}}.js";\n`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/mutations.js',
        pattern: /(?!<=";\n)(.*)(?=\nconst mutationMap)/im,
        template: `import { {{name}}Mutations } from "./{{camelCase name}}.js";\n`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/subscriptions.js',
        pattern: /(?!<=";\n)(.*)(?=\nconst subscriptionMap)/im,
        template: `import { {{name}}Subscriptions } from "./{{camelCase name}}.js";\n`
      },

      // Exports
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/queries.js',
        pattern: /(?!<=Queries)(\n.*)(?=\);\n\nexport d)/im,
        template: `,\n  {{name}}Queries\n`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/mutations.js',
        pattern: /(?!<=Mutations)(\n.*)(?=\);\n\nexport d)/im,
        template: `,\n  {{name}}Mutations\n`
      },
      {
        type: "modify",
        path: '{{absPath "server/src/resolvers"}}/subscriptions.js',
        pattern: /(?!<=Subscriptions)(\n.*)(?=\);\n\nexport d)/im,
        template: `,\n  {{name}}Subscriptions\n`
      }
    ] // array of actions
  });
};
