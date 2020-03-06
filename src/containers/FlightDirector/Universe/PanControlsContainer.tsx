import * as React from "react";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ReactThreeFiber, extend, useFrame, useThree} from "react-three-fiber";
import PanControls from "./PanControls";
import {CanvasContext} from "./CanvasContext";
import {Camera, Renderer, MOUSE} from "three";
extend({PanControls});

interface PanControlsInterface {
  enabled: boolean;
  args: [Camera, Renderer];
  enableRotate: boolean;
  screenSpacePanning: boolean;
  maxZoom: number;
  minZoom: number;
  zoomSpeed: number;
  mouseButtons: {MIDDLE: MOUSE; LEFT: MOUSE; RIGHT: MOUSE};
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      panControls: ReactThreeFiber.Object3DNode<
        PanControlsInterface,
        typeof PanControls
      >;
    }
  }
}

export default function PanControlsContainer({recenter}: {recenter: {}}) {
  const [context] = React.useContext(CanvasContext);
  const {camera, gl} = useThree();
  const controls = React.useRef({reset: () => {}, update: () => {}});
  React.useEffect(() => {
    camera.position.set(0, 0, 1 / 0.0000000001);
    controls.current.reset();
  }, [recenter, camera]);
  useFrame(state => {
    controls.current.update();
  });
  return (
    <panControls
      ref={controls}
      enabled={!context.dragging}
      args={[camera, gl.domElement]}
      enableRotate={false}
      screenSpacePanning={true}
      maxZoom={1}
      minZoom={0.00000001}
      zoomSpeed={1}
      mouseButtons={{
        MIDDLE: THREE.MOUSE.DOLLY,
        LEFT: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.PAN,
      }}
    />
  );
}
