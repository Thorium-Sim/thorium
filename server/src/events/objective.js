import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addObjective", args => {
  console.log(args);
  const { objective, simulatorId } = args;
  const obj = new Classes.Objective(
    simulatorId ? Object.assign({}, objective, { simulatorId }) : objective
  );
  App.objectives.push(obj);
  pubsub.publish("objectiveUpdate", App.objectives);
});
App.on("completeObjective", ({ id, title, cancel, simulatorId, state }) => {
  const obj = App.objectives.find(
    o => o.id === id || (o.title === title && o.simulatorId === simulatorId)
  );
  if (cancel) {
    obj.cancel();
  } else if (state === false) {
    obj.uncomplete();
  } else {
    obj && obj.complete();
  }
  pubsub.publish("objectiveUpdate", App.objectives);
});

App.on("objectiveSetCrewComplete", ({ id, crewComplete }) => {
  const obj = App.objectives.find(o => o.id === id);
  obj.setCrewComplete(crewComplete);
  pubsub.publish("objectiveUpdate", App.objectives);
});
