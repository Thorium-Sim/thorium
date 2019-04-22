const semver = require("semver");
const fs = require("fs");
const package = require("../package.json");
const clientPackage = require("../client/package.json");
const serverPackage = require("../server/package.json");
const prettier = require("prettier");

let version = package.version;

const arg = process.argv[2];
switch (arg) {
  case "--major":
  case "-M":
    version = semver(version).inc("major").version;
    break;
  case "--minor":
  case "-M":
    version = semver(version).inc("minor").version;
    break;
  default:
    version = semver(version).inc("patch").version;
    break;
}

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
