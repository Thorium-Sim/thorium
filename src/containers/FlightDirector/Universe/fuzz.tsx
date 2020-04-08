import React from "react";
import {useLoader, useFrame} from "react-three-fiber";
import {TextureLoader, Vector3, Sprite, Frustum, Matrix4} from "three";
import {StoreApi} from "zustand";
import {Entity} from "generated/graphql";

var frustum = new Frustum();
var cameraViewProjectionMatrix = new Matrix4();

const Fuzz: React.FC<{
  storeApi: StoreApi<{
    loading: boolean;
    data: Entity[];
  }>;
}> = ({storeApi}) => {
  const spriteMap = useLoader(TextureLoader, require("./fuzz.png"));
  const spriteRef = React.useRef<Sprite>();
  useFrame(({camera}) => {
    camera.updateMatrix();
    camera.updateMatrixWorld(); // make sure the camera matrix is updated
    cameraViewProjectionMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse,
    );
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);
    const children = spriteRef.current?.children as Sprite[];
    children.forEach(c => {
      if (
        (c.position.x === 0 && c.position.y === 0 && c.position.z === 0) ||
        !frustum.containsPoint(c.position)
      ) {
        const vec = new Vector3(
          Math.random() * 20000 - 10000,
          Math.random() * 20000 - 10000,
          Math.random() * -100000 - 10000,
        );
        vec.applyQuaternion(camera.quaternion);
        c.position.copy(vec.add(camera.position));
      }
      c.material.opacity = Math.min(
        0.6,
        Math.max(0, (c.position.distanceTo(camera.position) - 500) / 1000),
      );
    });
  });
  const scale = 50;
  return (
    <group ref={spriteRef}>
      {Array.from({length: 100}).map((_, i) => (
        <sprite key={`sprite-${i}`} scale={[scale, scale, scale]}>
          <spriteMaterial attach="material" map={spriteMap} />
        </sprite>
      ))}
    </group>
  );
};

export default Fuzz;
