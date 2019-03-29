import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import {
  randomFromList,
  damagePositions
} from "../classes/generic/damageReports/constants";
import path from "path";
const firstNames = require(path.resolve(
  __dirname + "/../crew/firstNames.json"
));
const lastNames = require(path.resolve(__dirname + "/../crew/lastNames.json"));
const positions = require(path.resolve(__dirname + "/../crew/positions.json"));
const ranks = require(path.resolve(__dirname + "/../crew/ranks.json"));

App.on("addCrewmember", ({ crew }) => {
  App.crew.push(new Classes.Crew(crew));
  pubsub.publish("crewUpdate", App.crew);
  pubsub.publish("crewCountUpdate", App.crew);
});
App.on("removeCrewmember", ({ id }) => {
  App.crew = App.crew.filter(c => c.id !== id);
  pubsub.publish("crewUpdate", App.crew);
  pubsub.publish("crewCountUpdate", App.crew);
});
App.on("removeAllCrew", ({ simulatorId }) => {
  App.crew = App.crew.filter(c => c.simulatorId !== simulatorId);
  pubsub.publish("crewUpdate", App.crew);
  pubsub.publish("crewCountUpdate", App.crew);
});
App.on("updateCrewmember", ({ crew }) => {
  App.crew.find(c => c.id === crew.id).update(crew);
  pubsub.publish("crewUpdate", App.crew);
  pubsub.publish("crewCountUpdate", App.crew);
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
  pubsub.publish("crewCountUpdate", App.crew);
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

App.on("crewImport", ({ simulatorId, crew }) => {
  crew.forEach(c => {
    App.crew.push(new Classes.Crew({ ...c, simulatorId }));
  });
  pubsub.publish("crewUpdate", App.crew);
  pubsub.publish("crewCountUpdate", App.crew);
});
