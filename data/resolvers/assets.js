import s3 from 's3';
import fs from 'fs';
import client from '../../helpers/uploader';
import uuid from 'uuid';
import App from '../../app';
import { bucket } from '../../secrets.js';

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
  assetFolders() {
    return App.assetFolders;
  },
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }) {
    App.handleEvent({ name, folderPath, fullPath }, 'addAssetFolder', 'addedAssetFolder');
    return '';
  },
  removeAssetFolder(root, { id }) {
    App.handleEvent({ id }, 'removeAssetFolder', 'removedAssetFolder');
    return '';
  },
  addAssetContainer(root, { name, folderId, folderPath, fullPath }) {
    App.handleEvent({ name, folderId, folderPath, fullPath },
      'addAssetContainer', 'addedAssetContainer');
    return '';
  },
  removeAssetContainer(root, { id }) {
    App.handleEvent({ id }, 'removeAssetContainer', 'removedAssetContainer');
    return '';
  },
  removeAssetObject(root, { id }) {
    App.handleEvent({ id }, 'removeAssetObject', 'removedAssetObject');
    // Remove from S3 too.
    // Get the object
    const obj = App.assetObjects.find((object) => object.id === id);
    const extension = obj.url.substr(obj.url.lastIndexOf('.'));

    client.deleteObjects({
      Bucket: bucket,
      Delete: {
        Objects: [{
          Key: (obj.fullPath.substr(1) + extension),
        }],
      },
    });
    return '';
  },
  async uploadAsset(root, { files, simulatorId, containerId }) {
    const { folderPath, fullPath } = App.assetContainers
    .find(container => containerId === container.id);
    files.forEach((file) => {
      const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
      const key = `${fullPath.substr(1)}/${simulatorId + extension}`;
      const params = {
        localFile: file.path,
        s3Params: {
          Bucket: bucket,
          Key: key,
          ACL: 'public-read',
          ContentType: file.mimetype,
        },
      };
      const uploader = client.uploadFile(params);
      uploader.on('end', () => {
        // Delete the temp file
        fs.unlink(file.path, () => {});
        // Add to the event store
        App.handleEvent({
          id: uuid.v4(),
          containerPath: folderPath,
          containerId,
          fullPath,
          url: s3.getPublicUrl('thorium-assets', key),
          simulatorId,
        }, 'addAssetObject', 'addedAssetObject');
      });
    });
    return '';
  },
};

export const AssetsSubscriptions = {
  assetFolderChange(rootValue) {
    console.log("SUB");
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
