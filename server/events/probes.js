import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {capitalCase} from "change-case";
import throttle from "../helpers/throttle";



const sendAdvancedNavUpdate = throttle(() => {
    pubsub.publish(
        'advancedNavAndAstrometricsUpdate',
        App.systems.filter(s => s.type === 'AdvancedNavigationAndAstrometrics'),
    )
})

App.on("destroyProbe", ({id, probeId}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.destroyProbe(probeId);
  const advNavSys = App.systems.find(s => s.simulatorId === sys.simulatorId && s.type === "AdvancedNavigationAndAstrometrics");
  if (advNavSys) {
    advNavSys.resyncProbes();
  }
  sendAdvancedNavUpdate();
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
  
});
App.on("destroyAllProbes", ({id, simulatorId}) => {
  const sys = App.systems.find(
    s => s.id === id || (s.simulatorId === simulatorId && s.type === "Probes"),
  );
  sys.destroyAllProbes();
  const advNavSys = App.systems.find(s => s.simulatorId === sys.simulatorId && s.type === "AdvancedNavigationAndAstrometrics");
  if (advNavSys) {
    advNavSys.resyncProbes();
  }
  sendAdvancedNavUpdate();
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("destroyAllProbeNetwork", ({id, simulatorId}) => {
  const sys = App.systems.find(
    s => s.id === id || (s.simulatorId === simulatorId && s.type === "Probes"),
  );
  sys.destroyAllProbeNetwork();
  const advNavSys = App.systems.find(s => s.simulatorId === sys.simulatorId && s.type === "AdvancedNavigationAndAstrometrics");
  if (advNavSys) {
    advNavSys.resyncProbes();
  }
  sendAdvancedNavUpdate();
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("launchProbe", ({id, probe}) => {
  const sys = App.systems.find(s => s.id === id);
  if (!sys.torpedo) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Probes",
      station: "Core",
      title: `Probe Launched`,
      body: probe.name,
      color: "info",
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Probe Launched`,
        component: "ProbeControlCore",
        body: probe.name,
        color: "info",
      },
      "addCoreFeed",
    );
  }
  sys.launchProbe(probe);
  const advNavSys = App.systems.find(s => s.simulatorId === sys.simulatorId && s.type === "AdvancedNavigationAndAstrometrics");
  if (advNavSys) {
    advNavSys.resyncProbes();
  }
  sendAdvancedNavUpdate();
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("fireProbe", ({id, probeId}) => {
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
      color: "info",
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Probe Launched`,
        component: "ProbeControlCore",
        body: probe.name,
        color: "info",
      },
      "addCoreFeed",
    );

    const torpedos = App.systems.find(
      s => s.simulatorId === sys.simulatorId && s.type === "Torpedo",
    );
    if (torpedos) {
      App.handleEvent(
        {id: torpedos.id, probeId: probe.id},
        "torpedoRemoveWarhead",
      );
    }
    sys.fireProbe(probeId);
    const advNavSys = App.systems.find(s => s.simulatorId === sys.simulatorId && s.type === "AdvancedNavigationAndAstrometrics");
  if (advNavSys) {
    advNavSys.resyncProbes();
  }
  sendAdvancedNavUpdate();
    pubsub.publish(
      "probesUpdate",
      App.systems.filter(s => s.type === "Probes"),
    );
  }
});
App.on("updateProbeType", ({id, probeType}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateProbeType(probeType);
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("updateProbeEquipment", ({id, probeEquipment}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateProbeEquipment(probeEquipment);
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("probeQuery", ({id, probeId, query}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.probeQuery(probeId, query);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Probes",
    station: "Core",
    title: `Probe Query`,
    body: query,
    color: "info",
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `Probe Query`,
      component: "ProbeControlCore",
      body: query,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
  if (sys.training) {
    setTimeout(() => {
      App.handleEvent(
        {id, probeId, response: "None Detected (Training Mode)"},
        "probeQueryResponse",
        {clientId: "training", simulatorId: sys.simulatorId},
      );
    }, 5000);
  }
});
App.on("probeQueryResponse", ({id, probeId, response}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.probeQueryResponse(probeId, response);
  // Send Notifications
  const simulator = App.simulators.find(s => s.id === sys.simulatorId);
  const stations = simulator.stations.filter(s =>
    s.cards.find(c => c.component === "ProbeControl"),
  );
  stations.forEach(s => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: s.name,
      title: `New Probe Query Response`,
      body: response,
      color: "info",
    });
  });
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});
App.on("probeProcessedData", ({id, simulatorId, data = "", flash}) => {
  const sys = App.systems.find(
    s => s.id === id || (s.simulatorId === simulatorId && s.type === "Probes"),
  );
  const simulator = App.simulators.find(s => s.id === sys.simulatorId);
  sys && sys.addProcessedData(data.replace(/#SIM/gi, simulator.name));

  // Send Notifications
  const stations = simulator.stations.filter(s =>
    s.cards.find(c => c.component === "ProbeNetwork"),
  );
  stations.forEach(s => {
    if (flash) {
      const cardName = s.cards.find(c => c.component === "ProbeNetwork").name;
      App.handleEvent(
        {
          action: "changeCard",
          message: cardName,
          simulatorId: sys.simulatorId,
          stationId: s.name,
        },
        "triggerAction",
      );
      App.handleEvent(
        {
          action: "flash",
          simulatorId: sys.simulatorId,
          stationId: s.name,
        },
        "triggerAction",
      );
    }
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: s.name,
      title: `New Processed Data`,
      body: data,
      color: "info",
      relevantCards: ["ProbeNetwork"],
    });
  });
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});

App.on("setProbeTorpedo", ({id, torpedo}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setTorpedo(torpedo);
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});

App.on("setProbeCharge", ({id, probeId, charge}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setProbeCharge(probeId, charge);
  pubsub.publish(
    "probesUpdate",
    App.systems.filter(s => s.type === "Probes"),
  );
});

export function getProbeConfig(probes, probe) {
  // Check to see if the probe equipment matches a
  // science probe configuration

  // First, map out the probe's equipment
  const probeEquip = probe.equipment.reduce(
    (prev, p) => ({...prev, [p.id]: p.count}),
    {},
  );
  // Get the requirements
  const reqEquip = probes.scienceTypes.reduce(
    (prev, t) => ({
      ...prev,
      [t.id]: t.equipment.reduce(
        (prev2, e) => ({...prev2, [e]: prev2[e] ? prev2[e] + 1 : 1}),
        {},
      ),
    }),
    {},
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

App.on("activateProbeEmitter", ({id, probeId}) => {
  const sys = App.systems.find(s => s.id === id);
  const probe = sys.probes.find(p => p.id === probeId);
  const scienceProbeType = getProbeConfig(sys, probe);

  if (scienceProbeType) {
    // Clear the task, if any.
    const clearedTask = App.tasks
      .concat(
        App.taskReports
          .filter(s => s.simulatorId === sys.simulatorId && !s.cleared)
          .map(r => r.tasks.filter(t => !t.verified))
          .reduce((prev, next) => prev.concat(next), []),
      )
      .filter(
        t =>
          !t.verified &&
          t.simulatorId === sys.simulatorId &&
          t.definition === "Execute Science Probe Function" &&
          Math.abs(parseFloat(t.values.charge) - probe.charge * 100) < 10 &&
          t.values.type &&
          t.values.type.toLowerCase() ===
            `${scienceProbeType.name}-${scienceProbeType.type}`.toLowerCase(),
      )
      .map(t => {
        t.verify();
        return true;
      });
    if (clearedTask.length > 0) {
      pubsub.publish("taskReportUpdate", App.taskReports);

      pubsub.publish(
        "tasksUpdate",
        App.tasks.filter(s => s.simulatorId === sys.simulatorId),
      );
    }
    // Update the history of the probe
    probe.addHistory(
      `Activated ${scienceProbeType.name} ${
        scienceProbeType.type
      } at ${Math.round(probe.charge * 100)}%.`,
    );

    // Send a special publish
    pubsub.publish("scienceProbeEmitter", {
      simulatorId: sys.simulatorId,
      name: scienceProbeType.name,
      type: scienceProbeType.type,
      charge: probe.charge,
    });

    // Send the regular publish.
    pubsub.publish(
      "probesUpdate",
      App.systems.filter(s => s.type === "Probes"),
    );

    // Notifications
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Probes",
      station: "Core",
      title: `Science Probe ${capitalCase(scienceProbeType.type)}`,
      body: `${scienceProbeType.name} at ${Math.round(probe.charge * 100)}%`,
      color: "info",
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Science Probe ${capitalCase(scienceProbeType.type)}`,
        component: "ProbeControlCore",
        body: `${scienceProbeType.name} at ${Math.round(probe.charge * 100)}%`,
        color: "info",
      },
      "addCoreFeed",
    );
    probe.setCharge(0);
  }
});
