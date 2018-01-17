import fs from "fs";
import path from "path";
import uuid from "uuid";
import mkdirp from "mkdirp";
import App from "../app";
import * as Classes from "../classes";
import { pubsub } from "../helpers/subscriptionManager.js";
import paths from "../helpers/paths";

let assetDir = path.resolve("./assets/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData + "/assets";
}

// Ensure the asset folder exists
if (!fs.existsSync(assetDir)) {
  fs.mkdirSync(assetDir);
}

export const AssetsQueries = {
  asset(root, { assetKey, simulatorId = "default" }) {
    const container = App.assetContainers.find(obj => {
      return obj.fullPath === assetKey;
    });
    if (!container) return {};
    return (
      App.assetObjects.find(
        obj =>
          obj.containerId === container.id && obj.simulatorId === simulatorId
      ) ||
      App.assetObjects.find(
        obj => obj.containerId === container.id && obj.simulatorId === "default"
      )
    );
  },
  assets(root, { assetKeys, simulatorId = "default" }) {
    return assetKeys.map(key => {
      const returnObj = App.assetObjects.find(obj => {
        return obj.simulatorId === simulatorId && obj.fullPath === key;
      });
      if (returnObj) {
        return { assetKey: key, url: returnObj.url };
      }
      return {};
    });
  },
  assetFolders(root, { name, names }) {
    if (name) {
      return App.assetFolders.filter(f => {
        return f.name === name;
      });
    }
    if (names) {
      return App.assetFolders.filter(f => {
        return names.indexOf(f.name) > -1;
      });
    }
    return App.assetFolders;
  }
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }, context) {
    App.handleEvent({ name, folderPath, fullPath }, "addAssetFolder", context);
    return "";
  },
  removeAssetFolder(root, { id }, context) {
    App.handleEvent({ id }, "removeAssetFolder", context);
    return "";
  },
  addAssetContainer(root, { name, folderId, folderPath, fullPath }, context) {
    App.handleEvent(
      { name, folderId, folderPath, fullPath },
      "addAssetContainer",
      context
    );
    return "";
  },
  removeAssetContainer(root, { id }, context) {
    App.handleEvent({ id }, "removeAssetContainer", context);
    return "";
  },
  removeAssetObject(root, { id }, context) {
    App.handleEvent({ id }, "removeAssetObject", context);
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
    containers(rootValue) {
      return App.assetContainers.filter(container => {
        return container.folderId === rootValue.id;
      });
    }
  },
  AssetContainer: {
    objects(rootValue) {
      return App.assetObjects.filter(object => {
        return object.containerId === rootValue.id;
      });
    }
  }
};

export async function uploadAsset(root, args, context) {
  let {
    files,
    name,
    simulatorId,
    containerId,
    containerName,
    folderPath: givenFolderPath
  } = args;
  let container = App.assetContainers.find(
    container =>
      containerId === container.id ||
      (container.folderPath === folderPath && container.name === containerName)
  );
  let folderPath = givenFolderPath;
  let fullPath;
  if (container) {
    folderPath = container.folderPath;
    fullPath = container.fullPath;
  }
  files.forEach(file => {
    // First, check to see if there is a container
    let container = App.assetContainers.find(
      container =>
        containerId === container.id ||
        (container.folderPath === folderPath &&
          container.name === containerName)
    );
    if (container) {
      fullPath = fullPath || container.fullPath;

      containerId = containerId || container.id;
    }
    let clearContainer = false;
    if (!container) {
      //Lets make a container for this asset
      const fileName = name || file.originalname.replace(/(\..{3})/gi, "");
      const folder = App.assetFolders.find(f => f.fullPath === folderPath);
      const folderId = folder && folder.id;

      const containerFullPath = folderPath + "/" + fileName;
      const params = {
        name: fileName,
        folderId,
        folderPath,
        fullPath: containerFullPath
      };
      App.assetContainers.push(new Classes.AssetContainer(params));
      container = App.assetContainers.find(
        container => container.fullPath === containerFullPath
      );
      containerId = container.id;
      folderPath = container.folderPath;
      fullPath = container.fullPath;

      // Clear the container variable when we are done so it can be reused for future files
      clearContainer = true;
    }
    const extension = file.originalname.substr(
      file.originalname.lastIndexOf(".")
    );
    const key = `${fullPath.substr(1)}/${simulatorId + extension}`;
    const filepath = path.resolve(assetDir + "/" + key);
    const lastIndex =
      filepath.lastIndexOf("/") > -1
        ? filepath.lastIndexOf("/")
        : filepath.lastIndexOf("\\");
    const directorypath = filepath.substring(0, lastIndex);
    mkdirp.sync(directorypath);
    fs.writeFileSync(filepath, fs.readFileSync(file.path));

    App.handleEvent(
      {
        id: uuid.v4(),
        containerPath: folderPath,
        containerId,
        fullPath: `${fullPath}/${simulatorId + extension}`,
        url: `/assets${fullPath}/${simulatorId + extension}`,
        simulatorId
      },
      "addAssetObject",
      context
    );
    if (clearContainer) {
      container = {};
      containerId = null;
    }
  });
  pubsub.publish("assetFolderChange", App.assetFolders);
  return "";
}
