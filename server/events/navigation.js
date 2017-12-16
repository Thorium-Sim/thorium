import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("navCalculateCourse", ({ id, destination }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.calculateCourse(destination);
  App.handleEvent(
    { simulatorId: system.simulatorId, component: "NavigationCore" },
    "addCoreFeed"
  );
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Calculating Course`,
    body: destination,
    color: "info"
  });
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navCancelCalculation", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.cancelCalculation();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Course Calculation Canceled`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navCourseResponse", ({ id, x, y, z }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.courseResponse(x, y, z);
  if (x.indexOf("˚") > -1) {
    // It's a thruster setting - set the required thrusters of the thruster system
    const thrusters = App.systems.find(
      sys => sys.type === "Thrusters" && sys.simulatorId === system.simulatorId
    );
    if (thrusters) {
      thrusters.updateRequired({
        yaw: parseInt(x.replace("˚", ""), 10),
        pitch: parseInt(y.replace("˚", ""), 10),
        roll: parseInt(z.replace("˚", ""), 10)
      });
      pubsub.publish("rotationChange", thrusters);
    }
  }
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navCourseEntry", ({ id, x, y, z }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.courseEntry(x, y, z);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Course Entered`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navToggleCalculate", ({ id, which }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.toggleCalculate(which);
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navSetDestinations", ({ id, destinations }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setDestinations(destinations);
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navSetDestination", ({ id, destination }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setDestination(destination);
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navSetScanning", ({ id, scanning }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setScanning(scanning);
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navSetPresets", ({ id, presets, simulatorId }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId && sys.type === "Navigation")
  );
  system.setPresets(presets);
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
