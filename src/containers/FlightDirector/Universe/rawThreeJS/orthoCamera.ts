import {OrthographicCamera} from "three";

const NEAR = 1;
const FAR = 100000000000;
const frustumSize = 10;

let camera: OrthographicCamera;
function getOrthoCamera(dimensions?: DOMRect) {
  if (camera) return camera;
  if (!dimensions)
    throw new Error("Camera has not been initialized, and requires dimensions");

  const {width, height} = dimensions;
  const aspect = width / height;
  camera = new OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    NEAR,
    FAR,
  );
  camera.position.set(0, 0, 1 / 0.00000001);
  camera.zoom = 0.00000001;
  camera.updateProjectionMatrix();
  return camera;
}
export default getOrthoCamera;
