import React from "react";

import * as THREE from "three";
import {Line2, LineGeometry, LineMaterial} from "./Lines";
import {extend, useFrame} from "react-three-fiber";
extend({Line2, LineGeometry, LineMaterial});

export default function SelectionOutline({selected}) {
  const line = React.useRef(new Line2());
  const geometry = React.useMemo(() => {
    var positions = [
      1,
      1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
    ];

    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    return geometry;
  }, []);

  useFrame(() => {
    let box = new THREE.Box3();
    box.setFromObject(selected.current);

    if (box.isEmpty()) return;

    box.getCenter(line.current.position);

    box.getSize(line.current.scale);

    line.current.scale.multiplyScalar(0.5);
  });
  return (
    <line2 geometry={geometry} ref={line}>
      <lineMaterial
        color={new THREE.Color(0xfea028)}
        linewidth={0.002}
        attach="material"
      />
    </line2>
  );
}
