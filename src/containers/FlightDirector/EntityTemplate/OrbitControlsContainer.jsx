import React from "react";
import {extend, useFrame, useThree} from "react-three-fiber";
import {OrbitControls} from "./OrbitControls";

extend({OrbitControls});

export default function OrbitControlsContainer() {
  const {camera, gl} = useThree();
  const controls = React.useRef({reset: () => {}, update: () => {}});
  React.useEffect(() => {
    camera.position.set(0, 0, 3);
    controls.current.reset();
  }, [camera]);
  useFrame(state => {
    controls.current.update();
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableZoom={false}
      enablePan={false}
    />
  );
}
