import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";

const updateHelium = () => {
  //Loop through all of the simulators to isolate the systems
  let sendUpdate = false;
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators
        .map(s => App.simulators.find(sim => sim.id === s))
        .forEach(sim => {
          const {helium, heliumRate, showHelium} = sim.ship;
          if (!showHelium) return;
          sendUpdate = true;
          const heliumChange = heliumRate / 60;
          sim.ship.helium = Math.min(1, Math.max(0, helium + heliumChange));
        });
    });
  if (sendUpdate) {
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
  setTimeout(updateHelium, 1000);
};

updateHelium();
