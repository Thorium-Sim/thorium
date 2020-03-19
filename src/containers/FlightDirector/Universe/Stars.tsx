import React from "react";
import * as THREE from "three";

const Star: React.FC<{
  i: number;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
}> = ({i, geometry, material}) => {
  const rotation = React.useMemo(() => {
    const rX = Math.random() * 6;
    const rY = Math.random() * 6;
    const rZ = Math.random() & 6;
    return new THREE.Euler(rX, rY, rZ);
  }, []);
  const scale = React.useMemo(() => {
    return new THREE.Vector3(i * 10, i * 10, i * 10);
  }, [i]);

  return (
    <points args={[geometry, material]} scale={scale} rotation={rotation} />
  );
};

const r = 6371;
const Stars: React.FC = () => {
  const starsGeometry = React.useMemo(() => {
    const starsGeometry = [
      new THREE.BufferGeometry(),
      new THREE.BufferGeometry(),
    ];

    var vertices1 = [];
    var vertices2 = [];

    var vertex = new THREE.Vector3();

    for (let i = 0; i < 250; i++) {
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.multiplyScalar(r);

      vertices1.push(vertex.x, vertex.y, vertex.z);
    }

    for (let i = 0; i < 1500; i++) {
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.multiplyScalar(r);

      vertices2.push(vertex.x, vertex.y, vertex.z);
    }

    starsGeometry[0].setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices1, 3),
    );
    starsGeometry[1].setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices2, 3),
    );
    return starsGeometry;
  }, []);

  const starsMaterials = React.useMemo(
    () => [
      new THREE.PointsMaterial({
        color: 0x555555,
        size: 2,
        sizeAttenuation: false,
      }),
      new THREE.PointsMaterial({
        color: 0x555555,
        size: 1,
        sizeAttenuation: false,
      }),
      new THREE.PointsMaterial({
        color: 0x333333,
        size: 2,
        sizeAttenuation: false,
      }),
      new THREE.PointsMaterial({
        color: 0x3a3a3a,
        size: 1,
        sizeAttenuation: false,
      }),
      new THREE.PointsMaterial({
        color: 0x1a1a1a,
        size: 2,
        sizeAttenuation: false,
      }),
      new THREE.PointsMaterial({
        color: 0x1a1a1a,
        size: 1,
        sizeAttenuation: false,
      }),
    ],
    [],
  );

  return (
    <group>
      {Array.from({length: 20}).map((_, index) => {
        const i = index + 10;
        return (
          <Star
            i={i}
            geometry={starsGeometry[i % 2]}
            material={starsMaterials[i % 6]}
          />
        );
      })}
    </group>
  );
};

export default Stars;
