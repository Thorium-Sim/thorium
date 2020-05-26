import {PerspectiveCamera} from "three";

const NEAR = 1;
const FAR = 1e27;

let camera: PerspectiveCamera;
function getPerspectiveCamera(dimensions?: DOMRect) {
  if (camera) return camera;
  if (!dimensions)
    throw new Error("Camera has not been initialized, and requires dimensions");

  camera = new PerspectiveCamera(
    75,
    dimensions.width / dimensions.height,
    NEAR,
    FAR,
  );
  camera.position.set(0, 0, 5);
  return camera;
}
export default getPerspectiveCamera;
