import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("rotationUpdate", ({ id, rotation, on, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateRotation(rotation, on);
  cb && cb();
});
App.on("rotationSet", ({ id, rotation, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setRotation(rotation);
  pubsub.publish("rotationChange", sys);
  cb && cb();
});
App.on("directionUpdate", ({ id, direction, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateDirection(direction);
  pubsub.publish("rotationChange", sys);
  cb && cb();
});
App.on("requiredRotationSet", ({ id, rotation, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateRequired(rotation);
  pubsub.publish("rotationChange", sys);
  cb && cb();
});

App.on("setThrusterRotationSpeed", ({ id, speed, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setRotationSpeed(speed);
  pubsub.publish("rotationChange", sys);
  cb && cb();
});

App.on("setThrusterMovementSpeed", ({ id, speed, cb }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setMovementSpeed(speed);
  pubsub.publish("rotationChange", sys);
  cb && cb();
});
