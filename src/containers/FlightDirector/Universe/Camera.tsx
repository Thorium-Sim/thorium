import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {OrthographicCamera} from "three";

interface CameraProps {}
const Camera: React.FC<CameraProps> = props => {
  const ref = React.useRef(new OrthographicCamera(0, 0, 0, 0, 0, 0));
  const {setDefaultCamera, gl} = useThree();
  const frustumSize = 1000000;
  const {width, height} = gl.domElement;
  const aspect = width / height;
  // Make the camera known to the system
  React.useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera]);
  React.useEffect(() => void ref.current.position.set(0, 0, 100000), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());

  return (
    <orthographicCamera
      ref={ref}
      args={[
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        -frustumSize,
        frustumSize,
      ]}
      zoom={1}
      {...props}
    />
  );
};

export default Camera;
