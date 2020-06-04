import {PerspectiveCamera, OrthographicCamera} from "three";

export type RenderState = {
  camera: PerspectiveCamera | OrthographicCamera;
  delta: number;
  currentStage: string;
};
