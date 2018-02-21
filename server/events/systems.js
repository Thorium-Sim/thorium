import App from "../app.js";
import uuid from "uuid";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";

const sendUpdate = sys => {
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
  if (sys.class === "DockingPort")
    pubsub.publish("dockingUpdate", App.dockingPorts);
  pubsub.publish("systemsUpdate", App.systems);
};
App.on("addSystemToSimulator", ({ simulatorId, className, params }) => {
  const init = JSON.parse(params);
  init.simulatorId = simulatorId;
  const ClassObj = Classes[className];
  const obj = new ClassObj(init);
  App.systems.push(obj);
  pubsub.publish("systemsUpdate", App.systems);
});
App.on("removeSystemFromSimulator", ({ systemId, simulatorId, type }) => {
  if (systemId) {
    App.systems = App.systems.filter(s => s.id !== systemId);
  } else if (simulatorId && type) {
    const sys = App.systems.find(
      s => s.simulatorId === simulatorId && s.type === type
    );
    App.systems = App.systems.filter(s => s.id !== sys.id);
  }
  pubsub.publish("systemsUpdate", App.systems);
});
App.on("updateSystemName", ({ systemId, name, displayName }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.updateName({ name, displayName });
  sendUpdate(sys);
});
App.on("damageSystem", ({ systemId, report }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys = App.dockingPorts.find(s => s.id === systemId);
  }
  sys.break(report);
  sendUpdate(sys);
});
App.on("damageReport", ({ systemId, report }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys = App.dockingPorts.find(s => s.id === systemId);
  }
  sys.damageReport(report);
  sendUpdate(sys);
});
App.on("repairSystem", ({ systemId }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys = App.dockingPorts.find(s => s.id === systemId);
  }
  sys.repair();
  sendUpdate(sys);
});
App.on("updateCurrentDamageStep", ({ systemId, step }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys = App.dockingPorts.find(s => s.id === systemId);
  }
  sys.updateCurrentStep(step);
  sendUpdate(sys);
});
App.on("systemReactivationCode", ({ systemId, station, code }) => {
  let sys = App.systems.find(s => s.id === systemId);
  if (!sys) {
    sys = App.dockingPorts.find(s => s.id === systemId);
  }
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
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
    sys = App.dockingPorts.find(s => s.id === systemId);
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
    sys = App.dockingPorts.find(s => s.id === systemId);
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
App.on("addSystemDamageStep", ({ systemId, step }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.addDamageStep(step);
  sendUpdate(sys);
});
App.on("updateSystemDamageStep", ({ systemId, step }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.updateDamageStep(step);
  sendUpdate(sys);
});
App.on("removeSystemDamageStep", ({ systemId, step }) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.removeDamageStep(step);
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
  sys && sys.break();
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
App.on("trainingMode", ({ simulatorId }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.trainingMode(true);
  const systems = App.systems.filter(s => s.simulatorId === simulatorId);
  systems.forEach(s => {
    s.trainingMode();
    sendUpdate(s);
  });
  pubsub.publish("simulatorsUpdate", App.simulators);
});
