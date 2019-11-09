const fs = require("fs");
const package = require("../package.json");
const prettier = require("prettier");

const version = process.argv[2];

fs.writeFileSync(
  "./package.json",
  prettier.format(JSON.stringify({...package, version}), {
    parser: "json",
    printWidth: 40,
  }),
);
