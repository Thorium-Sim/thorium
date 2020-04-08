import * as React from "react";
import {useFrame} from "react-three-fiber";
import * as THREE from "three";

export default function BackPlane({
  setSelected,
}: {
  setSelected: (state: any) => void;
}) {
  const planeRef = React.useRef(new THREE.Mesh());
  useFrame(({camera, viewport}) => {
    const {zoom, position} = camera;
    const {width, height} = viewport;
    const widthSize = Math.ceil(((1 / zoom) * width) / 2) * 2;
    const heightSize = Math.ceil(((1 / zoom) * height) / 2) * 2;
    const max = Math.max(widthSize, heightSize);
    planeRef.current.scale.set(max, max, max);
    planeRef.current.position.set(position.x, position.y, -1000);
  });
  return (
    <mesh
      ref={planeRef}
      position={[0, 0, -1000]}
      onPointerDown={e => {
        setSelected([]);
      }}
      onPointerUp={e => {}}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={0x000000}
        transparent
        opacity={0}
      />
    </mesh>
  );
}
