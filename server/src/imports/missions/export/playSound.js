import addAsset from "../../addAsset";

export default function buildExport(zip, i, type) {
  if (i.event === "playSound") {
    const args = typeof i.args === "string" ? JSON.parse(i.args) : i.args;
    if (!args.sound) return;
    const asset = args.sound.asset;
    if (asset) {
      addAsset(asset, zip, type);
    }
  }
}
