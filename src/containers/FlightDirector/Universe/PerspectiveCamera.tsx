import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {PerspectiveCamera} from "three";
import PanControls from "./PanControlsContainer";

interface CameraProps {
  recenter: any;
}
const Camera: React.FC<CameraProps> = ({recenter}) => {
  const fov = 45;
  const {setDefaultCamera, gl} = useThree();
  const {width, height} = gl.domElement;
  const aspect = width / height;
  const ref = React.useRef(
    new PerspectiveCamera(fov, aspect, 0.001, 100000000000),
  );

  // Make the camera known to the system
  React.useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera]);
  React.useEffect(() => void ref.current.position.set(3, 3, 3), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());

  return (
    <>
      <PanControls recenter={recenter} />
      <perspectiveCamera ref={ref} args={[fov, aspect, 0.001, 100000000000]} />
    </>
  );
};

export default Camera;
