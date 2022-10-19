import * as viewscreens from "./viewscreens";
import addAsset from "../../../addAsset";
import {TimelineItem} from "@server/classes/mission";
import {KeyAction} from "@server/classes/keyboard";

export default function buildExport(
  zip: any,
  i: TimelineItem | KeyAction,
  type?: string,
) {
  let assets = [];
  if (i.event === "updateViewscreenComponent") {
    const args = typeof i.args === "string" ? JSON.parse(i.args) : i.args;
    if (args && args.component && viewscreens[args.component]) {
      assets = assets.concat(
        viewscreens[args.component](JSON.parse(args.data || "{}")),
      );
    }
  }
  assets.forEach(key => {
    addAsset(key, zip, type);
  });
}
