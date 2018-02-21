import App from "../../../app";

import * as Classes from "../../../classes";

export default function loadAsset(
  entry,
  folderRegex = /^mission\/assets(\/.*)\/.*\..{3,}/gi
) {
  // Move the file into the assets folder
  // Create the folder structure, checking for existing folders
  // Create the asset container, checking for existing containers
  // Create the asset object, checking for existing objects

  const regexRes = folderRegex.exec(entry.fileName);
  if (!regexRes) return;
  const fullPath = regexRes[1];
  let folder;
  fullPath.split("/").forEach((p, i, a) => {
    if (!p) return;
    const folderPath =
      a.reduce((prev, next, index) => {
        if (!next) return prev;
        if (index >= i) return prev;
        return prev + "/" + next;
      }, "") || "/";
    folder = App.assetFolders.find(f => f.fullPath === folderPath);
    // Create the asset folder
    if (!folder) {
      const params = {
        name: fullPath.split("/")[fullPath.split("/").length - 2],
        fullPath: folderPath,
        folderPath:
          fullPath
            .split("/")
            .splice(0, fullPath.split("/").length - 2)
            .join("/") || "/"
      };
      folder = new Classes.AssetFolder(params);
      App.assetFolders.push(folder);
    }
  });

  // Create the asset container
  let container = App.assetContainers.find(c => c.fullPath === fullPath);
  if (!container) {
    const params = {
      name: fullPath.split("/")[fullPath.split("/").length - 1],
      folderId: folder.id,
      folderPath: folder.fullPath,
      fullPath: fullPath
    };
    container = new Classes.AssetContainer(params);
    App.assetContainers.push(container);
  }

  // Create the asset object
  const object = App.assetObjects.find(
    o => o.url === entry.fileName.replace("mission", "")
  );
  if (entry.fileName[0] !== "/") entry.fileName = `/${entry.fileName}`;
  if (!object) {
    const params = {
      containerPath: container.folderPath,
      containerId: container.id,
      fullPath: entry.fileName.replace("/assets", ""),
      url: entry.fileName.replace("mission/", "").replace("simulator/", ""),
      simulatorId: "default"
    };
    App.assetObjects.push(new Classes.AssetObject(params));
  }
}
