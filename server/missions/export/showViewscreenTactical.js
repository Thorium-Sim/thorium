import App from "../../app";
import addAsset from "./addAsset";

export default function buildExport(zip, mission) {
  const tacticals = [];
  mission.timeline.forEach(t =>
    t.timelineItems
      .filter(i => i.event === "showViewscreenTactical")
      .forEach(i => {
        const args = JSON.parse(i.args);
        const mapId = args.mapId;
        const assets = [];
        const tactical = App.tacticalMaps.find(m => m.id === mapId);
        tactical.layers.forEach(l => {
          if (l.type === "image") assets.push(l.image);
          if (l.type === "objects") {
            l.items.forEach(item => assets.push(item.icon));
          }
        });
        assets.forEach(key => {
          addAsset(key, zip);
        });
        tacticals.push(tactical);
      })
  );

  // Add the tacticals to the zip file
  const tacticalBuff = new Buffer(JSON.stringify(tacticals));
  zip.addBuffer(tacticalBuff, "mission/tacticals.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });
}
