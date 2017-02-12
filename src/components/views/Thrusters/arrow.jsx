import React from 'react';
import * as THREE from 'three';

const Arrow = (props) => {
  const arrowVertices = [
    new THREE.Vector3(0,0,0.1), //0
    new THREE.Vector3(-0.5,-0.5,0.1), //1
    new THREE.Vector3(-0.5,0.5,0.1), //2
    new THREE.Vector3(-0.5,-0.25,0.1), //3
    new THREE.Vector3(-0.5,0.25,0.1), //4
    new THREE.Vector3(-1,-0.25,0.1), //5
    new THREE.Vector3(-1,0.25,0.1), //6

    new THREE.Vector3(0,0,-0.1), //7
    new THREE.Vector3(-0.5,-0.5,-0.1), //8
    new THREE.Vector3(-0.5,0.5,-0.1), //9
    new THREE.Vector3(-0.5,-0.25,-0.1), //10
    new THREE.Vector3(-0.5,0.25,-0.1), //11
    new THREE.Vector3(-1,-0.25,-0.1), //12
    new THREE.Vector3(-1,0.25,-0.1) //13
    ];
    const arrowFaces = [
    //Top
    new THREE.Face3(2,1,0),
    new THREE.Face3(3,4,5),
    new THREE.Face3(4,6,5),

    //Bottom
    new THREE.Face3(7,8,9),
    new THREE.Face3(12,11,10),
    new THREE.Face3(12,13,11),

    //Back
    new THREE.Face3(13,5,6),
    new THREE.Face3(5,13,12),

    //MidRight
    new THREE.Face3(10,3,5),
    new THREE.Face3(10,5,12),

    //MidLeft
    new THREE.Face3(13,6,11),
    new THREE.Face3(11,6,4),

    //LeftArrowBack
    new THREE.Face3(9,11,2),
    new THREE.Face3(11,4,2),

    //RightArrowBack
    new THREE.Face3(1,3,8),
    new THREE.Face3(10,8,3),

    //LeftArrowFront
    new THREE.Face3(7,2,0),
    new THREE.Face3(7,9,2),

    //RightArrowFront
    new THREE.Face3(0,1,7),
    new THREE.Face3(1,8,7)
    ];

    return (
      <mesh visible={props.visible || false} position={props.position} scale={props.scale} rotation={props.rotation} >
      <geometry 
      vertices={arrowVertices}
      faces={arrowFaces}
      />
      <meshBasicMaterial color={0xff0} opacity={0.01} />
      </mesh>
      );
};

export default Arrow;