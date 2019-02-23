import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

function getTimelineObject(simulatorId, missionId) {
  if (simulatorId) return App.simulators.find(s => s.id === simulatorId);
  if (missionId) return App.missions.find(m => m.id === missionId);
  return {};
}

// Timeline
App.on(
  "addTimelineStep",
  ({ simulatorId, missionId, timelineStepId, name, description, cb }) => {
    if (!timelineStepId) {
      timelineStepId = uuid.v4();
    }
    const object = getTimelineObject(simulatorId, missionId);
    object.addTimelineStep({ timelineStepId, name, description });
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
    cb(timelineStepId);
  }
);
App.on("removeTimelineStep", ({ simulatorId, missionId, timelineStepId }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.removeTimelineStep(timelineStepId);
  pubsub.publish("missionsUpdate", App.missions);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("duplicateTimelineStep", ({ missionId, timelineStepId }) => {
  const object = getTimelineObject(null, missionId);
  object.duplicateTimelineStep(timelineStepId);
  pubsub.publish("missionsUpdate", App.missions);
});
App.on(
  "reorderTimelineStep",
  ({ simulatorId, missionId, timelineStepId, order }) => {
    const object = getTimelineObject(simulatorId, missionId);
    object.reorderTimelineStep(timelineStepId, order);
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on(
  "updateTimelineStep",
  ({ simulatorId, missionId, timelineStepId, name, description }) => {
    const object = getTimelineObject(simulatorId, missionId);
    object.updateTimelineStep(timelineStepId, { name, description });
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on(
  "addTimelineItemToTimelineStep",
  ({
    simulatorId,
    missionId,
    timelineStepId,
    timelineItemId = uuid.v4(),
    timelineItem
  }) => {
    const object = getTimelineObject(simulatorId, missionId);
    object.addTimelineStepItem(timelineStepId, timelineItemId, timelineItem);
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on(
  "removeTimelineStepItem",
  ({ simulatorId, missionId, timelineStepId, timelineItemId }) => {
    const object = getTimelineObject(simulatorId, missionId);
    object.removeTimelineStepItem(timelineStepId, timelineItemId);
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on(
  "updateTimelineStepItem",
  ({
    simulatorId,
    missionId,
    timelineStepId,
    timelineItemId,
    updateTimelineItem
  }) => {
    const object = getTimelineObject(simulatorId, missionId);
    object.updateTimelineStepItem(
      timelineStepId,
      timelineItemId,
      updateTimelineItem
    );
    pubsub.publish("missionsUpdate", App.missions);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
