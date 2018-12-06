import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "jumpDriveUpdate",
    App.systems.filter(s => s.class === "JumpDrive")
  );
}

App.on("setJumpdriveActivated", ({ id, activated }) => {
  performAction(id, sys => {
    if (!sys.enabled) return;
    sys.setActivated(activated);
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Jump Drive ${activated ? "Activated" : "Deactivated"}`,
        component: "JumpDriveCore",
        body: null,
        color: "info"
      },
      "addCoreFeed"
    );
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Jump Drive",
      station: "Core",
      title: `Jump Drive ${activated ? "Activated" : "Deactivated"}`,
      body: ``,
      color: "info"
    });
  });
});

App.on("setJumpdriveEnvs", ({ id, envs }) => {
  performAction(id, sys => sys.setEnv(envs));
});

App.on("setJumpdriveSectorLevel", ({ id, sector, level }) => {
  performAction(id, sys => sys.setSectorLevel(sector, level));
});

App.on("setJumpdriveSectorOffset", ({ id, sector, offset }) => {
  performAction(id, sys => sys.setSectorOffset(sector, offset));
});

App.on("fluxJumpdriveSector", ({ id, sector }) => {
  performAction(id, sys => {
    function fluxSectorOffset(s) {
      const newOffset = sys.sectors[s].offset + Math.random() / 10;
      sys.setSectorLevel(s, newOffset);
    }
    if (!sector) {
      ["fore", "aft", "starboard", "port"].forEach(fluxSectorOffset);
    } else {
      fluxSectorOffset(sector);
    }
  });
});
App.on("setJumpDriveEnabled", ({ id, enabled }) => {
  performAction(id, sys => sys.setEnabled(enabled));
});

App.on("hitJumpDriveStress", ({ id, sector }) => {
  performAction(id, sys => sys.hitSectorOffset(sector));
});
