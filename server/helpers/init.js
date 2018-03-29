import paths from "./paths";
import fs from "fs";
console.log(`Starting Thorium...










`);

let snapshotDir = "./snapshots/";
console.log("snapshotdir is" + snapshotDir);
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}
if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir);
