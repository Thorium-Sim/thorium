import React, {Suspense} from "react";
import {Canvas, useThree} from "react-three-fiber";
import Entity from "containers/FlightDirector/Universe/Entity";
import {MeshTypeEnum} from "generated/graphql";
import OrbitControlsContainer from "containers/FlightDirector/EntityTemplate/OrbitControlsContainer";
import {Color} from "three";

const SceneBackground = () => {
  const {scene} = useThree();
  React.useEffect(() => {
    scene.background = new Color("#666");
  }, [scene.background]);
  return null;
};
const GLTFPreview: React.FC<{src: string}> = ({src}) => {
  return (
    <Canvas
      // gl={{alpha: false}}
      className="gltf-preview"
      style={{height: "100px", width: "100%"}}
      camera={{position: [0, 0, 3]}}
    >
      <SceneBackground />
      <OrbitControlsContainer />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={null}>
        <Entity
          library
          entity={{
            id: "Preview",
            appearance: {
              meshType: MeshTypeEnum.Model,
              modelAsset: src.replace("/assets", ""),
              scale: 1,
            },
          }}
        />
      </Suspense>
    </Canvas>
  );
};

export default GLTFPreview;
