// import {Entity} from "../../classes/universe/entity";
// import {Quaternion, Euler, Object3D} from "three";

// const o = new Object3D();
// export function movement(entity: Entity, delta: number) {
//   const deltaS = delta / 1000;
//   if (!entity.location) return false;
//   const {position, rotation, velocity, acceleration} = entity.location;
//   // Velocity and acceleration track directly.
//   velocity.x += acceleration.x * deltaS;
//   velocity.y += acceleration.y * deltaS;
//   velocity.z += acceleration.z * deltaS;

//   // Use THREEJS to do some translation magic.
//   o.rotation.setFromQuaternion(
//     new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w),
//   );
//   o.position.set(position.x, position.y, position.z);
//   o.translateX(velocity.x);
//   o.translateY(velocity.x);
//   o.translateX(velocity.x);
//   quaternion.multiply(angleQuaternion);
//   rotation.x = quaternion.x;
//   rotation.y = quaternion.y;
//   rotation.z = quaternion.z;
//   rotation.w = quaternion.w;

//   return true;
// }
