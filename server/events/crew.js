import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import firstNames from "../crew/firstNames.json";
import lastNames from "../crew/lastNames.json";
import positions from "../crew/positions.json";
import ranks from "../crew/ranks.json";
import { randomFromList, damagePositions } from "../damageReports/constants";

App.on("addCrewmember", ({ crew }) => {
  App.crew.push(new Classes.Crew(crew));
  pubsub.publish("crewUpdate", App.crew);
});
App.on("removeCrewmember", ({ id }) => {
  App.crew = App.crew.filter(c => c.id !== id);
  pubsub.publish("crewUpdate", App.crew);
});
App.on("updateCrewmember", ({ crew }) => {
  App.crew.find(c => c.id === crew.id).update(crew);
  pubsub.publish("crewUpdate", App.crew);
});
App.on("newRandomCrewmember", ({ simulatorId, type, position }) => {
  const crew = {
    firstName: randomFromList(firstNames),
    lastName: randomFromList(lastNames),
    rank: randomFromList(ranks),
    gender: randomFromList(["M", "F", "X"]),
    age: Math.round(Math.random() * 20 + 20),
    simulatorId,
    position: position || getPosition(type, simulatorId)
  };
  App.crew.push(new Classes.Crew(crew));
  pubsub.publish("crewUpdate", App.crew);
});

function getPosition(type, simulatorId) {
  const simPositions = App.crew
    .filter(c => c.simulatorId === simulatorId)
    .map(c => c.position);
  if (type === "damage") return randomFromList(damagePositions);
  if (type === "security") return "Security Officer";
  if (type === "medical") return "Medical Officer";
  return randomFromList(positions.filter(p => simPositions.indexOf(p) === -1));
}
