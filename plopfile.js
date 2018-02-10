const path = require("path");
const fs = require("fs");
module.exports = function(plop) {
  // controller generator
  plop.addPrompt("filePath", require("inquirer-file-path"));
  plop.addHelper("absPath", function(p) {
    return path.resolve(plop.getPlopfilePath(), p);
  });
  plop.addPrompt("recursive", require("inquirer-recursive"));
  plop.setGenerator("mutation", {
    description: "Add a mutation to an existing system",
    prompts: [
      {
        type: "filePath",
        name: "path",
        message: "where would you like to add this mutation?",
        basePath: plop.getPlopfilePath() + "/server/schema/mutations"
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
            message: "What type??",
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
          .readFileSync(path.resolve(`server/schema/mutations/${p}`), "utf8")
          .replace(/\n`;/gi, `\n${line}\n\`;`);
        fs.writeFileSync(path.resolve(`server/schema/mutations/${p}`), file);
        return `Wrote file: ${`server/schema/mutations/${p}`}`;
      },
      {
        type: "modify",
        path: '{{absPath "server/resolvers"}}/{{path}}',
        pattern: /(Mutations = {[\s\S]*)\n};\n\n/gi,
        template: `$1,\n  {{mutation}}(root, args, context) {\n    App.handleEvent(args, "{{mutation}}", context);\n  }\n\};\n\n`
      },
      ({ path: p, mutation, args }) => {
        const line = `

 App.on("${mutation}", ({${args.map(a => a.name).join(", ")}}) => {

});
`;
        const file =
          fs.readFileSync(path.resolve(`server/events/${p}`), "utf8") + line;
        fs.writeFileSync(path.resolve(`server/events/${p}`), file);
        return `Wrote file: ${`server/events/${p}`}`;
      }
    ]
  });
  plop.setGenerator("full class", {
    description: "Create a new class, including events, resolvers, and schema",
    prompts: [], // array of inquirer prompts
    actions: [] // array of actions
  });
};
