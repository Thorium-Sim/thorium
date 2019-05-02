import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import SimplexNoise from "simplex-noise";
import * as THREE from "three";
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

          // // Update the enemy movement
          crm.enemies.forEach((e, ii) => {
            e.setVelocity({
              x:
                noise.noise2D(1 + (i + 1) * ii, tick * 0.00001 * interval) *
                e.maxVelocity,
              y:
                noise.noise2D(2 + (i + 1) * ii, tick * 0.00001 * interval) *
                e.maxVelocity,
              z: 0
            });
            e.setPosition({
              x: e.position.x + e.velocity.x,
              y: e.position.y + e.velocity.y,
              z: 0
            });
          });

          // Update the fighter movement
          crm.fighters.forEach(e => {
            const dragScalar = 0.02;
            // Move based on the acceleration.
            const velocity = new THREE.Vector3(
              e.acceleration.x + e.velocity.x,
              e.acceleration.y + e.velocity.y,
              e.acceleration.z + e.velocity.z
            );
            const drag = velocity.clone().multiplyScalar(dragScalar);
            e.setVelocity(velocity.sub(drag));
            e.setPosition({
              x: e.position.x + e.velocity.x,
              y: e.position.y + e.velocity.y,
              z: 0
            });
          });

          const allFighters = crm.fighters.concat(crm.enemies);

          // Update the torpedo movement
          crm.torpedos.forEach(t => {
            // Don't limit the torpedo's position. Let it fly off into the distance.
            t.position = {
              x: t.position.x + t.velocity.x,
              y: t.position.y + t.velocity.y,
              z: t.position.z + t.velocity.z
            };

            // Check collisions
            if (t.destroyed) return;
            const collisions = allFighters.filter(f => {
              return (
                !f.destroyed &&
                t.fighterId !== f.id &&
                distance3d(f.position, t.position) < 5
              );
            });
            if (collisions.length > 0) {
              crm.destroyTorpedo(t.id);
            }
            collisions.forEach(f => {
              t.velocity = f.velocity;
              f.hit(t.strength);
            });

            if (distance3d(t.position, t.startingPosition) > 200) {
              crm.destroyTorpedo(t.id);
            }
          });
          // Phaser damage
          allFighters.forEach(f => {
            if (f.phaserTarget) {
              pubsub.publish("crmFighterUpdate", f);

              if (f.phaserLevel > 0) {
                const t = allFighters.find(e => e.id === f.phaserTarget);
                if (distance3d(f.position, t.position) < 150) {
                  t.hit(f.phaserStrength);
                  f.phaserLevel = Math.max(0, f.phaserLevel - 0.05);
                } else {
                  f.phaserTarget = null;
                }
              } else {
                f.phaserTarget = null;
              }
            }
          });
          pubsub.publish("crmMovementUpdate", crm);
        });
    });
  setTimeout(crmContactMove, interval);
}

crmContactMove();
