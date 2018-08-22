import path from "path";
import fs, { existsSync } from "fs";
import paths from "../helpers/paths";

let assetDir = path.resolve("./");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

const addAsset = (loc, zip, prefix = "mission") => {
  if (!loc) return;
  let key = loc;
  if (!key.split(".")[1]) {
    // No extension - find the most likely candidate
    const path = key
      .split("/")
      .slice(0, -1)
      .join("/");
    const filename = key.split("/")[key.split("/").length - 1];
    const folderPath = assetDir + "/assets" + path;
    if (!fs.existsSync(folderPath)) return;
    const files = fs.readdirSync(folderPath);
    const file = files
      .filter(f => !fs.statSync(folderPath + "/" + f).isDirectory())
      .find(f => f.indexOf(filename) > -1);
    if (!file) {
      console.log("Couldn't find file:", key);
      return;
    }
    key = path + "/" + file;
  }
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
