import * as React from "react";

export default function BackPlane({
  setSelected,
}: {
  setSelected: (state: any) => void;
}) {
  const planeRef = React.useRef();
  return (
    <mesh
      ref={planeRef}
      position={[0, 0, -1000]}
      onPointerDown={e => {
        setSelected([]);
      }}
      onPointerUp={e => {}}
    >
      <planeBufferGeometry attach="geometry" args={[10000000, 10000000, 1]} />
      <meshStandardMaterial attach="material" color={0x000000} />
    </mesh>
  );
}
