import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("navCalculateCourse", ({ id, destination }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.calculateCourse(destination);
  if (system.training) {
    setTimeout(() => {
      App.handleEvent(
        { id, x: "123.45", y: "456.78", z: "624.58" },
        "navCourseResponse",
        { clientId: "training", simulatorId: system.simulatorId }
      );
    }, 5000);
  }
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      component: "NavigationCore",
      title: `Calculating Course`,
      body: destination,
      color: "info"
    },
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
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Course Calculation Cancelled`,
      component: "NavigationCore",
      body: null,
      color: "warning"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
App.on("navCourseResponse", ({ id, simulatorId, x, y, z }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId && sys.type === "Navigation")
  );
  if (!system) return;
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
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Course Entered`,
      component: "NavigationCore",
      body: null,
      color: "success"
    },
    "addCoreFeed"
  );
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
App.on("navSetThrusters", ({ id, thrusters }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.thrusters = thrusters;
  pubsub.publish(
    "navigationUpdate",
    App.systems.filter(s => s.type === "Navigation")
  );
});
