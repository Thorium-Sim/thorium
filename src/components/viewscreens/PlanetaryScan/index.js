import React, { Component } from "react";
import ThreeView from "./threeView";
import Measure from "react-measure";
import "./style.scss";

export default props => {
  const data = JSON.parse(props.viewscreen.data);
  return <RenderSphere {...data} />;
};

class RenderSphere extends Component {
  state = { rotation: 0 };
  _onAnimate = () => {
    this.setState({
      rotation: this.state.rotation + 0.005
    });
  };
  render() {
    //const cameraPosition = new THREE.Vector3(0, 2, 4);
    const { text } = this.props;
    const { dimensions } = this.state;
    return (
      <div className="planetary-scan">
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div className="scannerBox" ref={measureRef}>
              <div className="scannerBar" />
              {dimensions && (
                <ThreeView {...this.props} dimensions={dimensions} />
              )}
            </div>
          )}
        </Measure>
        <div className="text-box">{text}</div>
        {/*<React3
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
            </React3>*/}
      </div>
    );
  }
}
