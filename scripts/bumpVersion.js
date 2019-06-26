const fs = require("fs");
const package = require("../package.json");
const clientPackage = require("../client/package.json");
const serverPackage = require("../server/package.json");
const prettier = require("prettier");

const version = process.argv[2];

fs.writeFileSync(
  "./package.json",
  prettier.format(JSON.stringify({ ...package, version }), {
    parser: "json",
    printWidth: 40
  })
);
fs.writeFileSync(
  "./client/package.json",
  prettier.format(JSON.stringify({ ...clientPackage, version }), {
    parser: "json",
    printWidth: 40
  })
);
fs.writeFileSync(
  "./server/package.json",
  prettier.format(JSON.stringify({ ...serverPackage, version }), {
    parser: "json",
    printWidth: 40
  })
);
