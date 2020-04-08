import {Entity} from "../../classes/universe/entity";
import {Quaternion, Euler} from "three";

export function rotation(entity: Entity, delta: number) {
  const deltaS = delta / 1000;
  if (!entity.location) return false;
  const {rotation, rotationAcceleration, rotationVelocity} = entity.location;
  // Velocity and acceleration track directly.
  rotationVelocity.x += rotationAcceleration.x * deltaS;
  rotationVelocity.y += rotationAcceleration.y * deltaS;
  rotationVelocity.z += rotationAcceleration.z * deltaS;

  // Use THREEJS to do some quaternion magic.
  const angleQuaternion = new Quaternion().setFromEuler(
    new Euler(
      (rotationVelocity.x + (entity.thrusters?.rotationVelocity.x || 0)) *
        deltaS,
      (rotationVelocity.y + (entity.thrusters?.rotationVelocity.y || 0)) *
        deltaS,
      (rotationVelocity.z + (entity.thrusters?.rotationVelocity.z || 0)) *
        deltaS,
    ),
  );

  const quaternion = new Quaternion(
    rotation.x,
    rotation.y,
    rotation.z,
    rotation.w,
  );
  quaternion.multiply(angleQuaternion);
  rotation.x = quaternion.x;
  rotation.y = quaternion.y;
  rotation.z = quaternion.z;
  rotation.w = quaternion.w;

  return true;
}
