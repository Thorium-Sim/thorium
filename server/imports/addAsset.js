import path from "path";
import fs from "fs";
import paths from "../helpers/paths";
import App from "../app";

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
    const container = App.assetContainers.find(a => a.fullPath === key);
    if (container) {
      const objects = App.assetObjects.filter(
        a => a.containerId === container.id
      );
      objects.forEach(o => {
        const objectLoc = `${assetDir}/${o.url}`.replace("//", "/");
        if (!fs.existsSync(objectLoc)) return;
        zip.addFile(objectLoc, `${prefix}${o.url}`);
      });
    }
  }
};

export default addAsset;
