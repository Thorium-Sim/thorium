import fs from "fs";
import path from "path";
import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import paths from "../helpers/paths";
import { ncp } from "ncp";

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

export const AssetsQueries = {
  asset(root, { assetKey }) {
    return { assetKey, url: `/assets${assetKey}` };
  },
  assets(root, { assetKeys }) {
    return assetKeys.map(a => ({ assetKey: a, url: `/assets${a}` }));
  },
  assetFolders(root, { name, names }) {
    const folders = getFolders(assetDir);
    if (name) return folders.filter(f => f.name === name);
    if (names) return folders.filter(f => names.indexOf(f.name) > -1);
    return folders;
  }
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }, context) {
    App.handleEvent({ name, folderPath, fullPath }, "addAssetFolder", context);
    return "";
  },
  removeAssetFolder(root, params, context) {
    App.handleEvent(params, "removeAssetFolder", context);
    return "";
  },
  removeAssetObject(root, params, context) {
    App.handleEvent(params, "removeAssetObject", context);
    // Get the object
    //const obj = App.assetObjects.find((object) => object.id === id);
    //const extension = obj.url.substr(obj.url.lastIndexOf('.'));
    //fs.unlink(path.resolve(`${assetDir}/${(obj.fullPath.substr(1) + extension)}`), () => {});

    return "";
  }
};

export const AssetsSubscriptions = {
  assetFolderChange: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: () => pubsub.asyncIterator("assetFolderChange")
  }
};

export const AssetsTypes = {
  AssetFolder: {
    objects({ name, fullPath }) {
      return fs
        .readdirSync(assetDir + fullPath)
        .filter(
          f =>
            fs.lstatSync(assetDir + fullPath + "/" + f).isFile() && f[0] !== "."
        )
        .map(f => ({
          url: `/assets${fullPath}/${f}`,
          name: f,
          fullPath: `${fullPath}/${f}`,
          folderPath: fullPath,
          id: `${fullPath}/${f}`
        }));
    }
  }
};

export async function uploadAsset(root, args, context) {
  let { files, name, folderPath } = args;
  await Promise.all(
    files.map(file => {
      const extension = file.originalname.substr(
        file.originalname.lastIndexOf(".")
      );
      const filePath = `${assetDir}${folderPath}/${name}${extension}`;

      return new Promise(resolve =>
        ncp(file.path, filePath, err => {
          if (err) {
            console.error("Error!", err);
          }
          resolve();
        })
      );
    })
  );
  pubsub.publish("assetFolderChange", getFolders(assetDir));
}
