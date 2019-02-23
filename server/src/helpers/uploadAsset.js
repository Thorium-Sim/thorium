import { pubsub } from "./subscriptionManager";
import { ncp } from "ncp";
import fs from "fs";
import assetDir from "./assetDir";

export function getFolders(dir, folderList = []) {
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

export default async function uploadAsset(root, args, context) {
  let { files, name, folderPath } = args;
  await Promise.all(
    files.map(file => {
      const extension = file.originalname.substr(
        file.originalname.lastIndexOf(".")
      );
      const fileName = name ? `${name}${extension}` : file.originalname;
      const filePath = `${assetDir}${folderPath}/${fileName}`;
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
