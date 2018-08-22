import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const interval = 1000;

const selfDestructCountdown = () => {
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators
      .map(s => App.simulators.find(sim => sim.id === s))
      .forEach(s => {
        if (
          typeof s.ship.selfDestructTime === "number" &&
          s.ship.selfDestructTime > 0
        ) {
          s.setSelfDestructTime(s.ship.selfDestructTime - interval);
          if (s.ship.selfDestructTime <= 0 && s.ship.selfDestructAuto) {
            // Get all the clients on this simulator
            App.clients.forEach(c => {
              if (c.simulatorId === s.id) {
                c.setOfflineState("blackout");
              }
            });
            pubsub.publish("clientChanged", App.clients);
          }
          pubsub.publish("simulatorsUpdate", [s]);
        } else {
          s.setSelfDestructTime(null);
        }
      });
  });
  setTimeout(selfDestructCountdown, interval);
};

selfDestructCountdown();
