const fs = require("fs");
const acorn = require("acorn-loose");

const specifiers = ["Component", "CoreComponent"];

const tests = fs
  .readdirSync("./src/stories")
  .filter(f => f.includes(".stories.js"))
  .reduce((acc, next) => {
    const path = `./src/components/views/${next.replace(".stories.js", "")}`;
    const file = fs.readFileSync(`./src/stories/${next}`, "utf8");

    const ast = acorn.parse(file, {sourceType: "module"});

    const imports = ast.body.reduce((acc, next) => {
      const obj = {};
      if (next.type === "ImportDeclaration") {
        const defaultSpecifier = next.specifiers.find(
          c => c.type === "ImportDefaultSpecifier",
        );
        if (
          defaultSpecifier &&
          (specifiers.includes(defaultSpecifier.local.name) ||
            defaultSpecifier.local.name.includes("Mock"))
        ) {
          obj.source = next.source.value;
          obj.type = defaultSpecifier.local.name;
          obj.imports = [];
          next.specifiers.forEach(s => {
            if (s.type === "ImportSpecifier") {
              obj.imports.push(s.local.name);
            }
          });
          if (obj.imports.length === 0) delete obj.imports;
        }
      }
      if (Object.keys(obj).length > 0) {
        acc.push(obj);
      }
      return acc;
    }, []);

    const output = {
      path,
      imports,
    };
    acc[next.replace(".stories.js", "")] = output;
    return acc;
  }, {});
