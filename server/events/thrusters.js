import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("rotationUpdate", ({ id, rotation, on }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateRotation(rotation, on);
});
App.on("rotationSet", ({ id, rotation }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setRotation(rotation);
  pubsub.publish("rotationChange", sys);
});
App.on("directionUpdate", ({ id, direction }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateDirection(direction);
  pubsub.publish("rotationChange", sys);
});
App.on("requiredRotationSet", ({ id, rotation }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateRequired(rotation);
  pubsub.publish("rotationChange", sys);
});
