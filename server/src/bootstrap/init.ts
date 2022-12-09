import paths from "../helpers/paths";
import fs from "fs/promises";
import {createWriteStream} from "fs";
import os from "os";
import path from "path";
import https from "https";
import importAssets from "../imports/asset/import";
import defaultSnapshot from "../helpers/defaultSnapshot";

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

export async function download(url: string, dest: string) {
  const file = createWriteStream(dest);
  return new Promise<void>((ok, ohno) => {
    https.get(url, function (res) {
      res
        .on("data", function (chunk) {
          file.write(chunk);
        })
        .on("end", function () {
          file.end();
          ok();
        })
        .on("error", function (err) {
          ohno(err.message);
        });
    });
  });
}

let snapshotDir = "./snapshots/";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}

export default async function init() {
  console.info(`Starting Thorium Classic...`);

  try {
    await fs.access(snapshotDir);
  } catch {
    await fs.mkdir(snapshotDir);
  }

  let assetDir = path.resolve("../assets/");

  if (process.env.NODE_ENV === "production") {
    assetDir = paths.userData + "/assets";
  }
  // Ensure the asset folder exists
  try {
    await fs.access(assetDir);
  } catch {
    await fs.mkdir(assetDir);
  }

  const snapshotFile = `${snapshotDir}snapshot${
    process.env.NODE_ENV === "production" ? "" : "-dev"
  }.json`;

  try {
    await fs.access(snapshotFile);
  } catch {
    console.info("No snapshot.json found. Creating.");
    await fs.writeFile(snapshotFile, JSON.stringify(defaultSnapshot));
    // This was an initial load. We should download and install assets
    console.info("First-time load. Downloading assets...");
    const dest = path.resolve(`${os.tmpdir()}/assets.aset`);
    try {
      await download("https://s3.amazonaws.com/thoriumsim/assets.zip", dest);
    } catch (err) {
      console.error("There was an error", err);
    }
    importAssets(dest, async () => {
      try {
        await fs.unlink(dest);
        console.info("Asset Download Complete");
      } catch (error) {
        console.error(error);
      }
    });
  }
};
