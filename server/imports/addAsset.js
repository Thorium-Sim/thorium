import path from "path";
import paths from "../helpers/paths";
import App from "../app";

let assetDir = path.resolve("./public/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

const addAsset = (key, zip, prefix = "mission") => {
  if (!key) return;
  if (key.url) {
    zip.addFile(`${assetDir}/${key.url}`, `${prefix}${key.url}`);
  } else {
    const container = App.assetContainers.find(a => a.fullPath === key);
    if (container) {
      const objects = App.assetObjects.filter(
        a => a.containerId === container.id
      );
      objects.forEach(o => {
        zip.addFile(`${assetDir}/${o.url}`, `${prefix}${o.url}`);
      });
    }
  }
};

export default addAsset;
