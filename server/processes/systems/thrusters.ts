import {Entity} from "../../classes/universe/entity";

function unitVelocity(v: number, a: number, slowing: boolean, max: number) {
  const rawVelocity = !slowing || Math.sign(v + a) === Math.sign(v) ? v + a : 0;
  // If they are already going faster than the max, don't limit them.
  const maxSpeed = Math.abs(max) < Math.abs(v) ? Math.abs(v) : max;
  return Math.max(-1 * maxSpeed, Math.min(maxSpeed, rawVelocity));
}
export function thrusters(entity: Entity, delta: number) {
  const deltaS = delta / 1000;
  if (!entity.location || !entity.thrusters) return false;

  const {
    direction,
    movementSpeed,
    rotationDelta,
    rotationSpeed,
    velocity,
    rotationVelocity,
  } = entity.thrusters;

  const acceleration = {
    x: direction.x * movementSpeed * 5 * deltaS,
    y: direction.y * movementSpeed * 5 * deltaS,
    z: direction.z * movementSpeed * 5 * deltaS,
  };

  let slowing = {x: false, y: false, z: false};

  if (Math.abs(acceleration.x) === 0) {
    slowing.x = true;
    // Apply an acceleration opposite to the current velocity
    acceleration.x = Math.sign(velocity.x) * -10 * deltaS;
  }
  if (Math.abs(acceleration.y) === 0) {
    slowing.y = true;
    acceleration.y = Math.sign(velocity.y) * -10 * deltaS;
  }
  if (Math.abs(acceleration.z) === 0) {
    slowing.z = true;
    acceleration.z = Math.sign(velocity.z) * -10 * deltaS;
  }

  // If we cross 0 while slowing, set the velocity to 0
  // If we cross 0 while slowing, set the velocity to 0
  velocity.x = unitVelocity(
    velocity.x,
    acceleration.x,
    slowing.x,
    movementSpeed * Math.abs(direction.x),
  );
  velocity.y = unitVelocity(
    velocity.y,
    acceleration.y,
    slowing.y,
    movementSpeed * Math.abs(direction.y),
  );
  velocity.z = unitVelocity(
    velocity.z,
    acceleration.z,
    slowing.z,
    movementSpeed * Math.abs(direction.z),
  );

  // Do all the same things with rotation.
  const rotationAcceleration = {
    x: rotationDelta.x * rotationSpeed * deltaS,
    y: rotationDelta.y * rotationSpeed * deltaS,
    z: rotationDelta.z * rotationSpeed * deltaS,
  };

  let slowingRotation = {x: false, y: false, z: false};

  if (Math.abs(rotationAcceleration.x) === 0) {
    slowingRotation.x = true;
    // Apply an acceleration opposite to the current velocity
    rotationAcceleration.x = Math.sign(rotationVelocity.x) * -10 * deltaS;
  }
  if (Math.abs(rotationAcceleration.y) === 0) {
    slowingRotation.y = true;
    rotationAcceleration.y = Math.sign(rotationVelocity.y) * -10 * deltaS;
  }
  if (Math.abs(rotationAcceleration.z) === 0) {
    slowingRotation.z = true;
    rotationAcceleration.z = Math.sign(rotationVelocity.z) * -10 * deltaS;
  }

  // If we cross 0 while slowing, set the velocity to 0
  rotationVelocity.x = unitVelocity(
    rotationVelocity.x,
    rotationAcceleration.x,
    slowingRotation.x,
    rotationSpeed * Math.abs(rotationDelta.x),
  );
  rotationVelocity.y = unitVelocity(
    rotationVelocity.y,
    rotationAcceleration.y,
    slowingRotation.y,
    rotationSpeed * Math.abs(rotationDelta.y),
  );
  rotationVelocity.z = unitVelocity(
    rotationVelocity.z,
    rotationAcceleration.z,
    slowingRotation.z,
    rotationSpeed * Math.abs(rotationDelta.z),
  );

  return false;
}
