import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

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
  performAction(id, sys => sys.setActivated(activated));
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
