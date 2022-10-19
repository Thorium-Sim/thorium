import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";

App.on("shipSetDocking", ({simulatorId, clamps, ramps, airlock, legs}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.clamps(clamps);
  simulator.ramps(ramps);
  simulator.airlock(airlock);
  simulator.legs(legs);
  if (!clamps) {
    // Turn off external power if clamps are false
    const reactors = App.systems.filter(
      s =>
        s.class === "Reactor" &&
        s.simulatorId === simulator.id &&
        s.model === "reactor",
    );
    reactors.forEach(r => {
      if (r.externalPower) {
        r.changeEfficiency(1);
      }
    });
    pubsub.publish(
      "reactorUpdate",
      App.systems.filter(s => s.type === "Reactor"),
    );
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("shipDockingChange", ({simulatorId, which, state, context: {core}}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator[which](state);
    // Turn off external power if clamps are false
    if (which === "clamps" && !state) {
      const reactors = App.systems.filter(
        s =>
          s.class === "Reactor" &&
          s.simulatorId === simulator.id &&
          s.model === "reactor",
      );
      reactors.forEach(r => {
        if (r.externalPower) {
          r.changeEfficiency(1);
        }
      });
      pubsub.publish(
        "reactorUpdate",
        App.systems.filter(s => s.type === "Reactor"),
      );
    }
    if (core) {
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
            : which === "airlock"
            ? `Doors are now ${state ? "Open" : "Closed"}`
            : `Legs are now ${state ? "Extended" : "Retracted"}`,
        color: "info",
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
              : which === "airlock"
              ? `Doors are now ${state ? "Open" : "Closed"}`
              : `Legs are now ${state ? "Extended" : "Retracted"}`,
          color: "info",
        },
        "addCoreFeed",
      );
    }
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "remoteAccessSendCode",
  ({simulatorId, code, station, context: {core}}) => {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    if (simulator) {
      simulator.sendCode(code, station);
      if (core) {
        App.handleEvent(
          {
            simulatorId: simulator.id,
            component: "RemoteCore",
            title: "Remote Access Code",
            body: `Code from: ${station}
      ${code}`,
            color: "info",
          },
          "addCoreFeed",
        );
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: simulatorId,
          type: "Remote Access",
          station: "Core",
          title: "Remote Access Code",
          body: `Code from: ${station}
      ${code}`,
          color: "info",
        });
      }
    }
    pubsub.publish("simulatorsUpdate", App.simulators);
  },
);
App.on("remoteAccessUpdateCode", ({simulatorId, codeId, state}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.updateCode(codeId, state);

  pubsub.publish("simulatorsUpdate", App.simulators);
  //Send the notification
  //Get the code
  const code = simulator.ship.remoteAccessCodes.find(c => c.id === codeId);
  if (!code) return;
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulator.id,
    station: code.station,
    title: "Remote Access Code",
    body: `Remote Access Code ${code.code} was ${state}`,
    color: state === "Accepted" ? "success" : "danger",
    relevantCards: ["remote"],
  });
});
App.on("setSelfDestructTime", ({simulatorId, time}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim?.setSelfDestructTime(time);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulatorId,
    type: "Self Destruct",
    station: "Core",
    title: `Self Destruct ${time ? "Activated" : "Deactivated"}`,
    body: ``,
    color: "info",
  });
  App.handleEvent(
    {
      simulatorId: simulatorId,
      component: "SelfDestructCore",
      title: `Self Destruct ${time ? "Activated" : "Deactivated"}`,
      body: null,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSelfDestructCode", ({simulatorId, code}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim?.setSelfDestructCode(code);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSelfDestructAuto", ({simulatorId, auto}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim?.setSelfDestructAuto(auto);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "notify",
  ({simulatorId, type, station = "Core", title, body, color = "primary"}) => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId,
      type,
      station,
      title,
      body,
      color,
    });
  },
);
App.on("printPdf", ({asset, simulatorId}) => {
  App.printQueue.push({
    id: uuid.v4(),
    asset,
    simulatorId,
    timestamp: Date.now(),
  });
  pubsub.publish(
    "printQueue",
    App.printQueue.filter(queue => queue.simulatorId === simulatorId),
  );
  App.handleEvent(
    {
      simulatorId: simulatorId,
      component: "PrintQueueCore",
      title: `New Print Queue`,
      body: asset,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulatorId,
    type: "Print Queue",
    station: "Core",
    title: `New Print Queue`,
    body: asset,
    color: "info",
  });
});
App.on("clearPdf", ({id}) => {
  const pdf = App.printQueue.find(item => item.id === id);
  App.printQueue = App.printQueue.filter(item => item.id !== id);
  pubsub.publish(
    "printQueue",
    App.printQueue.filter(queue => queue.simulatorId === pdf?.simulatorId),
  );
});
