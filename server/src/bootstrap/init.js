import paths from "../helpers/paths";
import fs from "fs";
import os from "os";
import path from "path";
import https from "https";
import ProgressBar from "progress";
import importAssets from "../imports/asset/import";
export const download = function(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(res) {
    const bar = new ProgressBar(
      `Downloading: [:bar] :percent Elapsed: :elapseds ETA: :etas`,
      {
        total: parseInt(res.headers["content-length"], 10),
        complete: "=",
        incomplete: " ",
        width: 20
      }
    );

    res
      .on("data", function(chunk) {
        file.write(chunk);
        bar.tick(chunk.length);
      })
      .on("end", function() {
        file.end();
        callback(null);
      })
      .on("error", function(err) {
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
    console.log(
      `Starting Thorium...${Array(20)
        .fill("\n")
        .join("")}`
    );

    fs.exists(
      snapshotDir,
      exists => (exists ? resolve() : fs.mkdir(snapshotDir, () => resolve()))
    );
  })
    .then(() => {
      return new Promise(resolve => {
        let assetDir = path.resolve("./assets/");

        if (process.env.NODE_ENV === "production") {
          assetDir = paths.userData + "/assets";
        }
        // Ensure the asset folder exists
        fs.exists(
          assetDir,
          exists => (exists ? resolve() : fs.mkdir(assetDir, () => resolve()))
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
          console.log("No snapshot.json found. Creating.");
          fs.writeFileSync(snapshotFile, JSON.stringify(defaultSnapshot));
          // This was an initial load. We should download and install assets
          console.log("First-time load. Downloading assets...");
          const dest = path.resolve(`${os.tmpdir()}/assets.aset`);
          download(
            "https://s3.amazonaws.com/thoriumsim/assets.zip",
            dest,
            err => {
              if (err) {
                console.log("There was an error", err);
              }
              importAssets(dest, () => {
                fs.unlink(dest, error => {
                  if (err) console.log(error);
                  console.log("Asset Download Complete");
                  resolve();
                });
              });
            }
          );
        } else {
          resolve();
        }
      });
    });
};
