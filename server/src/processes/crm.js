import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import SimplexNoise from "simplex-noise";

const noise = new SimplexNoise(Math.random);
let tick = 0;
const interval = 1000 / 20;
function crmContactMove() {
  tick++;
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators
        .map(s => App.simulators.find(ss => ss.id === s))
        .forEach((simulator, i) => {
          const crm = App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "Crm"
          );
          if (!crm) return;
          crm.interval = interval;
          crm.enemies.forEach((e, ii) => {
            // e.velocity = {
            //   x: Math.max(
            //     e.maxVelocity * -1,
            //     Math.min(
            //       e.maxVelocity,
            //       noise.noise2D(1, tick * 0.05) * e.maxVelocity
            //     )
            //   ),
            //   y: Math.max(
            //     e.maxVelocity * -1,
            //     Math.min(
            //       e.maxVelocity,
            //       noise.noise2D(2, tick * 0.05) * e.maxVelocity
            //     )
            //   ),
            //   z: Math.max(
            //     e.maxVelocity * -1,
            //     Math.min(
            //       e.maxVelocity,
            //       noise.noise2D(3, tick * 0.05) * e.maxVelocity
            //     )
            //   )
            // };

            e.position = {
              x: Math.min(
                1000,
                Math.max(
                  -1000,
                  noise.noise2D(1 + (i + 1) * ii, tick * 0.0001 * interval) *
                    1000
                )
              ),
              y: Math.min(
                1000,
                Math.max(
                  -1000,
                  noise.noise2D(2 + (i + 1) * ii, tick * 0.0001 * interval) *
                    1000
                )
              ),
              z: Math.min(
                1000,
                Math.max(
                  -1000,
                  noise.noise2D(3 + (i + 1) * ii, tick * 0.0001 * interval) *
                    1000
                )
              )
            };
          });
          pubsub.publish("crmUpdate", crm);
        });
    });
  setTimeout(crmContactMove, interval);
}

crmContactMove();
