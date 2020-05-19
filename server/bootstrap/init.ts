import paths from "../helpers/paths";
import fs from "fs";
import os from "os";
import path from "path";
import https from "https";
import importAssets from "../imports/asset/import";
import "../helpers/sentry";

require("dotenv").config({
  debug: process.env.NODE_ENV === "development",
  path: `${__dirname}/../../.env`,
});
const warn = console.warn;
console.warn = (message: string) => {
  if (
    message.indexOf(
      'Pass false into "resolverValidationOptions.requireResolversForResolveType',
    ) > -1
  )
    return;
  warn(message);
};

export const download = function (
  url: string,
  dest: string,
  callback: (err: string) => void,
) {
  const file = fs.createWriteStream(dest);
  https.get(url, function (res) {
    res
      .on("data", function (chunk) {
        file.write(chunk);
      })
      .on("end", function () {
        file.end();
        callback(null);
      })
      .on("error", function (err) {
        callback(err.message);
      });
  });
};

let snapshotDir = "./snapshots/";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}

export default () => {
  return new Promise(resolve => {
    console.info(`Starting Thorium...${Array(20).fill("\n").join("")}`);

    fs.exists(snapshotDir, exists =>
      exists ? resolve() : fs.mkdir(snapshotDir, () => resolve()),
    );
  })
    .then(() => {
      return new Promise(resolve => {
        let assetDir = path.resolve("./assets/");

        if (process.env.NODE_ENV === "production") {
          assetDir = paths.userData + "/assets";
        }
        // Ensure the asset folder exists
        fs.exists(assetDir, exists =>
          exists ? resolve() : fs.mkdir(assetDir, () => resolve()),
        );
      });
    })
    .then(() => {
      return new Promise(resolve => {
        const defaultSnapshot = require("../helpers/defaultSnapshot.js")
          .default;
        let snapshotDir = "./snapshots/";
        if (process.env.NODE_ENV === "production") {
          snapshotDir = paths.userData + "/";
        }
        const snapshotFile = `${snapshotDir}snapshot${
          process.env.NODE_ENV === "production" ? "" : "-dev"
        }.json`;

        if (!fs.existsSync(snapshotFile)) {
          console.info("No snapshot.json found. Creating.");
          fs.writeFileSync(snapshotFile, JSON.stringify(defaultSnapshot));
          // This was an initial load. We should download and install assets
          console.info("First-time load. Downloading assets...");
          const dest = path.resolve(`${os.tmpdir()}/assets.aset`);
          download(
            "https://s3.amazonaws.com/thoriumsim/assets.zip",
            dest,
            err => {
              if (err) {
                console.error("There was an error", err);
              }
              importAssets(dest, () => {
                fs.unlink(dest, error => {
                  if (err) console.error(error);
                  console.info("Asset Download Complete");
                  resolve();
                });
              });
            },
          );
        } else {
          resolve();
        }
      });
    });
};
