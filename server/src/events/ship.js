import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("shipDockingChange", ({ simulatorId, which, state }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator[which](state);
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: simulatorId,
      type: "Docking",
      station: "Core",
      title: which,
      body:
        which === "clamps"
          ? `Clamps are now ${state ? "Attached" : "Detached"}`
          : which === "ramps"
            ? `Ramps are now ${state ? "Extended" : "Retracted"}`
            : `Doors are now ${state ? "Open" : "Closed"}`,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: simulatorId,
        title: which,
        component: "DockingCore",
        body:
          which === "clamps"
            ? `Clamps are now ${state ? "Attached" : "Detached"}`
            : which === "ramps"
              ? `Ramps are now ${state ? "Extended" : "Retracted"}`
              : `Doors are now ${state ? "Open" : "Closed"}`,
        color: "info"
      },
      "addCoreFeed"
    );
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("remoteAccessSendCode", ({ simulatorId, code, station }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.sendCode(code, station);
    App.handleEvent(
      {
        simulatorId: simulator.id,
        component: "RemoteCore",
        title: "Remote Access Code",
        body: `Code from: ${station}
      ${code}`,
        color: "info"
      },
      "addCoreFeed"
    );
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: simulatorId,
      type: "Remote Access",
      station: "Core",
      title: "Remote Access Code",
      body: `Code from: ${station}
      ${code}`,
      color: "info"
    });
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("remoteAccessUpdateCode", ({ simulatorId, codeId, state }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.updateCode(codeId, state);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
  //Send the notification
  //Get the code
  const code = simulator.ship.remoteAccessCodes.find(c => c.id === codeId);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulator.id,
    station: code.station,
    title: "Remote Access Code",
    body: `Remote Access Code ${code.code} was ${state}`,
    color: state === "Accepted" ? "success" : "danger"
  });
});
App.on("setSelfDestructTime", ({ simulatorId, time }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.setSelfDestructTime(time);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulatorId,
    type: "Self Destruct",
    station: "Core",
    title: `Self Destruct ${time ? "Activated" : "Deactivated"}`,
    body: ``,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: simulatorId,
      component: "SelfDestructCore",
      title: `Self Destruct ${time ? "Activated" : "Deactivated"}`,
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSelfDestructCode", ({ simulatorId, code }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.setSelfDestructCode(code);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSelfDestructAuto", ({ simulatorId, auto }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.setSelfDestructAuto(auto);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
