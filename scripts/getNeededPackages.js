const fs = require("fs");
const packages = require("@yarnpkg/lockfile").parse(
  fs.readFileSync("./yarn.lock", "utf8"),
);
const needed = [
  "uuid",
  "electron",
  "bonjour",
  "electron-is-dev",
  "electron-settings",
  "is-linux",
  "is-osx",
  "is-windows",
  "semver",
  "electron-updater",
  "universalify",
  "usb-detection",
  "dmx",
  "e131",
];

const memo = {};

function getNeededPackages(pkg) {
  if (memo[pkg]) return memo[pkg];
  const packageName = Object.keys(packages.object).find(key => {
    return key.split("@")[key[0] === "@" ? 1 : 0] === pkg.replace("@", "");
  });
  if (!packageName) {
    console.error("Couldn't find object for ", pkg);
    return [];
  }
  const packageObj = packages.object[packageName];
  if (!packageObj.dependencies) {
    memo[pkg] = [pkg];
    return [pkg];
  }
  memo[pkg] = [pkg];

  memo[pkg] = [
    pkg,
    ...Object.keys(packageObj.dependencies).map(getNeededPackages),
  ];
  return memo[pkg];
}

console.info(
  `{${needed
    .reduce((acc, next) => acc.concat(getNeededPackages(next)), [])
    .flat(Infinity)
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .join(",")}}`,
);
