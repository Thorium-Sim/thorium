import React from "react";
import {useFrame} from "react-three-fiber";
import {Mesh} from "three";

export default function SelectionOutline({
  selected,
  geometry,
}: {
  selected: any;
  geometry: any;
}) {
  const outline = React.useRef(new Mesh());
  useFrame(() => {
    outline.current.rotation.set(
      selected.current.rotation.x,
      selected.current.rotation.y,
      selected.current.rotation.z,
    );
    outline.current.position.set(
      selected.current.position.x,
      selected.current.position.y,
      selected.current.position.z - 500,
    );
    outline.current.scale.set(
      selected.current.scale.x * 1.1,
      selected.current.scale.y * 1.1,
      selected.current.scale.z * 1.1,
    );
  });
  return (
    <mesh ref={outline} geometry={geometry}>
      <meshBasicMaterial color={0xfea028} attach="material" />
    </mesh>
  );
}
