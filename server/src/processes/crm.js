import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import SimplexNoise from "simplex-noise";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

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

          // Update the torpedo movement
          crm.torpedos.forEach(t => {
            t.position = {
              x: Math.min(1000, Math.max(-1000, t.position.x + t.velocity.x)),
              y: Math.min(1000, Math.max(-1000, t.position.y + t.velocity.y)),
              z: Math.min(1000, Math.max(-1000, t.position.z + t.velocity.z))
            };

            // Check collisions
            const allFighters = crm.fighters.concat(crm.enemies);
            crm.torpedos.forEach(t => {
              if (t.destroyed) return;
              const collisions = allFighters.filter(f => {
                return distance3d(f.position, t.position) < 10;
              });
              if (collisions.length > 0) {
                crm.destroyTorpedo(t.id);
              }
              collisions.forEach(f => {
                f.hit(t.strength);
              });
            });

            // Phaser damage
            allFighters.forEach(f => {
              if (f.phaserTarget && f.phaserLevel > 0) {
                const t = allFighters.find(e => e.id === f.phaserTarget);
                if (distance3d(f.position, t.position) < 150) {
                  t.hit(f.phaserStrength);
                  f.phaserLevel = Math.max(0, f.phaserLevel - 0.05);
                } else {
                  f.phaserTarget = null;
                }
              }
            });
          });
          pubsub.publish("crmMovementUpdate", crm);
        });
    });
  setTimeout(crmContactMove, interval);
}

crmContactMove();
