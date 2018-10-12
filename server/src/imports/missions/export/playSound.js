import addAsset from "../../addAsset";

export default function buildExport(zip, i, type) {
  if (i.event === "playSound") {
    const args = JSON.parse(i.args);
    console.log({ i, args });
    if (!args.sound) return;
    const asset = args.sound.asset;
    if (asset) {
      addAsset(asset, zip, type);
    }
  }
}
