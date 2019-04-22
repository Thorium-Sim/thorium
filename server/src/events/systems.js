import App from "../app.js";
import uuid from "uuid";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";

const sendUpdate = sys => {
  if (!sys) return;
  if (sys.type === "Engine") pubsub.publish("engineUpdate", sys);
  if (sys.type === "Transporters") pubsub.publish("transporterUpdate", sys);
  if (sys.type === "Shield")
    pubsub.publish(
      "shieldsUpdate",
      App.systems.filter(sys => sys.type === "Shield")
    );
  if (sys.type === "Sensors")
    pubsub.publish(
      "sensorsUpdate",
      App.systems.filter(s => s.type === "Sensors")
    );
  if (sys.type === "LongRangeComm")
    pubsub.publish(
      "longRangeCommunicationsUpdate",
      App.systems.filter(s => s.type === "LongRangeComm")
    );
  if (sys.type === "InternalComm")
    pubsub.publish(
      "internalCommUpdate",
      App.systems.filter(s => s.type === "InternalComm")
    );
  if (sys.type === "Navigation")
    pubsub.publish(
      "navigationUpdate",
      App.systems.filter(s => s.type === "Navigation")
    );
  if (sys.type === "ShortRangeComm")
    pubsub.publish(
      "shortRangeCommUpdate",
      App.systems.filter(s => s.type === "ShortRangeComm")
    );
  if (sys.type === "TractorBeam")
    pubsub.publish(
      "tractorBeamUpdate",
      App.systems.filter(s => s.type === "TractorBeam")
    );
  if (sys.type === "Phasers")
    pubsub.publish(
      "phasersUpdate",
      App.systems.filter(s => s.type === "Phasers")
    );
  if (sys.type === "Targeting")
    pubsub.publish(
      "targetingUpdate",
      App.systems.filter(s => s.type === "Targeting")
    );
  if (sys.type === "Torpedo")
    pubsub.publish(
      "torpedosUpdate",
      App.systems.filter(s => s.type === "Torpedo")
    );
  if (sys.type === "Probes")
    pubsub.publish(
      "probesUpdate",
      App.systems.filter(s => s.type === "Probes")
    );
  if (sys.type === "SignalJammer")
    pubsub.publish(
      "signalJammersUpdate",
      App.systems.filter(s => s.type === "SignalJammer")
    );
  if (sys.type === "StealthField")
    pubsub.publish(
      "stealthFieldUpdate",
      App.systems.filter(s => s.type === "StealthField")
    );
  if (sys.type === "Railgun")
    pubsub.publish("railgunUpdate", App.systems.filter(s => s.id === sys.id));

  if (sys.type === "JumpDrive")
    pubsub.publish("jumpDriveUpdate", App.systems.filter(s => s.id === sys.id));
  if (sys.type === "Transwarp")
    pubsub.publish("transwarpUpdate", App.systems.filter(s => s.id === sys.id));

  if (sys.class === "DockingPort")
    pubsub.publish("dockingUpdate", App.dockingPorts);
  pubsub.publish("systemsUpdate", App.systems);
};
App.on("addSystemToSimulator", ({ simulatorId, className, params, cb }) => {
  const init = JSON.parse(params);
  init.simulatorId = simulatorId;
  const ClassObj = Classes[className];
  const obj = new ClassObj(init);
  App.systems.push(obj);
  pubsub.publish("systemsUpdate", App.systems);
  cb && cb();
});
App.on("removeSystemFromSimulator", ({ systemId, simulatorId, type, cb }) => {
  if (systemId) {
    App.systems = App.systems.filter(s => s.id !== systemId);
  } else if (simulatorId && type) {
    const sys = App.systems.find(
      s => s.simulatorId === simulatorId && s.type === type
    );
    App.systems = App.systems.filter(s => s.id !== sys.id);
  }
  pubsub.publish("systemsUpdate", App.systems);
  cb && cb();
});
App.on("updateSystemName", ({ systemId, name, displayName }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.updateName({ name, displayName });
  sendUpdate(sys);
});
App.on("damageSystem", ({ systemId, report, destroyed, which = "default" }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
    if (!sys) return;
  }
  sys.break(report, destroyed, which);
  sendUpdate(sys);
});
App.on("damageReport", ({ systemId, report }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  sys.damageReport(report);
  sendUpdate(sys);
});
App.on("repairSystem", ({ systemId }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  sys.repair();
  sendUpdate(sys);
});
App.on("updateCurrentDamageStep", ({ systemId, step }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  sys.updateCurrentStep(step);
  sendUpdate(sys);
});
App.on("systemReactivationCode", ({ systemId, station, code }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Reactivation Code",
    station: "Core",
    title: `Reactivation Code`,
    body: sys.name,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      component: "ReactivationCore",
      title: `Reactivation Code`,
      body: sys.name,
      color: "info"
    },
    "addCoreFeed"
  );
  sys.reactivationCode(code, station);
  sendUpdate(sys);
});
App.on("changePower", ({ systemId, power }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.setPower(power);
  sendUpdate(sys);
});
App.on("changeSystemPowerLevels", ({ systemId, powerLevels }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.setPowerLevels(powerLevels);
  sendUpdate(sys);
});
App.on("requestDamageReport", ({ systemId }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      component: "DamageReportsCore",
      title: `Damage Report Request`,
      body: sys.name,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Damage Reports",
    station: "Core",
    title: `Damage Report Request`,
    body: sys.name,
    color: "info"
  });
  sys.requestReport();
  sendUpdate(sys);
});
App.on("systemReactivationCodeResponse", ({ systemId, response }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys =
      App.dockingPorts.find(s => s.id === systemId) ||
      App.exocomps.find(s => s.id === systemId);
  }
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    station: sys.damage.reactivationRequester,
    title: "Reactivation Code",
    body: `Reactivation Code for ${sys.displayName || sys.name} was ${
      response ? "Accepted" : "Denied"
    }`,
    color: response ? "success" : "danger"
  });
  sys.reactivationCodeResponse(response);
  sendUpdate(sys);
});
App.on("setCoolant", ({ systemId, coolant }) => {
  const sys = App.systems.find(s => s.id === systemId);
  if (sys.setCoolant) sys.setCoolant(coolant);
  sendUpdate(sys);
});
App.on("updateSystemRooms", ({ systemId, locations }) => {
  const sys = App.systems.find(s => s.id === systemId);
  if (sys.updateLocations) sys.updateLocations(locations);
  sendUpdate(sys);
});
App.on("addSystemDamageStep", ({ systemId, step, cb }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.addDamageStep(step);
  sendUpdate(sys);
  cb && cb();
});
App.on("updateSystemDamageStep", ({ systemId, step, cb, context }) => {
  let sys = App.systems.find(s => s.id === systemId);
  sys && sys.updateDamageStep(step);
  sendUpdate(sys);
  cb && cb();
});
App.on("removeSystemDamageStep", ({ systemId, step, cb }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.removeDamageStep(step);
  sendUpdate(sys);
  cb && cb();
});
App.on("addSystemDamageTask", ({ systemId, task }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.addDamageTask(task);
  sendUpdate(sys);
});
App.on("updateSystemDamageTask", ({ systemId, task }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.updateDamageTask(task);
  sendUpdate(sys);
});
App.on("removeSystemDamageTask", ({ systemId, taskId }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.removeDamageTask(taskId);
  sendUpdate(sys);
});
App.on("breakSystem", ({ simulatorId, type, name }) => {
  const systems = App.systems.filter(
    s =>
      s.simulatorId === simulatorId &&
      s.type === type &&
      (name ? s.name === name : true)
  );
  const sys = systems.find(s => s.damage.damaged === false);
  if (sys) {
    sys.break();
  } else if (name) {
    // If the system doesn't exist and the name arg is set, create a new system
    const args = {
      simulatorId,
      name,
      extra: true,
      damage: { damaged: true }
    };
    const ClassObj = Classes.System;
    const obj = new ClassObj(args);
    App.systems.push(obj);
  }
  sendUpdate(sys);
});
App.on("fixSystem", ({ simulatorId, type, name }) => {
  const systems = App.systems.filter(
    s =>
      s.simulatorId === simulatorId &&
      s.type === type &&
      (name ? s.name === name : true)
  );
  const sys = systems.find(s => s.damage.damaged === true);
  sys && sys.repair();
  sendUpdate(sys);
});
App.on("generateDamageReport", ({ systemId, steps, cb }) => {
  let sys = App.systems.find(s => s.id === systemId);
  cb(sys.generateDamageReport(steps));
});
App.on("trainingMode", ({ simulatorId }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.trainingMode(true);
  const hasCommReview = !!sim.stations.find(s =>
    s.cards.find(c => c.component === "CommReview")
  );
  const systems = App.systems.filter(s => s.simulatorId === simulatorId);
  systems.forEach(s => {
    // The arguments are named and provide extra data to some of the training
    // mode methods.
    s.trainingMode({ hasCommReview });
    sendUpdate(s);
  });
  // Create a training system to damage
  const ClassObj = Classes.System;
  const obj = new ClassObj({
    name: "Training",
    extra: true,
    simulatorId,
    damage: { damaged: true }
  });
  obj.damageReport(`Step 1:
This is a training damage report. There will be several steps which you must follow to repair systems on your ship.

Go through the steps in this report to see what some of the things you will be expected to do are.


Step 2:
We should inform the closest starbase of our situation. You need to prepare a message using your long range message composer, or ask the Comm officer to send this message:

Destination: Starbase 4
Message: We have taken damage to our Training system. We might need assistance if the damage worsens. What ships are near our position?
  

Step 3:
If you followed the steps properly, the system has been repaired. Enter the following reactivation code to reactivate the system: #REACTIVATIONCODE
`);
  App.systems.push(obj);
  pubsub.publish("systemsUpdate", App.systems);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setDamageStepValidation", ({ id, validation }) => {
  let sys = App.systems.find(s => s.id === id);
  const sim = App.simulators.find(s => s.id === sys.simulatorId);
  sys.damage.validate = validation;

  if (validation === false) {
    // Send an update to every station with the
    // damage step widget and card
    const stations = sim.stations
      .filter(s => {
        return s.cards.find(c =>
          ["DamageControl", "EngineeringReports", "RnDReports"].includes(
            c.component
          )
        );
      })
      .concat(sim.stations.filter(s => s.widgets.indexOf("damageReport") > -1))
      .map(s => s.name)
      .filter((s, i, a) => a.indexOf(s) === i);
    stations.forEach(s =>
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: sys.simulatorId,
        station: s,
        title: `Damage report step validation rejected`,
        body: sys.name,
        color: "danger",
        relevantCards: ["DamageControl", "EngineeringReports", "RnDReports"]
      })
    );
  } else {
    // Add the core feed
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        component: "DamageReportsCore",
        title: `Damage Step Verify Request`,
        body: sys.name,
        color: "info"
      },
      "addCoreFeed"
    );
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Damage Reports",
      station: "Core",
      title: `Damage Validation Request`,
      body: sys.name,
      color: "warning"
    });
  }
  sendUpdate(sys);
});
App.on("validateDamageStep", ({ id }) => {
  // The step is good. Increase the current step.
  let sys = App.systems.find(s => s.id === id);
  const sim = App.simulators.find(s => s.id === sys.simulatorId);
  sys.updateCurrentStep(sys.damage.currentStep + 1);
  sys.damage.validate = false;
  // Send an update to every station with the
  // damage step widget and card
  const stations = sim.stations
    .filter(s => {
      return s.cards.find(c =>
        ["DamageControl", "EngineeringReports", "RnDReports"].includes(
          c.component
        )
      );
    })
    .concat(sim.stations.filter(s => s.widgets.indexOf("damageReport") > -1))
    .map(s => s.name)
    .filter((s, i, a) => a.indexOf(s) === i);
  stations.forEach(s =>
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: s,
      title: `Damage report step validation accepted`,
      body: sys.name,
      color: "success",
      relevantCards: ["DamageControl", "EngineeringReports", "RnDReports"]
    })
  );
  sendUpdate(sys);
});
App.on("changeSystemDefaultPowerLevel", ({ id, level }) => {
  let sys = App.systems.find(s => s.id === id);
  sys.setDefaultPowerLevel(level);
  sendUpdate(sys);
});
App.on("fluxSystemPower", ({ id, simulatorId, all, type, name }) => {
  function randomFromList(list) {
    if (!list) return;
    const length = list.length;
    const index = Math.floor(Math.random() * length);
    return list[index];
  }
  function fluxPower(sys, all) {
    const level = Math.round(
      (1 + Math.random()) * (Math.random() > 0.5 ? -1 : 1)
    );

    sys.setPower(Math.max(0, sys.power.power + level));
    if (all) {
      pubsub.publish("systemsUpdate", App.systems);
    } else {
      sendUpdate(sys);
    }
  }
  const system = App.systems.find(
    s =>
      s.id === id ||
      (s.simulatorId === simulatorId &&
        (s.type === type || s.name === name || s.displayName === name))
  );
  if (system) {
    // Get a number between -2 and 2
    fluxPower(system);
  } else if (simulatorId) {
    const systems = App.systems.filter(
      s =>
        s.simulatorId === simulatorId &&
        s.power.powerLevels &&
        s.power.powerLevels.length > 0
    );
    if (!all) {
      const sys = randomFromList(systems);
      fluxPower(sys, true);
    } else {
      systems.forEach(s => fluxPower(s));
    }
  }
});
