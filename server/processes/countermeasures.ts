import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {Countermeasures} from "../classes";

let delta = 0;
let time = Date.now();

function processCountermeasures() {
  delta = Date.now() - time;
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators.forEach((id: string) => {
        const countermeasures: Countermeasures = App.systems.find(
          sys => sys.simulatorId === id && sys.class === "Countermeasures",
        );
        if (!countermeasures) return;

        // Build modules
        Object.entries(countermeasures.slots).forEach(
          ([slot, countermeasure]) => {
            let built = false;
            if (!countermeasure) return;
            // Disqualify it if possible
            if (countermeasure.active || !countermeasure.building) return;
            countermeasure.modules.forEach(mod => {
              // If we've already progressed the building of another module,
              // then skip it.
              if (built) return;
              if (mod.buildProgress < 1) {
                // At this build amount, it would build the entire module in 20 seconds
                // A fully loaded countermeasure would be built in a little less than 2 minutes.
                mod.buildProgress = Math.min(1, mod.buildProgress + 0.05);
                built = true;
              }
            });
          },
        );
        // Reduce power on activated countermeasures
        countermeasures.launched.forEach(countermeasure => {
          countermeasure.usePower(delta / (5 * 60 * 1000));
        });

        // At this point, all countermeasure actions should
        // be handled by the Flight Director. Someday, we'll
        // build countermeasures into the universal sandbox
        pubsub.publish("countermeasuresUpdate", countermeasures);
      });
    });
  setTimeout(() => {
    processCountermeasures();
  }, 1000);
}

processCountermeasures();
