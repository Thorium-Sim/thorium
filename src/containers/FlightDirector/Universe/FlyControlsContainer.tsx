import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ReactThreeFiber, extend, useFrame, useThree} from "react-three-fiber";
import {FlyControls} from "./FlyControls";
extend({FlyControls});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flyControls: ReactThreeFiber.Object3DNode<
        FlyControls,
        typeof FlyControls
      >;
    }
  }
}

export default function FlyControlsContainer({recenter}: {recenter: {}}) {
  const {camera, gl} = useThree();
  const controls = React.useRef({reset: () => {}, update: () => {}});
  React.useEffect(() => {
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
  }, [recenter, camera]);
  useFrame(state => {
    controls.current.update();
  });
  return (
    <flyControls
      ref={controls}
      args={[camera, gl.domElement]}
      // dragToLook={true}
      movementSpeed={1000}
    />
  );
}
