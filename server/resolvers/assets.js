import fs from 'fs';
import path from 'path';
import electron from 'electron';
import uuid from 'uuid';
import mkdirp from 'mkdirp';
import App from '../../app';

let assetDir = path.resolve('./assets/');
if (electron.app) {
  assetDir = path.resolve(electron.app.getPath('appData') + "/thorium/assets");
}

// Ensure the asset folder exists
if (!fs.existsSync(assetDir)){
  fs.mkdirSync(assetDir);
}

export const AssetsQueries = {
  asset(root, { assetKey, simulatorId = 'default' }) {
    const returnObj = App.assetObjects.find(obj => {
      return (obj.simulatorId === simulatorId && obj.fullPath === assetKey);
    });
    if (returnObj) {
      return { assetKey, url: returnObj.url };
    }
    return {};
  },
  assets(root, { assetKeys, simulatorId = 'default' }) {
    return assetKeys.map((key) => {
      const returnObj = App.assetObjects.find(obj => {
        return (obj.simulatorId === simulatorId && obj.fullPath === key);
      });
      if (returnObj) {
        return { assetKey: key, url: returnObj.url };
      }
      return {};
    });
  },
  assetFolders(root, { name, names }) {
    if (name) {
      return App.assetFolders.filter((f) => {
        return f.name === name;
      });
    }
    if (names) {
      return App.assetFolders.filter((f) => {
        return names.indexOf(f.name) > -1;
      });
    }
    return App.assetFolders;
  },
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }, context) {
    App.handleEvent({ name, folderPath, fullPath }, 'addAssetFolder', context);
    return '';
  },
  removeAssetFolder(root, { id }, context) {
    App.handleEvent({ id }, 'removeAssetFolder', context);
    return '';
  },
  addAssetContainer(root, { name, folderId, folderPath, fullPath }, context) {
    App.handleEvent({ name, folderId, folderPath, fullPath },
      'addAssetContainer', context);
    return '';
  },
  removeAssetContainer(root, { id }, context) {
    App.handleEvent({ id }, 'removeAssetContainer', context);
    return '';
  },
  removeAssetObject(root, { id }, context) {
    App.handleEvent({ id }, 'removeAssetObject', context);
    // Get the object
    //const obj = App.assetObjects.find((object) => object.id === id);
    //const extension = obj.url.substr(obj.url.lastIndexOf('.'));
    //fs.unlink(path.resolve(`${assetDir}/${(obj.fullPath.substr(1) + extension)}`), () => {});

    return '';
  },
  async uploadAsset(root, { files, simulatorId, containerId }, context) {
    const { folderPath, fullPath } = App.assetContainers
    .find(container => containerId === container.id);
    files.forEach((file) => {
      const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
      const key = `${fullPath.substr(1)}/${simulatorId + extension}`;
      const filepath = path.resolve(assetDir + '/' + key);
      const directorypath = filepath.substring(0, filepath.lastIndexOf("/"));
      mkdirp.sync(directorypath);

      //Move the file in
      const writeStream = fs.createWriteStream(filepath);
      const stream = fs.createReadStream(file.path).pipe(writeStream);
      stream.on('error', function(err){
        throw new Error(err);
      });
      writeStream.on('error', function(err){
        throw new Error(err);
      });
      stream.on('close', function(){
        // Delete the temp file
        fs.unlink(file.path, () => {});
      });
      // Add to the event store
      App.handleEvent({
        id: uuid.v4(),
        containerPath: folderPath,
        containerId,
        fullPath: `${fullPath}/${simulatorId + extension}`,
        url: `/assets${fullPath}/${simulatorId + extension}`,
        simulatorId,
      }, 'addAssetObject', context);
    });
    return '';
  },
};

export const AssetsSubscriptions = {
  assetFolderChange(rootValue) {
    return rootValue;
  },
};


export const AssetsTypes = {
  AssetFolder: {
    containers(rootValue) {
      return App.assetContainers.filter((container) => {
        return container.folderId === rootValue.id;
      });
    },
  },
  AssetContainer: {
    objects(rootValue) {
      return App.assetObjects.filter((object) => {
        return object.containerId === rootValue.id;
      });
    },
  },
};
