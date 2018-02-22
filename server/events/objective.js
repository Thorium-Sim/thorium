import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addObjective", args => {
  const { objective, simulatorId } = args;
  const obj = new Classes.Objective(
    simulatorId ? Object.assign({}, objective, { simulatorId }) : objective
  );
  App.objectives.push(obj);
  pubsub.publish("objectiveUpdate", App.objectives);
});
App.on("completeObjective", ({ id, title, simulatorId }) => {
  const obj = App.objectives.find(
    o => o.id === id || (o.title === title && o.simulatorId === simulatorId)
  );
  obj && obj.complete();
  pubsub.publish("objectiveUpdate", App.objectives);
});
