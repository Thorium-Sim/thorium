import uuid from "uuid";
import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import Aegis, {
  AegisMode,
  AegisRelayTarget,
  AEGIS_FULL_COVERAGE,
} from "../classes/aegis";

function performAction(id: string, cb: (sys: Aegis) => void) {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) {
    return;
  }
  cb(sys);
  pubsub.publish("aegisUpdate", sys);
}

function findAegis(simulatorId: string): Aegis | undefined {
  return App.systems.find(
    s => s.simulatorId === simulatorId && s.class === "Aegis",
  );
}

function publishPing(
  simulatorId: string,
  pingType: string,
  strength: number,
  bearing: number | null = null,
) {
  pubsub.publish("aegisPing", {
    id: uuid.v4(),
    simulatorId,
    pingType,
    strength,
    bearing,
  });
}

// How much a deployed relay swarm amplifies the given kind of signal
function relayBoost(aegis: Aegis | undefined, kind: AegisRelayTarget) {
  if (!aegis || !aegis.deployed || aegis.mode !== "relay") {
    return 0;
  }
  const allocation =
    aegis.relayTarget === kind ? 1 : aegis.relayTarget === "balanced" ? 0.5 : 0;
  return allocation * Math.min(1, aegis.droneCount / AEGIS_FULL_COVERAGE);
}

App.on("aegisSetMode", ({id, mode}: {id: string; mode: AegisMode}) => {
  performAction(id, sys => sys.setMode(mode));
});
App.on("aegisDeploy", ({id}: {id: string}) => {
  performAction(id, sys => {
    if (sys.damage.damaged) {
      return;
    }
    sys.deploy();
  });
});
App.on("aegisRecall", ({id}: {id: string}) => {
  performAction(id, sys => sys.recall());
});
App.on("aegisStartFabrication", ({id}: {id: string}) => {
  performAction(id, sys => {
    if (sys.damage.damaged) {
      return;
    }
    sys.startFabrication();
  });
});
App.on("aegisStopFabrication", ({id}: {id: string}) => {
  performAction(id, sys => sys.stopFabrication());
});
App.on(
  "aegisPauseFabrication",
  ({id, paused}: {id: string; paused: boolean}) => {
    performAction(id, sys => sys.pauseFabrication(paused));
  },
);
App.on("aegisSetAttrition", ({id, enabled}: {id: string; enabled: boolean}) => {
  performAction(id, sys => sys.setAttrition(enabled));
});
App.on("aegisDestroyDrone", ({id}: {id: string}) => {
  performAction(id, sys => sys.destroyDrone());
});
App.on("aegisSetDroneCount", ({id, count}: {id: string; count: number}) => {
  performAction(id, sys => sys.setDroneCount(count));
});
App.on("aegisSetMaxDrones", ({id, count}: {id: string; count: number}) => {
  performAction(id, sys => sys.setMaxDrones(count));
});
App.on(
  "aegisSetScreenFocus",
  ({id, x, y}: {id: string; x: number; y: number}) => {
    performAction(id, sys => sys.setScreenFocus(x, y));
  },
);
App.on(
  "aegisSetEcmIntensity",
  ({id, intensity}: {id: string; intensity: number}) => {
    performAction(id, sys => sys.setEcmIntensity(intensity));
  },
);
App.on(
  "aegisSetRelayTarget",
  ({id, target}: {id: string; target: AegisRelayTarget}) => {
    performAction(id, sys => sys.setRelayTarget(target));
  },
);
App.on("aegisSetRepairEffort", ({id, effort}: {id: string; effort: number}) => {
  performAction(id, sys => sys.setRepairEffort(effort));
});
App.on(
  "aegisSetStructuralIntegrity",
  ({id, integrity}: {id: string; integrity: number}) => {
    performAction(id, sys => sys.setStructuralIntegrity(integrity));
  },
);
App.on(
  "aegisHitStructure",
  ({id, amount, bearing}: {id: string; amount?: number; bearing?: number}) => {
    performAction(id, sys => {
      const hitAmount = amount ?? 0.05 + Math.random() * 0.1;
      const hitBearing = bearing ?? Math.random() * 360;
      sys.applyStructuralHit(hitAmount, hitBearing);
      publishPing(sys.simulatorId, "impact", hitAmount, hitBearing);
    });
  },
);
App.on("aegisClearLog", ({id}: {id: string}) => {
  performAction(id, sys => sys.clearLog());
});

// --- Cross-system hooks ---
// Ship actions are always visible on the Aegis canvas; a deployed relay
// swarm amplifies them according to its boost target.

// A queued long range message is actually transmitted off the ship
App.on("longRangeMessageSend", ({id}: {id: string}) => {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) {
    return;
  }
  const aegis = findAegis(sys.simulatorId);
  const boost = relayBoost(aegis, "comms");
  publishPing(sys.simulatorId, "comm", 1 + boost);
  if (aegis && boost > 0) {
    aegis.addLog(
      "relay",
      `Relay swarm amplified an outgoing transmission (+${Math.round(
        boost * 100,
      )}% signal strength).`,
    );
    pubsub.publish("aegisUpdate", aegis);
  }
});

App.on("sensorScanRequest", ({id}: {id: string}) => {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) {
    return;
  }
  const aegis = findAegis(sys.simulatorId);
  const boost = relayBoost(aegis, "sensors");
  publishPing(sys.simulatorId, "scan", 1 + boost);
  if (aegis && boost > 0) {
    aegis.addLog(
      "relay",
      `Relay swarm extended a sensor scan (+${Math.round(
        boost * 100,
      )}% effective range).`,
    );
    pubsub.publish("aegisUpdate", aegis);
  }
});

App.on("pingSensors", ({id}: {id: string}) => {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) {
    return;
  }
  const boost = relayBoost(findAegis(sys.simulatorId), "sensors");
  // Sonar pings fire frequently — show them but don't log amplification
  publishPing(sys.simulatorId, "sonar", 1 + boost);
});
