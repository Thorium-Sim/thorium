import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";

App.on("setSimulatorExocomps", ({simulatorId, count}) => {
  const exocomps = App.exocomps.filter(s => s.simulatorId === simulatorId);
  if (exocomps.length === count) return;
  if (exocomps.length < count) {
    const newExocomps = count - exocomps.length;
    Array(newExocomps)
      .fill(0)
      .forEach(() => {
        App.exocomps.push(new Classes.Exocomp({simulatorId}));
      });
  } else if (exocomps.length > count) {
    const removeExocomps = exocomps.length - count;
    Array(removeExocomps)
      .fill(0)
      .forEach(() => {
        const ex = App.exocomps.find(e => e.simulatorId === simulatorId);
        App.exocomps = App.exocomps.filter(e => e.id !== ex?.id);
      });
  }
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("deployExocomp", ({exocomp}) => {
  const ex = App.exocomps.find(e => e.id === exocomp.id);
  ex?.deploy(exocomp);
  App.handleEvent(
    {
      simulatorId: ex?.simulatorId,
      title: `Exocomp Deployed`,
      component: "ExocompsCore",
      body: null,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("recallExocomp", ({exocomp}) => {
  const ex = App.exocomps.find(e => e.id === exocomp);
  ex?.recall();
  App.handleEvent(
    {
      simulatorId: ex?.simulatorId,
      title: `Exocomp Recalled`,
      component: "ExocompsCore",
      body: null,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("exocompCompleteUpgrade", ({exocomp}) => {
  const ex = App.exocomps.find(e => e.id === exocomp);
  if (!ex) return;
  const sys = App.systems.find(s => s.id === ex.destination);
  ex.logs.push({
    timestamp: Date.now(),
    message: `${sys.displayName} has been upgraded.`,
  });
  ex.destination = null;
  App.handleEvent({systemId: sys.id}, "upgradeSystem");

  ex.updateState("returning");
});

App.on("updateExocompDifficulty", ({exocomp, difficulty}) => {
  const ex = App.exocomps.find(e => e.id === exocomp);
  ex?.updateDifficulty(difficulty);
  pubsub.publish("exocompsUpdate", App.exocomps);
});
