import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on("newTacticalMap", ({ id = uuid.v4(), name, flightId, cb }) => {
  App.tacticalMaps.push(
    new Classes.TacticalMap({ id, name, flightId, template: !flightId })
  );
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  cb(id);
});
App.on("updateTacticalMap", ({ id }) => {});
App.on("freezeTacticalMap", ({ id, freeze }) => {
  const map = App.tacticalMaps.find(t => t.id === id);
  map.freeze(freeze);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish("tacticalMapUpdate", App.tacticalMaps.find(t => t.id === id));
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
App.on("loadTacticalMap", ({ id, newId = uuid.v4(), flightId, cb }) => {
  const map = App.tacticalMaps.find(t => t.id === id);
  App.tacticalMaps.push(
    new Classes.TacticalMap(
      Object.assign({}, map, {
        id: newId,
        dup: true,
        flightId,
        template: false
      })
    )
  );
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === newId)
  );
  cb(newId);
});
App.on("removeTacticalMap", ({ id }) => {
  App.tacticalMaps = App.tacticalMaps.filter(i => i.id !== id);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
});

App.on("addTacticalMapLayer", ({ mapId, name }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.addLayer({ name });
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});
App.on("updateTacticalMapLayer", ({ mapId, layer }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.updateLayer(layer);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});
App.on("reorderTacticalMapLayer", ({ mapId, layer, order }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.reorderLayer(layer, order);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});
App.on("removeTacticalMapLayer", ({ mapId, layerId }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.removeLayer(layerId);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});

App.on("addTacticalMapItem", ({ mapId, layerId, item, cb }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.addItemToLayer(layerId, item);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
  cb();
});
App.on("updateTacticalMapItem", ({ mapId, layerId, item, cb }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.updateItemInLayer(layerId, item);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
  cb();
});
App.on("removeTacticalMapItem", ({ mapId, layerId, itemId, cb }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.removeItemFromLayer(layerId, itemId);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
  cb();
});

App.on("addTacticalMapPath", ({ mapId, layerId, path }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.addPathToLayer(layerId, path);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});
App.on("updateTacticalMapPath", ({ mapId, layerId, path }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.updatePathInLayer(layerId, path);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});
App.on("removeTacticalMapPath", ({ mapId, layerId, pathId }) => {
  const map = App.tacticalMaps.find(t => t.id === mapId);
  map.removePathFromLayer(layerId, pathId);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  pubsub.publish(
    "tacticalMapUpdate",
    App.tacticalMaps.find(t => t.id === mapId)
  );
});

App.on(
  "showViewscreenTactical",
  ({ viewscreenId, mapId, simulatorId, secondary = false }) => {
    const flight = App.flights.find(
      f => f.simulators.indexOf(simulatorId) > -1
    );
    let flightMap = App.tacticalMaps.find(t => t.templateId === mapId);
    let id = mapId;
    if (!flightMap) {
      const newId = uuid.v4();
      id = newId;
      const map = App.tacticalMaps.find(t => t.id === mapId);
      flightMap = new Classes.TacticalMap(
        Object.assign({}, map, {
          id: newId,
          dup: true,
          flightId: flight.id,
          template: false,
          templateId: mapId
        })
      );
      App.tacticalMaps.push(flightMap);
    }
    const viewscreens = App.viewscreens.filter(
      v =>
        (v.id === viewscreenId || v.simulatorId === simulatorId) &&
        v.secondary === secondary
    );

    if (viewscreens.length === 0) return;
    // First de-auto the viewscreen, since we want to force this component;
    viewscreens.forEach(v => {
      v.updateAuto(false);
      v.updateComponent(
        "TacticalMap",
        JSON.stringify({ tacticalMapId: flightMap.id })
      );
    });

    pubsub.publish("viewscreensUpdate", App.viewscreens);
    pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
    pubsub.publish(
      "tacticalMapUpdate",
      App.tacticalMaps.find(t => t.id === id)
    );
  }
);
