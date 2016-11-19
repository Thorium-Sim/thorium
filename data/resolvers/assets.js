import s3 from 's3';
import client from '../uploader';
import uuid from 'uuid';
import { pubsub } from '../subscriptionManager.js';
import { es } from '../../store.js';
import { AssetObject, AssetFolder, AssetContainer } from '../classes/assets';
import { assets } from '../../app.js';

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

export const AssetsQueries = {
  asset(root, { assetKey }) {
  },
  assetFolders() {
    return assets.folders;
  },
};

export const AssetsMutations = {
  addAssetFolder(root, { name, folderPath, fullPath }) {
    es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'addAssetFolder',
        id: uuid.v4(),
        folderPath,
        fullPath,
        name,
      });
      stream.commit();
    });
    return '';
  },
  removeAssetFolder(root, { id }) {
    es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetFolder',
        id,
      });
      stream.commit();
    });
    return '';
  },
  addAssetContainer(root, { name, folderId, folderPath, fullPath }) {
    es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'addAssetContainer',
        id: uuid.v4(),
        folderPath,
        folderId,
        fullPath,
        name,
      });
      stream.commit();
    });
    return '';
  },
  removeAssetContainer(root, { id }) {
    es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetContainer',
        id,
      });
      stream.commit();
    });
    return '';
  },
  removeAssetObject(root, { id }) {
    es.getEventStream('assets', (err, stream) => {
      stream.addEvent({
        type: 'removeAssetObject',
        id,
      });
      stream.commit();
    });
    // TODO: Remove from S3 too.
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
          Bucket: 'thorium-assets',
          Key: key,
          ACL: 'public-read',
        },
      };
      const uploader = client.uploadFile(params);
      uploader.on('end', () => {
        es.getEventStream('assets', (err, stream) => {
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
        });
      });
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
