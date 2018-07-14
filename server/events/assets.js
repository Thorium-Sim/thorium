import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import fs from "fs";
import path from "path";
import paths from "../helpers/paths";

let assetDir = path.resolve("./assets/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData + "/assets";
}

function getFolders(dir, folderList = []) {
  const folders = fs
    .readdirSync(dir)
    .filter(f => fs.lstatSync(dir + "/" + f).isDirectory());
  folders.forEach(f => {
    const fullPath = dir.replace(assetDir, "") + "/" + f;
    const folderPath = fullPath.split("/");
    folderList.push({
      id: fullPath,
      name: f,
      fullPath,
      folderPath: folderPath.slice(0, folderPath.length - 1).join("/") || "/"
    });
    getFolders(dir + "/" + f, folderList);
  });
  return folderList;
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

App.on("addAssetFolder", params => {
  fs.mkdirSync(`${assetDir}${params.fullPath}`);
  pubsub.publish("assetFolderChange", getFolders(assetDir));
});
App.on("removeAssetFolder", params => {
  deleteFolderRecursive(`${assetDir}${params.fullPath}`);
  pubsub.publish("assetFolderChange", getFolders(assetDir));
});
App.on("removeAssetObject", params => {
  fs.unlinkSync(`${assetDir}${params.fullPath}`);
  pubsub.publish("assetFolderChange", getFolders(assetDir));
});
