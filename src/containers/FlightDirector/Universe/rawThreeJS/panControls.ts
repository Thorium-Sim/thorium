import PanControls from "../PanControls";
import {MOUSE, Camera} from "three";

let panControls: PanControls;
export default function getPanControls(
  camera: Camera,
  domElement: HTMLDivElement | null,
) {
  if (panControls) return panControls;
  panControls = new PanControls(camera, domElement);
  panControls.enableRotate = false;
  panControls.screenSpacePanning = true;
  panControls.maxZoom = 5;
  panControls.minZoom = 0.00000001;
  panControls.zoomSpeed = 1;
  panControls.zoom0 = 0.00000001;
  panControls.mouseButtons = {
    MIDDLE: MOUSE.DOLLY,
    LEFT: MOUSE.PAN,
    RIGHT: MOUSE.PAN,
  };
  panControls.update();
  return panControls;
}
