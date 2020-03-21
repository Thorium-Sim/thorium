import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {randomFromList} from "../classes/generic/damageReports/constants";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore"),
  );
}

App.on("addComputerCoreUser", ({id, user, cb}) => {
  performAction(id, sys => {
    const newUser = sys.addUser(user);
    cb(newUser);
  });
});

const hackerNames = [
  "PLA Unit 61398",
  "Poodle Corp",
  "Cyber Caliphate",
  "Armada Collective",
  "Fancy Bear",
  "Flying Kitten",
  "Putter Panda",
  "Guccifer 2.0",
  "Phineas Fisher",
  "GammaGroupPR",
  "Lizard Squad",
  "LulzSec",
  "The Shadow Brokers",
  "The Laughing Man",
  "Toxic Fiber",
  "Phreak",
  "Gray Blade",
  "Cyber Hybrid",
  "Private Omicron",
  "Null Shadow",
  "Toxic Proxy",
  "Phillip Q. Nibley",
];

App.on(
  "computerCoreAddHacker",
  ({id, simulatorId, level = Math.round(Math.random() * 9 + 1), cb}) => {
    const computerCore = App.systems.find(
      s => s.class === "ComputerCore" && s.simulatorId === simulatorId,
    );
    if (!computerCore) return;
    computerCore.addUser({
      name: randomFromList(hackerNames),
      level,
      hacker: true,
    });
    pubsub.publish(
      "computerCoreUpdate",
      App.systems.filter(s => s.class === "ComputerCore"),
    );
  },
);

App.on(
  "updateComputerCoreUser",
  ({id, userId, name, password, level, hacker, cb}) => {
    performAction(id, sys => {
      sys.updateUser(userId, {name, password, level, hacker});
      cb && cb();
    });
  },
);
App.on("removeComputerCoreUser", ({id, userId, cb}) => {
  performAction(id, sys => {
    sys.removeUser(userId);
    cb && cb();
  });
});

App.on("restoreComputerCoreFile", ({id, fileId, level, all}) => {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    if (fileId) {
      sys.restoreFile(fileId);
      pubsub.publish(
        "computerCoreUpdate",
        App.systems.filter(s => s.class === "ComputerCore"),
      );

      setTimeout(() => {
        sys.uncorruptFile(fileId);
        pubsub.publish(
          "computerCoreUpdate",
          App.systems.filter(s => s.class === "ComputerCore"),
        );
      }, 4000);
    }
    if (all) {
      sys.files.forEach(f => sys.restoreFile(f.id));
    }
    if (level) {
      sys.files
        .filter(f => f.level === level)
        .forEach((f, i) =>
          setTimeout(() => {
            sys.restoreFile(f.id);
            pubsub.publish(
              "computerCoreUpdate",
              App.systems.filter(s => s.class === "ComputerCore"),
            );
            setTimeout(() => {
              sys.uncorruptFile(f.id);
              pubsub.publish(
                "computerCoreUpdate",
                App.systems.filter(s => s.class === "ComputerCore"),
              );
            }, 4000);
          }, 500 * i),
        );
      // Verify any relevant tasks
      App.tasks
        .filter(
          t =>
            t.simulatorId === sys.simulatorId &&
            t.definition === "Restore All Files",
        )
        .forEach(t => {
          App.handleEvent({taskId: t.id}, "verifyTask");
        });
    }
  }
  pubsub.publish(
    "computerCoreUpdate",
    App.systems.filter(s => s.class === "ComputerCore"),
  );
});

App.on("deleteComputerCoreVirus", ({id, virusId}) => {
  performAction(id, sys => {
    sys.removeVirus(virusId);

    // Verify any tasks this might apply to
    App.tasks
      .filter(
        t =>
          t.simulatorId === sys.simulatorId && t.definition === "Remove Virus",
      )
      .forEach(t => {
        App.handleEvent({taskId: t.id}, "verifyTask");
      });
  });
});

App.on("restartComputerCoreTerminal", ({id, terminalId}) => {
  performAction(id, sys => {
    sys.updateTerminalStatus(terminalId, "R");
    setTimeout(() => {
      sys.updateTerminalStatus(terminalId, "F");
      pubsub.publish(
        "computerCoreUpdate",
        App.systems.filter(s => s.class === "ComputerCore"),
      );
    }, Math.round(Math.random() * 5 + 2) * 1000);
  });
});

App.on("addViriiToComputerCore", ({id}) => {
  performAction(id, sys => sys.createVirus());
});
