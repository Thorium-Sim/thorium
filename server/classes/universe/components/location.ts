import {registerComponent} from "../component";
import {immerable} from "immer";

export class Coordinates {
  [immerable] = true;
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
  [immerable] = true;
  static class = "Location";
  class = "Location";
  position: Coordinates;
  velocity: Coordinates;
  acceleration: Coordinates;
  rotation: Quaternion;
  rotationVelocity: Coordinates;
  rotationAcceleration: Coordinates;
  constructor({
    position = {x: 0, y: 0, z: 0},
    velocity = {x: 0, y: 0, z: 0},
    acceleration = {x: 0, y: 0, z: 0},
    rotation = {x: 0, y: 0, z: 0, w: 0},
    rotationVelocity = {x: 0, y: 0, z: 0},
    rotationAcceleration = {x: 0, y: 0, z: 0},
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
