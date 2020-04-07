import {Entity} from "../../classes/universe/entity";

const c = 1.998e8;

export function engines(entity: Entity, delta: number) {
  const deltaS = delta / 1000;
  if (!entity.location || (!entity.enginesWarp && !entity.enginesImpulse))
    return false;

  // Impulse engine speed is logarithmic.
  //
  const minP = 0;
  const maxP = entity.enginesImpulse.maxSpeed;

  const minV = 1;
  const maxV = Math.log((entity.enginesImpulse.maxSpeed * c) / 500);

  // calculate adjustment factor
  const logScale = (maxV - minV) / (maxP - minP);
  function logSlider(value: number) {
    return Math.exp(minV + logScale * (value - minP));
  }

  const logSpeed =
    Math.round(
      (logSlider(entity.enginesImpulse.currentSpeed) - Math.E) * 1000,
    ) / 1000;

  let impulseAcceleration =
    (entity.enginesImpulse.velocity + entity.enginesImpulse.currentSpeed) *
    deltaS;
  if (
    entity.enginesImpulse.currentSpeed === 0 &&
    entity.enginesImpulse.velocity > 0
  ) {
    impulseAcceleration =
      -1 * (entity.enginesImpulse.velocity * 2 + 1000) * deltaS;
  } else if (logSpeed < entity.enginesImpulse.velocity) {
    impulseAcceleration = ((-1 * entity.enginesImpulse.velocity) / 2) * deltaS;
  }

  const maxSpeed =
    logSpeed < entity.enginesImpulse.velocity
      ? entity.enginesImpulse.velocity
      : logSpeed;
  entity.enginesImpulse.velocity = Math.min(
    maxSpeed,
    Math.max(0, entity.enginesImpulse.velocity + impulseAcceleration),
  );

  // let warpAcceleration = (entity.enginesWarp.speed / 5) * deltaS;
  // if (entity.enginesWarp.speed === 0 && entity.enginesWarp.velocity > 0)
  //   warpAcceleration = ((-1 * entity.enginesWarp.maxSpeed) / 5) * deltaS;
  // entity.enginesWarp.velocity = Math.max(
  //   0,
  //   entity.enginesWarp.velocity + warpAcceleration,
  // );

  return false;
}
