const packager = require("launchui-packager");
const package = require("../package.json");
packager(
  {
    name: "Thorium",
    version: package.version,
    entry: "./build/server.js",
    out: "./packages",
    // Optional
    overwrite: true,
    // platform: "linux",
    // pack: "zip",
    company: "Fyreworks LLC.",
    copyright: `Copyright ${new Date().getFullYear()} Fyreworks LLC.`,
    icon: "./server/icon.icns",
    identifier: "us.fyreworks.thorium",
    license: "./LICENSE",
    dir: "./build"
  },
  function(err, outPath) {
    // outPath will be the path of the created package directory or file
  }
);
