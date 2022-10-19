import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";

function exocompLoop() {
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators.forEach(s => {
        App.exocomps
          .filter(e => e.state !== "idle" && e.simulatorId === s)
          .forEach(e => {
            e.updateCompletion(e.completion + Math.random() * e.difficulty);
            if (e.completion >= 1) {
              const sys = App.systems.find(s => s.id === e.destination);
              e.updateCompletion(0);
              if (e.state === "returning") {
                e.updateState("idle");
              }
              if (e.state === "repairing") {
                e.destination = null;
                e.logs.push({
                  timestamp: Date.now(),
                  message: `Completed repairs on ${
                    sys.displayName || sys.name
                  }.`,
                });
                e.parts = [];
                e.updateState("returning");
              }
              if (e.state === "deploying") {
                // Check to see if the system needs to be repaired
                // Check to make sure it has the right parts
                let tf = false;
                (sys.damage.exocompParts || []).forEach(p => {
                  if (e.parts.indexOf(p) > -1) tf = true;
                });
                if (sys.damage.damaged) {
                  if (tf) {
                    e.parts.forEach(p => {
                      sys.damage.exocompParts = sys.damage.exocompParts.filter(
                        ep => ep !== p,
                      );
                    });
                    e.updateState("repairing");
                  } else {
                    e.logs.push({
                      timestamp: Date.now(),
                      message: `No parts deployed for repair. Need ${sys.damage.exocompParts.join(
                        ", ",
                      )}.`,
                    });
                    e.destination = null;
                    e.updateState("returning");
                  }
                } else {
                  if (e.upgrade) {
                    e.updateState("upgrading");
                  } else {
                    e.logs.push({
                      timestamp: Date.now(),
                      message: `No repairs necessary for ${
                        sys.displayName || sys.name
                      }.`,
                    });
                    e.parts = [];
                    e.updateState("returning");
                  }
                }
              }
            }
          });
      });
    });
  pubsub.publish("exocompsUpdate", App.exocomps);
  setTimeout(exocompLoop, 500);
}

exocompLoop();
