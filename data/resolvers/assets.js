import s3 from 's3';
import fs from 'fs';
import client from '../uploader';
import uuid from 'uuid';
import { pubsub } from '../subscriptionManager.js';
//import { es } from '../../store.js';
import { AssetObject, AssetFolder, AssetContainer } from '../classes/assets';
import { assets } from '../../app.js';
import { bucket } from '../../secrets.js';
function processPayload(payload) {
  switch (payload.type) {
    case 'addAssetFolder':
    assets.folders.push(new AssetFolder(payload));
    break;
    case 'removeAssetFolder':
    assets.folders = assets.folders.filter((folder) => {
      return (folder.id !== payload.id);
    });
    break;
    case 'addAssetContainer':
    assets.containers.push(new AssetContainer(payload));
    break;
    case 'removeAssetContainer':
    assets.containers = assets.containers.filter((container) => {
      return (container.id !== payload.id);
    });
    break;
    case 'addAssetObject':
    assets.objects.push(new AssetObject(payload));
    break;
    case 'removeAssetObject':
    assets.objects = assets.objects.filter((object) => {
      return (object.id !== payload.id);
    });
    break;
    default:
    break;
  }
}

/*
es.init(() => {
  es.getEventStream('assets', (err, stream) => {
    const history = stream.events;
    history.forEach(({ payload }) => {
      processPayload(payload);
    });
  });
});

es.useEventPublisher((evt, callback) => {
  processPayload(evt);
  pubsub.publish('assetFolderChange', assets.folders);
  callback();
});
*/

export const AssetsQueries = {
  asset(root, { assetKey, simulatorId = 'default' }) {
    const returnObj = assets.objects.find(obj => {
      return (obj.simulatorId === simulatorId && obj.fullPath === assetKey);
    });
    if (returnObj) {
      return { assetKey, url: returnObj.url };
    }
    return {};
  },
  assets(root, { assetKeys, simulatorId = 'default' }) {
    return assetKeys.map((key) => {
      const returnObj = assets.objects.find(obj => {
        return (obj.simulatorId === simulatorId && obj.fullPath === key);
      });
      if (returnObj) {
        return { assetKey: key, url: returnObj.url };
      }
      return {};
    });
  },
  assetFolders() {
    return assets.folders;
  },
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }) {
    /*es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'addAssetFolder',
        id: uuid.v4(),
        folderPath,
        fullPath,
        name,
      });
      stream.commit();
    });*/
    return '';
  },
  removeAssetFolder(root, { id }) {
   /* es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetFolder',
        id,
      });
      stream.commit();
    });*/
    return '';
  },
  addAssetContainer(root, { name, folderId, folderPath, fullPath }) {
   /* es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'addAssetContainer',
        id: uuid.v4(),
        folderPath,
        folderId,
        fullPath,
        name,
      });
      stream.commit();
    });*/
    return '';
  },
  removeAssetContainer(root, { id }) {
   /* es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetContainer',
        id,
      });
      stream.commit();
    });*/
    return '';
  },
  removeAssetObject(root, { id }) {
   /* es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetObject',
        id,
      });
      stream.commit();
    });*/
    // Remove from S3 too.
    // Get the object
    const obj = assets.objects.find((object) => object.id === id);
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
    const { folderPath, fullPath } = assets.containers
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
        },
      };
      const uploader = client.uploadFile(params);
      uploader.on('end', () => {
        // Delete the temp file
        fs.unlink(file.path, () => {});
        // Add to the event store
        /*es.getEventStream('assets', (err, stream) => {
          stream.addEvent({
            type: 'addAssetObject',
            id: uuid.v4(),
            containerPath: folderPath,
            containerId,
            fullPath,
            url: s3.getPublicUrl('thorium-assets', key),
            simulatorId,
          });
          stream.commit();
        });*/
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
      return assets.containers.filter((container) => {
        return container.folderId === rootValue.id;
      });
    },
  },
  AssetContainer: {
    objects(rootValue) {
      return assets.objects.filter((object) => {
        return object.containerId === rootValue.id;
      });
    },
  },
};
