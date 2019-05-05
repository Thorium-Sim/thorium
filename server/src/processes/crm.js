import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import SimplexNoise from "simplex-noise";
import * as THREE from "three";
import { randomFromList } from "../classes/generic/damageReports/constants";
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
          let triggerUpdate = false;
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

            // Or if they are docked, recharge them
            if (e.docked) {
              // Five minutes for a full repair
              // 2 - Fill both shield and hull to 100
              // 1 - minute
              // 60 - seconds
              // 50 - 1000 ms / 20 fps
              e.repair(2 / (1 * 60 * 50));
              if (tick % 20 === 0) {
                pubsub.publish("crmFighterUpdate", e);
              }
            }
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
              const fragFighter = allFighters.find(f => f.id === t.fighterId);
              t.velocity = f.velocity;
              const strengthKey =
                fragFighter.type === "fighter"
                  ? "fighterStrength"
                  : "enemyStrength";
              f.hit(t.strength * crm[strengthKey]);
              pubsub.publish("crmFighterUpdate", f);

              if (f.destroyed) {
                triggerUpdate = true;
                // Get the fighter that fired it
                fragFighter.frags += 1;
              }
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
                if (!t.destroyed && distance3d(f.position, t.position) < 150) {
                  const strengthKey =
                    f.type === "fighter" ? "fighterStrength" : "enemyStrength";
                  t.hit(f.phaserStrength * crm[strengthKey]);
                  if (tick % 10 === 0) {
                    pubsub.publish("crmFighterUpdate", t);
                  }
                  if (t.destroyed) {
                    f.frags += 1;
                    triggerUpdate = true;
                  }
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
          if (triggerUpdate) pubsub.publish("crmUpdate", crm);
        });
    });
  setTimeout(crmContactMove, interval);
}

function crmEnemyDogfight() {
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

          crm.enemies.forEach(e => {
            // Always raise the shields
            if (e.shieldRaise === false && e.shield > 0) {
              e.setShield(true);
            }
            if (!crm.attacking || e.destroyed) return;
            // Enemies can perform four actions
            // 1. Charge Phasers
            // 2. Load a torpedo
            // 3. (If contact in range) Fire Phasers
            // 4. (If contact in range) Fire Torpedos
            //
            // However, we want to make sure enemies stagger their actions
            // We only have a 1 in 10 chance of performing an action

            if (Math.random() > 0.1) return;

            const actions = [];
            if (e.phaserLevel < 1) actions.push("chargePhasers");
            if (e.torpedoCount > 0 && !e.torpedoLoaded)
              actions.push("loadTorpedo");
            const targets = crm.fighters.filter(
              f =>
                !f.destroyed &&
                !f.docked &&
                distance3d(e.position, f.position) < 100
            );
            if (targets.length > 0) {
              if (e.phaserLevel === 1) actions.push("firePhaser");
              if (e.torpedoLoaded) actions.push("fireTorpedo");
            }
            if (actions.length === 0) return;
            // Choose one of the actions
            const action = randomFromList(actions);

            if (action === "chargePhasers") e.setPhaserCharge(1);
            if (action === "loadTorpedo") e.loadTorpedo();

            const target = randomFromList(targets);
            if (target) {
              if (action === "firePhaser") e.setPhaserTarget(target.id);
              if (action === "fireTorpedo") crm.fireTorpedo(e.id, target.id);
            }
          });
        });
    });
  setTimeout(crmEnemyDogfight, Math.round(Math.random() * 1000) + 500);
}

crmContactMove();
crmEnemyDogfight();
