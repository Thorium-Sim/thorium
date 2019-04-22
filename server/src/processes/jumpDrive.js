import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import throttle from "../helpers/throttle";
import uuid from "uuid";

const throttles = {};

const triggerWarning = sys => {
  if (!throttles[sys.id]) {
    throttles[sys.id] = throttle(sys => {
      App.handleEvent(
        {
          simulatorId: sys.simulatorId,
          title: `Jump Drive Sector Stress`,
          component: "JumpDriveCore",
          body: null,
          color: "danger"
        },
        "addCoreFeed"
      );
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: sys.simulatorId,
        type: "Jump Drive",
        station: "Core",
        title: `Jump Drive Sector Stress`,
        body: ``,
        color: "danger"
      });
    }, 10 * 1000);
  }
  return throttles[sys.id];
};

const updateJumpdrive = () => {
  //Loop through all of the simulators to isolate the systems
  let sendUpdate = false;
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators
      .map(s => App.simulators.find(sim => sim.id === s))
      .forEach(sim => {
        const simId = sim.id;
        const jumpDrives = App.systems.filter(
          s => s.simulatorId === simId && s.class === "JumpDrive"
        );
        jumpDrives.forEach(j => {
          sendUpdate = true;
          // Increase sectors that are at too low of a power level
          // Decrease sectors that are at too high of a power level
          const envLevel = j.activated
            ? Math.floor(j.power.powerLevels[Math.floor(j.env) - 1] / 4)
            : 0;
          ["fore", "aft", "starboard", "port"].forEach(sector => {
            const diff = Math.abs(j.sectors[sector].level - envLevel);
            // Quadratic incrase, linear decrease. Because I'm a meany.
            if (j.sectors[sector].level < envLevel && j.activated) {
              j.addSectorOffset(sector, Math.pow(diff, 2) / 1000);
            }
            if (j.sectors[sector].level > envLevel) {
              j.addSectorOffset(sector, (-1 * diff) / 100);
            }
            if (j.activated && j.sectors[sector].offset > 0.75) {
              triggerWarning(j)(j);
            }
          });
        });
      });
  });
  if (sendUpdate) {
    pubsub.publish(
      "jumpDriveUpdate",
      App.systems.filter(s => s.class === "JumpDrive")
    );
  }
  setTimeout(updateJumpdrive, 500);
};

updateJumpdrive();
