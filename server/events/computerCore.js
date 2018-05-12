import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore")
  );
}

App.on("addComputerCoreUser", ({ id, user }) => {
  performAction(id, sys => {
    sys.addUser(user);
  });
});

App.on("removeComputerCoreUser", ({ id, userId }) => {
  performAction(id, sys => sys.removeUser(userId));
});

App.on("restoreComputerCoreFile", ({ id, fileId, level, all }) => {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    if (fileId) {
      sys.restoreFile(id);
    }
    if (all) {
      sys.files.forEach(f => sys.restoreFile(f.id));
    }
    if (level) {
      files.filter(f => f.level === level).forEach((f, i) =>
        setTimeout(() => {
          sys.restoreFile(f.id);
          pubsub.publish(
            "computerCoreUpdate",
            App.systems.filter(s => s.class === "ComputerCore")
          );
        }, 500 * i)
      );
    }
  }
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore")
  );
});

App.on("deleteComputerCoreVirus", ({ id, virusId }) => {
  performAction(id, sys => sys.removeVirus(virusId));
});

App.on("restartComputerCoreTerminal", ({ id, terminalId }) => {
  performAction(id, sys => {
    sys.updateTerminalStatus(terminalId, "R");
    setTimeout(() => {
      sys.updateTerminalStatus(terminalId, "F");
      pubsub.publish(
        "computerCoreUpdate",
        App.systems.filter(s => s.class === "ComputerCore")
      );
    }, Math.round(Math.random() * 5 + 2) * 1000);
  });
});
