import {FlyControls} from "../FlyControls";
import {Camera} from "three";
let flyControls: FlyControls;

export default function getFlyControls(
  camera: Camera,
  domElement: HTMLDivElement | null,
) {
  if (flyControls) return flyControls;
  flyControls = new FlyControls(camera, domElement);
  flyControls.movementSpeed = 1000;
  return flyControls;
}
