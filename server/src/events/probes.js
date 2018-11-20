import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
import { titleCase } from "change-case";

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
      type: "Probes",
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
      type: "Probes",
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
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Probes",
    station: "Core",
    title: `Probe Query`,
    body: query,
    color: "info"
  });
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

App.on("setProbeCharge", ({ id, probeId, charge }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setProbeCharge(probeId, charge);
  pubsub.publish("probesUpdate", App.systems.filter(s => s.type === "Probes"));
});

export function getProbeConfig(probes, probe) {
  // Check to see if the probe equipment matches a
  // science probe configuration

  // First, map out the probe's equipment
  const probeEquip = probe.equipment.reduce(
    (prev, p) => ({ ...prev, [p.id]: p.count }),
    {}
  );
  // Get the requirements
  const reqEquip = probes.scienceTypes.reduce(
    (prev, t) => ({
      ...prev,
      [t.id]: t.equipment.reduce(
        (prev2, e) => ({ ...prev2, [e]: prev2[e] ? prev2[e] + 1 : 1 }),
        {}
      )
    }),
    {}
  );

  // Get the type based on the equipment
  const type = Object.entries(reqEquip).find(([id, equipment]) => {
    const probeEquipment = Object.entries(probeEquip);
    for (let i = 0; i < probeEquipment.length; i++) {
      const [eqId, count] = probeEquipment[i];
      if (!equipment[eqId] || equipment[eqId] < count) return false;
    }
    return true;
  });
  if (type) {
    return probes.scienceTypes.find(t => t.id === type[0]);
  }
  return null;
}

App.on("activateProbeEmitter", ({ id, probeId }) => {
  const sys = App.systems.find(s => s.id === id);
  const probe = sys.probes.find(p => p.id === probeId);
  const scienceProbeType = getProbeConfig(sys, probe);

  if (scienceProbeType) {
    // Update the history of the probe
    probe.addHistory(
      `Activated ${scienceProbeType.name} ${
        scienceProbeType.type
      } at ${Math.round(probe.charge * 100)}%.`
    );

    // Send a special publish
    pubsub.publish("scienceProbeEmitter", {
      simulatorId: sys.simulatorId,
      name: scienceProbeType.name,
      type: scienceProbeType.type,
      charge: probe.charge
    });
    probe.setCharge(0);

    // Send the regular publish.
    pubsub.publish(
      "probesUpdate",
      App.systems.filter(s => s.type === "Probes")
    );

    // Notifications
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Probes",
      station: "Core",
      title: `Science Probe ${titleCase(scienceProbeType.type)}`,
      body: `${scienceProbeType.name} at ${Math.round(probe.charge * 100)}%`,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Science Probe ${titleCase(scienceProbeType.type)}`,
        component: "ProbeControlCore",
        body: `${scienceProbeType.name} at ${Math.round(probe.charge * 100)}%`,
        color: "info"
      },
      "addCoreFeed"
    );
  }
});
