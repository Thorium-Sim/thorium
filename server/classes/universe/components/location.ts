import {registerComponent} from "../component";

export class Coordinates {
  x: number;
  y: number;
  z: number;
  constructor({x, y, z} = {x: null, y: null, z: null}) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
  }
}
export class Quaternion extends Coordinates {
  w: number;
  constructor({w, ...rest} = {x: null, y: null, z: null, w: null}) {
    super(rest);
    this.w = w ?? 0;
  }
}
export class Location {
  position: Coordinates;
  velocity: Coordinates;
  acceleration: Coordinates;
  rotation: Quaternion;
  rotationVelocity: Coordinates;
  rotationAcceleration: Coordinates;
  constructor({
    position,
    velocity,
    acceleration,
    rotation,
    rotationVelocity,
    rotationAcceleration,
  }) {
    this.position = new Coordinates(position);
    this.velocity = new Coordinates(velocity);
    this.acceleration = new Coordinates(acceleration);
    this.rotation = new Quaternion(rotation);
    this.rotationVelocity = new Coordinates(rotationVelocity);
    this.rotationAcceleration = new Coordinates(rotationAcceleration);
  }
}

registerComponent(Location);
