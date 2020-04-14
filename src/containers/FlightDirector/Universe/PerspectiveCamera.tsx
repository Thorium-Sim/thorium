import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {PerspectiveCamera} from "three";
import OrbitControlsContainer from "../EntityTemplate/OrbitControlsContainer";

interface CameraProps {}
const NEAR = 5;
const FAR = 1e27;
const Camera: React.FC<CameraProps> = () => {
  // 1 micrometer to 100 billion light years in one scene, with 1 unit = 1 meter?  preposterous!  and yet...

  const fov = 45;
  const {setDefaultCamera, gl} = useThree();
  const {width, height} = gl.domElement;
  const aspect = width / height;
  const ref = React.useRef(new PerspectiveCamera(fov, aspect, NEAR, FAR));

  // Make the camera known to the system
  React.useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera]);
  React.useEffect(() => {
    ref.current.up.set(0, 0, 1);
    ref.current.position.set(1000, 1000, 1000);
    ref.current.lookAt(0, 0, 0);
  }, []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  window.thorium.camera = ref;
  return (
    <>
      <OrbitControlsContainer />
      <perspectiveCamera ref={ref} args={[fov, aspect, NEAR, FAR]} />
    </>
  );
};

export default Camera;
