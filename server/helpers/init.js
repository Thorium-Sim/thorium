import paths from "./paths";
import fs from "fs";
console.log(`Starting Thorium...










`);

let snapshotDir = "./snapshots/";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}
if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir);
