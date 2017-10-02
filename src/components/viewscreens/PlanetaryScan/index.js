import React, { Component } from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";
import { Asset } from "../../../helpers/assets";

import "./style.scss";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  if (!data.clouds) {
    return (
      <Asset asset={data.planet || "/3D/Texture/Planets/Alpine"}>
        {({ src }) =>
          <RenderSphere
            src={src}
            clouds={null}
            wireframe={data.wireframe}
            text={data.text}
          />}
      </Asset>
    );
  }
  return (
    <Asset asset={data.clouds || "/3D/Texture/Planets/Clouds1"}>
      {({ src: clouds }) =>
        <Asset asset={data.planet || "/3D/Texture/Planets/Alpine"}>
          {({ src }) =>
            <RenderSphere
              src={src}
              clouds={clouds}
              wireframe={data.wireframe}
              text={data.text}
            />}
        </Asset>}
    </Asset>
  );
};

class RenderSphere extends Component {
  state = { rotation: 0 };
  _onAnimate = () => {
    this.setState({
      rotation: this.state.rotation + 0.005
    });
  };
  render() {
    const cameraPosition = new THREE.Vector3(0, 2, 4);
    const { src, clouds, wireframe, text } = this.props;
    return (
      <div className="planetary-scan">
        <div className="scannerBox">
          <div className="scannerBar" />
        </div>
        <div className="text-box">
          {text}
        </div>
        <React3
          alpha
          mainCamera="camera"
          width={window.innerHeight}
          height={window.innerHeight}
          onAnimate={this._onAnimate}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={45}
              aspect={1}
              near={0.1}
              far={1000}
              lookAt={new THREE.Vector3(0, 0, 0)}
              position={cameraPosition}
            />
            <directionalLight
              color={0xffffff}
              intensity={1}
              lookAt={new THREE.Vector3(0, 0, 0)}
              position={new THREE.Vector3(0, 0, 1)}
            />
            <directionalLight
              color={0xffffff}
              intensity={1}
              lookAt={new THREE.Vector3(0, 0, 0)}
              position={new THREE.Vector3(0, 0, -1)}
            />
            {src &&
              <mesh rotation={new THREE.Euler(0, this.state.rotation, 0)}>
                <sphereGeometry
                  radius={1}
                  widthSegments={32}
                  heightSegments={32}
                />
                <meshPhongMaterial shininess={0} wireframe={wireframe}>
                  {!wireframe && <texture url={src} />}
                </meshPhongMaterial>
              </mesh>}
            {clouds &&
              <mesh rotation={new THREE.Euler(0, this.state.rotation / 5, 0)}>
                <sphereGeometry
                  radius={1.05}
                  widthSegments={16}
                  heightSegments={16}
                />
                <meshPhongMaterial transparent={true}>
                  <texture url={clouds} />
                </meshPhongMaterial>
              </mesh>}
          </scene>
        </React3>
      </div>
    );
  }
}
