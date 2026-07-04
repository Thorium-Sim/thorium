import App from "../app";
import * as THREE from "three";
import {pubsub} from "../helpers/subscriptionManager";
import {clampItemPosition} from "../helpers/tacticalBounds";

const interval = 1000 / 5;
let lastTime = Date.now();
const moveContact = (dest, loc, speed, frozen, i) => {
  if (speed > 100) return dest;
  if (speed === 0 || frozen) return loc;
  // if (distance3d(dest, loc) < 0.01) {
  //   speed = distance3d(dest, loc) * speed;
  // }
  const locVec = new THREE.Vector3(loc.x, loc.y, loc.z);
  const destVec = new THREE.Vector3(dest.x, dest.y, dest.z);
  const v = destVec.sub(locVec).normalize().multiplyScalar(speed);
  const newLoc = {
    x: loc.x + v.x / (10000 / i),
    y: loc.y + v.y / (10000 / i),
    z: loc.z + v.z / (10000 / i),
  };
  if (
    (loc.x > dest.x && dest.x > newLoc.x) ||
    (loc.x < dest.x && dest.x < newLoc.x)
  )
    newLoc.x = dest.x;
  if (
    (loc.y > dest.y && dest.y > newLoc.y) ||
    (loc.y < dest.y && dest.y < newLoc.y)
  )
    newLoc.y = dest.y;
  if (
    (loc.z > dest.z && dest.z > newLoc.z) ||
    (loc.z < dest.z && dest.z < newLoc.z)
  )
    newLoc.z = dest.z;
  return newLoc;
};

const moveTacticalMap = () => {
  const delta = Date.now() - lastTime;
  lastTime = Date.now();
  App.tacticalMaps.forEach(m => {
    m.layers.forEach(l => {
      l.items.forEach(i => {
        let location = moveContact(
          i.destination,
          i.location,
          i.speed,
          m.frozen,
          delta,
        );
        // Authoritative backstop: never let the animated location settle
        // off screen when the contact is constrained. Also pull a (possibly
        // newly-constrained) destination back on screen so the persisted value
        // converges instead of drifting.
        if (i.keepOnScreen) {
          location = clampItemPosition(i, location);
          const destination = clampItemPosition(i, i.destination);
          if (
            destination.x !== i.destination.x ||
            destination.y !== i.destination.y
          ) {
            i.update({destination});
          }
        }
        i.update({location});
      });
    });
    m.interval = interval;
    pubsub.publish("tacticalMapUpdate", m);
  });
  setTimeout(moveTacticalMap, interval);
};

moveTacticalMap();
