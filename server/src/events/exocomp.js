import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("setSimulatorExocomps", ({ simulatorId, count }) => {
  const exocomps = App.exocomps.filter(s => s.simulatorId === simulatorId);
  if (exocomps.length === count) return;
  if (exocomps.length < count) {
    const newExocomps = count - exocomps.length;
    Array(newExocomps)
      .fill(0)
      .forEach(() => {
        App.exocomps.push(new Classes.Exocomp({ simulatorId }));
      });
  } else if (exocomps.length > count) {
    const removeExocomps = exocomps.length - count;
    Array(removeExocomps)
      .fill(0)
      .forEach(() => {
        const ex = App.exocomps.find(e => e.simulatorId === simulatorId);
        App.exocomps = App.exocomps.filter(e => e.id !== ex.id);
      });
  }
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("deployExocomp", ({ exocomp }) => {
  const ex = App.exocomps.find(e => e.id === exocomp.id);
  ex.deploy(exocomp);
  App.handleEvent(
    {
      simulatorId: ex.simulatorId,
      title: `Exocomp Deployed`,
      component: "ExocompsCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("recallExocomp", ({ exocomp }) => {
  const ex = App.exocomps.find(e => e.id === exocomp);
  ex.recall();
  App.handleEvent(
    {
      simulatorId: ex.simulatorId,
      title: `Exocomp Recalled`,
      component: "ExocompsCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("exocompsUpdate", App.exocomps);
});
App.on("updateExocompDifficulty", ({ exocomp, difficulty }) => {
  const ex = App.exocomps.find(e => e.id === exocomp);
  ex.updateDifficulty(difficulty);
  pubsub.publish("exocompsUpdate", App.exocomps);
});
