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

          // Update the enemy movement
          crm.enemies.forEach((e, ii) => {
            e.velocity = {
              x: Math.min(
                e.maxVelocity,
                Math.max(
                  -e.maxVelocity,
                  noise.noise2D(1 + (i + 1) * ii, tick * 0.00001 * interval) *
                    e.maxVelocity
                )
              ),
              y: Math.min(
                e.maxVelocity,
                Math.max(
                  -e.maxVelocity,
                  noise.noise2D(2 + (i + 1) * ii, tick * 0.00001 * interval) *
                    e.maxVelocity
                )
              ),
              z: Math.min(
                e.maxVelocity,
                Math.max(
                  -e.maxVelocity,
                  noise.noise2D(3 + (i + 1) * ii, tick * 0.00001 * interval) *
                    e.maxVelocity
                )
              )
            };
            e.position = {
              x: Math.min(1000, Math.max(-1000, e.position.x + e.velocity.x)),
              y: Math.min(1000, Math.max(-1000, e.position.y + e.velocity.y)),
              z: Math.min(1000, Math.max(-1000, e.position.z + e.velocity.z))
            };
          });

          // Update the fighter movement
          crm.fighters.forEach(e => {
            // Move based on the velocity.
            e.position = {
              x: Math.min(1000, Math.max(-1000, e.position.x + e.velocity.x)),
              y: Math.min(1000, Math.max(-1000, e.position.y + e.velocity.y)),
              z: Math.min(1000, Math.max(-1000, e.position.z + e.velocity.z))
            };
          });
          pubsub.publish("crmMovementUpdate", crm);
        });
    });
  setTimeout(crmContactMove, interval);
}

crmContactMove();
