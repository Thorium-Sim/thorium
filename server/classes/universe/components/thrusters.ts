import {registerComponent} from "../component";
import {immerable} from "immer";
import {Coordinates} from "./location";

export class Thrusters {
  [immerable] = true;
  static class = "Thrusters";
  class = "Thrusters";
  direction: Coordinates;
  rotationDelta: Coordinates;
  rotationSpeed: number;
  movementSpeed: number;

  constructor({
    direction = {x: 0, y: 0, z: 0},
    rotationDelta = {x: 0, y: 0, z: 0},
    rotationSpeed = 3,
    movementSpeed = 3,
  }) {
    this.direction = new Coordinates(direction);
    this.rotationDelta = new Coordinates(rotationDelta);
    this.rotationSpeed = rotationSpeed;
    this.movementSpeed = movementSpeed;
  }
  get thrusting() {
    return (
      this.direction.x ||
      this.direction.y ||
      this.direction.z ||
      this.rotationDelta.x ||
      this.rotationDelta.y ||
      this.rotationDelta.z
    );
  }
}

registerComponent(Thrusters);
