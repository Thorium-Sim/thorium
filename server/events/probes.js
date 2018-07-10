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
  if (!sys.torpedo) {
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
        component: "ProbeControlCore",
        body: probe.name,
        color: "info"
      },
      "addCoreFeed"
    );
  }
  sys.launchProbe(probe);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("fireProbe", ({ id, probeId }) => {
  const sys = App.systems.find(s => s.id === id);
  const probe = sys.probes.find(p => p.id === probeId);
  if (probe) {
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
        component: "ProbeControlCore",
        body: probe.name,
        color: "info"
      },
      "addCoreFeed"
    );
    sys.fireProbe(probeId);
    pubsub.publish(
      "probesUpdate",
      App.systems.filter(s => s.type === "Probes")
    );
  }
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
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `Probe Query`,
      component: "ProbeControlCore",
      body: query,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("probeQueryResponse", ({ id, probeId, response }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.probeQueryResponse(probeId, response);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
App.on("probeProcessedData", ({ id, simulatorId, data = "" }) => {
  const sys = App.systems.find(
    s => s.id === id || (s.simulatorId === simulatorId && s.type === "Probes")
  );
  const simulator = App.simulators.find(s => s.id === sys.simulatorId);
  sys && sys.addProcessedData(data.replace(/#SIM/gi, simulator.name));
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});

App.on("setProbeTorpedo", ({ id, torpedo }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setTorpedo(torpedo);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});
