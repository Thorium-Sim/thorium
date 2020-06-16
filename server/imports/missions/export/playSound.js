import addAsset, {assetDir} from "../../addAsset";
import fs from "fs";

export default function buildExport(zip, i, type) {
  if (i.event === "playSound") {
    const args = typeof i.args === "string" ? JSON.parse(i.args) : i.args;
    if (!args.sound) return;
    const asset = args.sound.asset;

    if (asset) {
      if (args.type === "random") {
        // It's a folder full of stuff. Grab it
        const objectLoc = `${assetDir}/assets/${asset}`.replace("//", "/");
        if (fs.existsSync(objectLoc) && fs.lstatSync(objectLoc).isDirectory()) {
          const files = fs.readdirSync(objectLoc);
          files.forEach(file => addAsset(`${asset}/${file}`, zip, type));
          return;
        }
      }
      addAsset(asset, zip, type);
    }
  }
}
