import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {Countermeasures} from "../classes";

function processCountermeasures() {
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators.forEach(s => {
        const countermeasures: Countermeasures = App.systems.find(
          sys => sys.simulatorId === s.id && sys.class === "Countermeasures",
        );
        if (!countermeasures) return;

        // Build modules
        Object.entries(countermeasures.slots).forEach(
          ([slot, countermeasure]) => {
            let built = false;

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

        // Determine whether a countermeasure should be activated or not
      });
    });
}
