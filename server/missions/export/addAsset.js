import path from "path";
import paths from "../../helpers/paths";
import App from "../../app";

let assetDir = path.resolve("./public/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData;
}

const addAsset = (key, zip) => {
  if (!key) return;
  const container = App.assetContainers.find(a => a.fullPath === key);
  const objects = App.assetObjects.filter(a => a.containerId === container.id);
  objects.forEach(o => {
    zip.addFile(`${assetDir}/${o.url}`, `mission${o.url}`);
  });
};

export default addAsset;
