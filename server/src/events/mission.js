import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";
// Mission
App.on("createMission", ({ id = uuid.v4(), name, cb }) => {
  const mission = new Classes.Mission({ id, name });
  App.missions.push(mission);
  pubsub.publish("missionsUpdate", App.missions);
  cb(id);
});
App.on("removeMission", ({ missionId }) => {
  App.missions = App.missions.filter(m => m.id !== missionId);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on("editMission", ({ missionId, name, description, simulators, aux }) => {
  console.log("event", aux);
  const mission = App.missions.find(m => m.id === missionId);
  mission.update({ name, description, simulators, aux });
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

// Aux Timelines
App.on("startAuxTimeline", ({ simulatorId, missionId, cb }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const timelineId = simulator.addAuxTimeline(missionId);
  pubsub.publish("auxTimelinesUpdate", simulator);
  cb && cb(timelineId);
});

App.on("setAuxTimelineStep", ({ simulatorId, timelineId, step }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.setAuxTimelineStep(timelineId, step);
  pubsub.publish("auxTimelinesUpdate", simulator);
});
