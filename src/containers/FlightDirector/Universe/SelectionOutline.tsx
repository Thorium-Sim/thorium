import React from "react";

import * as THREE from "three";
import {Line2} from "three/examples/jsm/lines/Line2";
import {LineGeometry} from "three/examples/jsm/lines/LineGeometry";
import {LineMaterial} from "three/examples/jsm/lines/LineMaterial";
import {GeometryUtils} from "three/examples/jsm/utils/GeometryUtils";
import {extend, ReactThreeFiber, useFrame} from "react-three-fiber";
extend({Line2, LineGeometry, LineMaterial});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      lineMaterial: ReactThreeFiber.Object3DNode<
        LineMaterial,
        typeof LineMaterial
      >;
      line2: ReactThreeFiber.Object3DNode<Line2, typeof Line2>;
      lineGeometry: ReactThreeFiber.Object3DNode<
        LineGeometry,
        typeof LineGeometry
      >;
    }
  }
}

export default function SelectionOutline({selected}: {selected: any}) {
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
