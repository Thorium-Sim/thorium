import path from "path";
import fs from "fs";
import paths from "../helpers/paths";

let assetDir = path.resolve("./");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

const addAsset = (key, zip, prefix = "mission") => {
  if (!key) return;
  if (key.url) {
    const fileLoc = `${assetDir}/${key.url}`.replace("//", "/");
    if (fs.existsSync(fileLoc)) {
      zip.addFile(fileLoc, `${prefix}${key.url}`);
    }
  } else {
    const objectLoc = `${assetDir}/assets/${key}`.replace("//", "/");
    if (!fs.existsSync(objectLoc)) return;
    zip.addFile(objectLoc, `${prefix}/assets${key}`);
  }
};

export default addAsset;
