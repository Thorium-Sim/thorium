const fs = require("fs");
const packages = JSON.parse(
  fs.readFileSync("./package-lock.json", "utf8"),
).dependencies;
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
  "usb",
  "e131",
];

const memo = {};

function getNeededPackages(pkg) {
  if (memo[pkg]) return memo[pkg];
  const packageName = Object.keys(packages).find(key => {
    return key.split("@")[key[0] === "@" ? 1 : 0] === pkg.replace("@", "");
  });
  if (!packageName) {
    console.error("Couldn't find object for ", pkg);
    return [];
  }
  const packageObj = packages[packageName];
  if (!packageObj.requires) {
    memo[pkg] = [pkg];
    return [pkg];
  }
  memo[pkg] = [pkg];

  memo[pkg] = [pkg, ...Object.keys(packageObj.requires).map(getNeededPackages)];
  return memo[pkg];
}

console.info(
  `{${needed
    .reduce((acc, next) => acc.concat(getNeededPackages(next)), [])
    .flat(Infinity)
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .map(i => `"${i}"`)
    .join(",")}}`,
);
