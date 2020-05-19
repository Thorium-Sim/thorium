import * as React from "react";
import {useLoader} from "react-three-fiber";
import {Scene, Mesh, Color, FrontSide} from "three";
import GLTFLoader from "./GLTFLoader";

import {whiteImage} from "./whiteImage";

interface EntityModelProps {
  modelAsset: string;
  scale?: number;
}
const EntityModel: React.FC<EntityModelProps> = React.memo(({modelAsset}) => {
  const model: any = useLoader(
    // @ts-ignore ts(2345)
    GLTFLoader,
    modelAsset ? `/assets${modelAsset}` : whiteImage,
  );
  const scene = React.useMemo(() => {
    const scene: Scene = model.scene.clone(true);
    if (scene.traverse) {
      scene.traverse(function (object) {
        if (object instanceof Mesh) {
          const material = object.material as any;
          material.emissiveMap = material.map;
          material.emissiveIntensity = 1;
          material.emissive = new Color(0xffffff);
          material.side = FrontSide;
        }
      });
    }

    return scene;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelAsset]);

  const scale = 2;
  return (
    <>
      <primitive scale={[scale, scale, scale]} object={scene} />
    </>
  );
});

export default EntityModel;
