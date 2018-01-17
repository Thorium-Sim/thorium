import * as viewscreens from "./viewscreens";
import addAsset from "../../../addAsset";

export default function buildExport(zip, mission) {
  let assets = [];
  mission.timeline.forEach(t =>
    t.timelineItems
      .filter(i => i.event === "updateViewscreenComponent")
      .forEach(i => {
        const args = JSON.parse(i.args);
        if (viewscreens[args.component]) {
          assets = assets.concat(
            viewscreens[args.component](JSON.parse(args.data))
          );
        }
      })
  );
  assets.forEach(key => {
    addAsset(key, zip);
  });
}
