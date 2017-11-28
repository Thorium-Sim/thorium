import App from "../app";
import * as THREE from "three";

const interval = 30;

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const moveContact = (dest, loc, speed, frozen, i) => {
  if (speed > 100) return dest;
  if (speed === 0 || frozen) return loc;
  if (distance3d(dest, loc) < 0.005) {
    return dest;
  }
  const locVec = new THREE.Vector3(loc.x, loc.y, loc.z);
  const destVec = new THREE.Vector3(dest.x, dest.y, dest.z);
  const v = destVec
    .sub(locVec)
    .normalize()
    .multiplyScalar(speed);
  const newLoc = {
    x: loc.x + Math.round(v.x / (10000 / i) * 10000) / 10000,
    y: loc.y + Math.round(v.y / (10000 / i) * 10000) / 10000,
    z: loc.z + Math.round(v.z / (10000 / i) * 10000) / 10000
  };
  return newLoc;
};

const moveTacticalMap = () => {
  App.tacticalMaps.forEach(m => {
    m.layers.forEach(l => {
      l.items.forEach(i => {
        i.update({
          location: moveContact(
            i.destination,
            i.location,
            i.speed,
            m.frozen,
            interval
          )
        });
      });
    });
  });
  setTimeout(moveTacticalMap, interval);
};

moveTacticalMap();
