import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addAssetFolder", params => {
  App.assetFolders.push(new Classes.AssetFolder(params));
  pubsub.publish("assetFolderChange", App.assetFolders);
});
App.on("removeAssetFolder", params => {
  App.assetFolders = App.assetFolders.filter(folder => {
    return folder.id !== params.id;
  });

  pubsub.publish("assetFolderChange", App.assetFolders);
});
App.on("addAssetContainer", params => {
  App.assetContainers.push(new Classes.AssetContainer(params));
  pubsub.publish("assetFolderChange", App.assetFolders);
});
App.on("removeAssetContainer", params => {
  App.assetContainers = App.assetContainers.filter(container => {
    return container.id !== params.id;
  });
  pubsub.publish("assetFolderChange", App.assetFolders);
});
App.on("addAssetObject", params => {
  App.assetObjects.push(new Classes.AssetObject(params));
  pubsub.publish("assetFolderChange", App.assetFolders);
});
App.on("removeAssetObject", params => {
  App.assetObjects = App.assetObjects.filter(object => {
    return object.id !== params.id;
  });
  pubsub.publish("assetFolderChange", App.assetFolders);
});
