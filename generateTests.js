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

console.log(JSON.stringify(tests));

Object.entries(tests).forEach(([key, {path, imports}]) => {
  const filePath = `./src/components/views/${key}/`;
  const mock = imports.find(t => t.type.includes("Mock"));
  const componentImport = imports.find(t => t.type === "Component");
  if (componentImport) {
    const queries = componentImport.imports;
    fs.writeFileSync(
      `${filePath}${key}.test.js`,
      `import React from "react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component${
        queries ? `, {${queries.join(",")}}` : ""
      } from "./${componentImport.source.replace(
        `../components/views/${key}/`,
        "",
      )}";
${mock ? `import ${mock.type} from "../../${mock.source}";` : ""}

it("should render", async () => {
  const {container} = render(<Component {...baseProps} />, {
    ${queries ? `queries: [${queries.map(q => `"${q}"`).join(", ")}],` : ""}
    ${mock ? `mocks: ${mock.type}` : ""}
  });
  expect(container.innerHTML).toBeTruthy();
});
`,
    );
  }
});
