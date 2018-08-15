import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

// Mission
App.on("createMission", ({ id, name }) => {
  const mission = new Classes.Mission({ id, name });
  App.missions.push(mission);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("removeMission", ({ missionId }) => {
  App.missions = App.missions.filter(m => m.id !== missionId);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("editMission", ({ missionId, name, description, simulators }) => {
  const mission = App.missions.find(m => m.id === missionId);
  mission.update({ name, description, simulators });
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("importMission", ({ jsonString }) => {
  const json = JSON.parse(jsonString);
  delete json.id;
  const mission = new Classes.Mission(json);
  App.missions.push(mission);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("addSimulatorToMission", ({ missionId, simulatorName }) => {
  const mission = App.missions.find(m => m.id === missionId);
  const simulator = new Classes.Simulator({
    name: `${mission.name} : ${simulatorName}`
  });
  mission.addSimulator(simulator.id, simulatorName);
  App.simulators.push(simulator);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("removeSimulatorToMission", ({ missionId, simulatorId }) => {
  const mission = App.missions.find(m => m.id === missionId);
  mission.removeSimulator(simulatorId);
  App.simulators = App.simulators.filter(s => s.id !== simulatorId);
  pubsub.publish("missionsUpdate", App.missions);
});
