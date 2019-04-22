import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("insertIsochip", ({ id, simulatorId, slot, chip }) => {
  const isochip = App.isochips.find(
    i => i.id === id || (i.simulatorId === simulatorId && i.slot === slot)
  );
  isochip.insertChip(chip);
  pubsub.publish("isochipsUpdate", App.isochips);
});
App.on("updateIsochip", ({ id, simulatorId, slot, isochip }) => {
  let updateChip = App.isochips.find(
    i => i.id === id || (i.simulatorId === simulatorId && i.slot === slot)
  );
  if (!updateChip) {
    // Make sure it has prerequisite data
    if (isochip && isochip.system) {
      const newChip = new Classes.Isochip(isochip);
      const system = App.systems.find(s => s.id === isochip.system);
      newChip.simulatorId = system.simulatorId;
      App.isochips.push(newChip);
      updateChip = App.isochips.find(i => i.id === newChip.id);
    }
  }
  updateChip.updateIsochip(isochip);
  pubsub.publish("isochipsUpdate", App.isochips);
});
App.on("batchIsochipUpdate", ({ simulatorId, chips, cb }) => {
  const isochips = App.isochips.filter(i => i.simulatorId === simulatorId);
  chips.forEach(chip => {
    const updateChip = isochips.find(i => i.slot === chip.slot);
    if (updateChip) updateChip.updateIsochip(chip);
  });
  pubsub.publish("isochipsUpdate", App.isochips);
  cb(
    simulatorId
      ? App.isochips.filter(i => i.simulatorId === simulatorId)
      : App.isochips
  );
});
