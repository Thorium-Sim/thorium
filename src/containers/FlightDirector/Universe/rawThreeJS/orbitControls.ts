import {OrbitControls} from "containers/FlightDirector/EntityTemplate/OrbitControls";
import {Camera} from "three";

let orbitControls: OrbitControls;

export function getOrbitControls(
  camera: Camera,
  domElement: HTMLDivElement | null,
) {
  if (orbitControls) return orbitControls;
  orbitControls = new OrbitControls(camera, domElement);
  return orbitControls;
}
