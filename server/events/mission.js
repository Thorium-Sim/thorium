import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import uuid from "uuid";
// Mission
App.on("createMission", ({id = uuid.v4(), name, cb}) => {
  const mission = new Classes.Mission({id, name});
  App.missions.push(mission);
  pubsub.publish("missionsUpdate", App.missions);
  cb(id);
});
App.on("removeMission", ({missionId}) => {
  App.missions = App.missions.filter(m => m.id !== missionId);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on(
  "editMission",
  ({missionId, name, description, category, simulators, aux}) => {
    const mission = App.missions.find(m => m.id === missionId);
    mission.update({name, description, category, simulators, aux});
    pubsub.publish("missionsUpdate", App.missions);
  },
);
App.on("importMission", ({jsonString}) => {
  const json = JSON.parse(jsonString);
  delete json.id;
  const mission = new Classes.Mission(json);
  App.missions.push(mission);
  pubsub.publish("missionsUpdate", App.missions);
});

// Aux Timelines
App.on("startAuxTimeline", ({simulatorId, missionId, cb}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const timelineId = simulator.addAuxTimeline(missionId);
  pubsub.publish("auxTimelinesUpdate", simulator);
  cb && cb(timelineId);
});

App.on("setAuxTimelineStep", ({simulatorId, timelineId, step}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.setAuxTimelineStep(timelineId, step);
  pubsub.publish("auxTimelinesUpdate", simulator);
});
App.on("missionSetExtraRequirements", ({missionId, requirements}) => {
  const mission = App.missions.find(m => m.id === missionId);
  mission.updateExtraRequirements(requirements);
  pubsub.publish("missionsUpdate", App.missions);
});
