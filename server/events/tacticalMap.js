import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on("newTacticalMap", ({ id, name, flightId }) => {
  App.tacticalMaps.push(
    new Classes.TacticalMap({ id, name, flightId, template: !flightId })
  );
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("updateTacticalMap", ({ id }) => {});
App.on("freezeTacticalMap", ({ id, freeze }) => {
  const map = App.tacticalMaps.find(t => t.id === id);
  map.freeze(freeze);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("duplicateTacticalMap", ({ id, name }) => {
  const map = App.tacticalMaps.find(t => t.id === id);
  App.tacticalMaps.push(
    new Classes.TacticalMap(
      Object.assign({}, map, { id: uuid.v4(), dup: true, name })
    )
  );
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("loadTacticalMap", ({ id, newid, flightId }) => {
  const map = App.tacticalMaps.find(t => t.id === id);
  App.tacticalMaps.push(
    new Classes.TacticalMap(
      Object.assign({}, map, {
        id: newid,
        dup: true,
        flightId,
        template: false
      })
    )
  );
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("removeTacticalMap", ({ id }) => {
  App.tacticalMaps = App.tacticalMaps.filter(i => i.id !== id);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});

App.on("addTacticalMapLayer", ({ mapId, name }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.addLayer({ name });
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("updateTacticalMapLayer", ({ mapId, layer }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.updateLayer(layer);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("reorderTacticalMapLayer", ({ mapId, layer, order }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.reorderLayer(layer, order);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("removeTacticalMapLayer", ({ mapId, layerId }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.removeLayer(layerId);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});

App.on("addTacticalMapItem", ({ mapId, layerId, item }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.addItemToLayer(layerId, item);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("updateTacticalMapItem", ({ mapId, layerId, item }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.updateItemInLayer(layerId, item);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on("removeTacticalMapItem", ({ mapId, layerId, itemId }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.removeItemFromLayer(layerId, itemId);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});
App.on(
  "showViewscreenTactical",
  ({ mapId, simulatorId, secondary = false }) => {
    const flight = App.flights.find(
      f => f.simulators.indexOf(simulatorId) > -1
    );
    const viewscreen = App.viewscreens.find(
      v => v.simulatorId === simulatorId && v.secondary === secondary
    );
    if (!viewscreen) return;
    const newid = uuid.v4();
    const map = App.tacticalMaps.find(t => t.id === mapId);
    App.tacticalMaps.push(
      new Classes.TacticalMap(
        Object.assign({}, map, {
          id: newid,
          dup: true,
          flightId: flight.id,
          template: false
        })
      )
    );

    // First de-auto the viewscreen, since we want to force this component;
    viewscreen.updateAuto(false);
    viewscreen.updateComponent(
      "TacticalMap",
      JSON.stringify({ tacticalMapId: newid })
    );
    pubsub.publish("viewscreensUpdate", App.viewscreens);
    pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  }
);
