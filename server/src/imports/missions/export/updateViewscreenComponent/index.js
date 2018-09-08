import * as viewscreens from "./viewscreens";
import addAsset from "../../../addAsset";

export default function buildExport(zip, i, type) {
  let assets = [];
  if (i.event === "updateViewscreenComponent") {
    const args = JSON.parse(i.args);
    if (args && args.component && viewscreens[args.component]) {
      assets = assets.concat(
        viewscreens[args.component](JSON.parse(args.data || "{}"))
      );
    }
  }
  assets.forEach(key => {
    addAsset(key, zip, type);
  });
}
