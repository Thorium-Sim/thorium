import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import throttle from "../helpers/throttle";
import uuid from "uuid";

// const throttles = {};

// const triggerWarning = sys => {
//   if (!throttles[sys.id]) {
//     throttles[sys.id] = throttle(sys => {
//       pubsub.publish("notify", {
//         id: uuid.v4(),
//         simulatorId: sys.simulatorId,
//         type: "Reactor",
//         station: "Core",
//         title: `Dilithium Crystal Stress`,
//         body: "",
//         color: "danger"
//       });
//       App.handleEvent(
//         {
//           simulatorId: sys.simulatorId,
//           component: "ReactorControlCore",
//           title: `Dilithium Crystal Stress`,
//           body: null,
//           color: "danger"
//         },
//         "addCoreFeed"
//       );
//     }, 10 * 1000);
//   }
//   return throttles[sys.id];
// };

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
          const envLevel = Math.floor(j.power.powerLevels[j.env - 1] / 4);
          ["fore", "aft", "starboard", "port"].forEach(sector => {
            const diff = Math.abs(j.sectors[sector].level - envLevel);
            // Quadratic incrase, linear decrease. Because I'm a meany.
            if (j.sectors[sector].level < envLevel && j.activated)
              j.addSectorOffset(sector, Math.pow(diff, 2) / 100);
            if (j.sectors[sector].level > envLevel)
              j.addSectorOffset(sector, (-1 * diff) / 100);
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
