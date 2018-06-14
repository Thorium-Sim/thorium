import paths from "../helpers/paths";
import fs from "fs";
export default () => {
  return new Promise(resolve => {
    console.log(`Starting Thorium...










`);

    let snapshotDir = "./snapshots/";
    if (process.env.NODE_ENV === "production") {
      snapshotDir = paths.userData + "/";
    }
    fs.exists(
      snapshotDir,
      exists => (exists ? resolve() : fs.mkdir(snapshotDir, () => resolve()))
    );
  });
};
