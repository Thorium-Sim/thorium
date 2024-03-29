import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

const computerCoreCycle = () => {
  // Get running flights
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators.forEach(s => {
        App.systems
          .filter(c => c.class === "ComputerCore" && c.simulatorId === s)
          .forEach(c => {
            const hackers = c.users.filter(u => u.hacker === true).length;
            // Each hacker gives a 10% chance of creating a virus
            if (Math.random() * hackers > 0.9) {
              const virusName = c.createVirus();
              pubsub.publish("notify", {
                id: uuid.v4(),
                simulatorId: c.simulatorId,
                station: "Core",
                type: "Computer Core",
                title: `Computer Core Virus Created`,
                body: virusName,
                color: "info",
              });
              App.handleEvent(
                {
                  simulatorId: c.simulatorId,
                  title: `Computer Core Virus Created`,
                  component: "CompterCoreCore",
                  body: virusName,
                  color: "info",
                },
                "addCoreFeed",
              );
            }
            // Each virii gives a 10% chance of corrupting a file
            if (Math.random() * c.virii.length > 0.9) {
              c.corruptFile(randomFromList(c.files).id);
            }

            // Each corrupted file gives a 10% chance of offline-ing a terminal
            const corrupted = c.files.filter(fi => fi.corrupted === true);
            if (Math.random() * corrupted.length > 0.9) {
              c.updateTerminalStatus(randomFromList(c.terminals).id, "O");
            }
          });
      });
    });
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore"),
  );
  setTimeout(computerCoreCycle, 1000 * 30);
};

computerCoreCycle();
