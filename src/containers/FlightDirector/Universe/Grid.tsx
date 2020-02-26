import * as React from "react";
import * as THREE from "three";
import {useFrame} from "react-three-fiber";
import {GridHelper} from "three";

const color1 = new THREE.Color(0xff0000);
const color2 = new THREE.Color(0x888888);

export default function Grid() {
  const ref = React.useRef(new GridHelper(1, 1));
  const frameRef = React.useRef("");
  useFrame(({camera, gl}) => {
    const {width, height} = gl.domElement;
    const {
      zoom,
      position: {x, y},
    } = camera;
    if (`${zoom},${x},${y}` === frameRef.current) return;
    frameRef.current = `${zoom},${x},${y}`;
    const widthSize = Math.ceil(((1 / zoom) * width) / 2) * 2;
    const heightSize = Math.ceil(((1 / zoom) * height) / 2) * 2;

    const step = 2 ** Math.round(Math.log2((1 / zoom) * 64)) || 1;
    const vertices = [];
    let colors: number[] = [];
    const halfWidth = widthSize;
    const halfHeight = heightSize;

    const originX = -1 * Math.round(x / step) * step;
    const originY = -1 * Math.round(y / step) * step;

    for (let i = 0, k = 0; i < halfWidth; i += step) {
      vertices.push(
        i - originX,
        0,
        -halfHeight - y,
        i - originX,
        0,
        halfHeight - y,
      );
      vertices.push(
        -i - originX,
        0,
        -halfHeight - y,
        -i - originX,
        0,
        halfHeight - y,
      );
      vertices.push(
        -halfWidth + x,
        0,
        i + originY,
        halfWidth + x,
        0,
        i + originY,
      );
      vertices.push(
        -halfWidth + x,
        0,
        -i + originY,
        halfWidth + x,
        0,
        -i + originY,
      );

      for (let l = 0; l < 8; l++) {
        let color = color2;
        if (vertices[k] === 0 || vertices[k + 2] === 0) {
          color = color1;
        }
        color.toArray(colors, k);
        k += 3;
      }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    ref.current.geometry = geometry;
  });
  return (
    <gridHelper ref={ref} args={[100, 100]} rotation={[Math.PI / 2, 0, 0]} />
  );
}
