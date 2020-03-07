import * as React from "react";
import {useFrame, useThree} from "react-three-fiber";
import {OrthographicCamera} from "three";

interface CameraProps {}
const Camera: React.FC<CameraProps> = props => {
  const ref = React.useRef(new OrthographicCamera(0, 0, 0, 0, 0, 0));
  const {setDefaultCamera, gl} = useThree();
  const frustumSize = 10;
  const {width, height} = gl.domElement;
  const aspect = width / height;
  // Make the camera known to the system
  React.useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera]);
  React.useEffect(
    () => void ref.current.position.set(0, 0, 1 / 0.0000000001),
    [],
  );
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
        0,
        100000000000,
      ]}
      zoom={1}
      {...props}
    />
  );
};

export default Camera;
