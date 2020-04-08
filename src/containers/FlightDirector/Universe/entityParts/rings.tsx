import React from "react";
import {useLoader} from "react-three-fiber";
import * as THREE from "three";
import {whiteImage} from "../whiteImage";

interface RingsProps {
  ringMapAsset: string;
}

const Rings: React.FC<RingsProps> = ({ringMapAsset}) => {
  const rings = useLoader(
    THREE.TextureLoader,
    ringMapAsset ? `/assets${ringMapAsset}` : whiteImage,
  );
  const geo = React.useMemo(() => {
    const geometry = new THREE.RingBufferGeometry(1.5, 3, 32);
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < 2 ? 0 : 1, 1);
    }
    return geometry;
  }, []);
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.7, 0.7, 0.7]} geometry={geo}>
      <meshPhongMaterial
        map={rings}
        color={0xffffff}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        attach="material"
      />
    </mesh>
  );
};

export default Rings;
