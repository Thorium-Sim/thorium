import React from "react";
import * as THREE from "three";
import {IUniform} from "three";
import {useFrame, useThree} from "react-three-fiber";

const vertexShader = `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
  vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;
const fragmentShader = ` 
uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}`;

interface GlowProps {
  position: [number, number, number];
}

const Glow: React.FC<GlowProps> = ({position}) => {
  const shader = React.useRef(new THREE.ShaderMaterial());
  const {camera} = useThree();
  useFrame(({camera}) => {
    shader.current.uniforms.viewVector.value = new THREE.Vector3().subVectors(
      camera.position,
      new THREE.Vector3(...position),
    );
  });

  return (
    <mesh scale={[1.1, 1.1, 1.1]}>
      <sphereBufferGeometry args={[1.2, 64, 64]} attach="geometry" />
      <shaderMaterial
        ref={shader}
        uniforms={{
          c: {type: "f", value: 0.6} as IUniform,
          p: {type: "f", value: 6} as IUniform,
          glowColor: {type: "c", value: new THREE.Color(0xff8800)} as IUniform,
          viewVector: {type: "v3", value: camera.position} as IUniform,
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        attach="material"
      />
    </mesh>
  );
};

export default Glow;
