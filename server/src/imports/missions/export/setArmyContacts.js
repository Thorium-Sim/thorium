import addAsset from "../../addAsset";

export default function buildExport(zip, i, type) {
  if (i.event === "setArmyContacts") {
    const args = JSON.parse(i.args);
    args.armyContacts.forEach(c => {
      addAsset(c.icon, zip, type);
      addAsset(c.picture, zip, type);
    });
  }
}
