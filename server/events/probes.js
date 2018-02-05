import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
App.on("destroyProbe", ({ id, probeId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.destroyProbe(probeId);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("launchProbe", ({ id, probe }) => {
  const sys = App.systems.find(s => s.id === id);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    station: "Core",
    title: `Probe Launched`,
    body: probe.name,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `Probe Launched`,
      body: probe.name,
      color: "info"
    },
    "addCoreFeed"
  );
  sys.launchProbe(probe);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("fireProbe", ({ id, probeId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.fireProbe(probeId);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("updateProbeType", ({ id, probeType }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateProbeType(probeType);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("updateProbeEquipment", ({ id, probeEquipment }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateProbeEquipment(probeEquipment);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("probeQuery", ({ id, probeId, query }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.probeQuery(probeId, query);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("probeQueryResponse", ({ id, probeId, response }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.probeQueryResponse(probeId, response);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("probeProcessedData", ({ id, data }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.addProcessedData(data);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
