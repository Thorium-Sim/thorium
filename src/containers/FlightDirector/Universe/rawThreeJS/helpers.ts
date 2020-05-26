import {Quaternion, Matrix4, Vector3, Object3D, WebGLRenderer} from "three";
import globals from "./globals";

const up = new Vector3(0, 1, 0);

export function lookTowards(
  fromObject: Object3D,
  rotSpeed: number = 5,
  toPosition: Vector3,
  dTheta: number,
) {
  dTheta = dTheta * rotSpeed;
  var quat0 = fromObject.quaternion;
  var eye = fromObject.position;
  var center = toPosition;
  if (eye.distanceTo(center) === 0) {
    return false;
  }
  var mat = new Matrix4();
  mat.lookAt(center, eye, up);
  var quat1 = new Quaternion();
  quat1.setFromRotationMatrix(mat);
  var deltaTheta = angleBetweenQuats(quat0, quat1);
  var frac = dTheta / deltaTheta;
  if (frac > 1) frac = 1;
  fromObject.quaternion.slerp(quat1, frac);
}

const q1 = new Quaternion();

function angleBetweenQuats(qBefore: Quaternion, qAfter: Quaternion) {
  q1.copy(qBefore);
  q1.inverse();
  q1.multiply(qAfter);
  var halfTheta = Math.acos(q1.w);
  return 2 * halfTheta;
}

export function* waitFrames(numFrames: number) {
  while (numFrames > 0) {
    --numFrames;
    yield;
  }
}

export function* waitSeconds(duration: number) {
  while (duration > 0) {
    duration -= globals.delta;
    yield;
  }
}

export function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
