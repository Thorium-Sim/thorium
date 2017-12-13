import addAsset from "./addAsset";

export default function buildExport(zip, mission) {
  mission.timeline.forEach(t =>
    t.timelineItems.filter(i => i.event === "setArmyContacts").forEach(i => {
      const args = JSON.parse(i.args);
      args.armyContacts.forEach(c => {
        addAsset(c.icon, zip);
        addAsset(c.picture, zip);
      });
    })
  );
}
