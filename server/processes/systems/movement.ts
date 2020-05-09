import {Entity} from "../../classes/universe/entity";
import {Quaternion, Object3D} from "three";

const o = new Object3D();
export function movement(entity: Entity, delta: number) {
  const deltaS = delta / 1000;
  if (!entity.location) return false;
  const {position, rotation, velocity, acceleration} = entity.location;
  // Velocity and acceleration track directly.
  velocity.x += acceleration.x * deltaS;
  velocity.y += acceleration.y * deltaS;
  velocity.z += acceleration.z * deltaS;

  // Use THREEJS to do some translation magic.
  o.rotation.setFromQuaternion(
    new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w),
  );
  o.position.set(position.x, position.y, position.z);

  if (entity.thrusters?.velocity) {
    o.translateX(entity.thrusters.velocity.x);
    o.translateY(entity.thrusters.velocity.y);
    o.translateZ(entity.thrusters.velocity.z);
  }
  if (entity.enginesWarp?.velocity || entity.enginesImpulse?.velocity) {
    const forwardSpeed =
      (entity.enginesWarp?.velocity || 0) * deltaS +
      (entity.enginesImpulse?.velocity || 0) * deltaS;
    o.translateY(forwardSpeed);
  }

  o.position.setX(o.position.x + velocity.x * deltaS);
  o.position.setY(o.position.y + velocity.y * deltaS);
  o.position.setZ(o.position.z + velocity.z * deltaS);

  position.x = o.position.x;
  position.y = o.position.y;
  position.z = o.position.z;

  return true;
}
