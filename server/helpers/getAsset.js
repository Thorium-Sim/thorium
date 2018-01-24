import App from "../app.js";
import { port } from "../server";

export default function getAsset(assetKey, simulatorId) {
  const host = "localhost";
  const protocol = "http";
  let returnObj = App.assetObjects.find(obj => {
    const path = obj.fullPath.split("/");
    path.pop();
    return obj.simulatorId === simulatorId && path.join("/") === assetKey;
  });
  if (returnObj) {
    return `${protocol}://${host}:${port}${returnObj.fullPath}`;
  }
  returnObj = App.assetObjects.find(obj => {
    const path = obj.fullPath.split("/");
    path.pop();
    return obj.simulatorId === "default" && path.join("/") === assetKey;
  });
  if (returnObj) {
    return `${protocol}://${host}:${port}/assets${returnObj.fullPath}`;
  }
  return "";
}
