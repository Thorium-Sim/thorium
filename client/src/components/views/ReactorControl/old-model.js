import React, { Component } from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import ParsedModel from "../helpers/parser";

OBJLoader(THREE);

class ReactorModel extends Component {
  state = { rotation: 0 };
  cameraPosition = new THREE.Vector3(0, 2, 4);
  txURL = require("./generatortexture.jpg");
  componentDidMount() {
    const self = this;
    const objLoader = new THREE.OBJLoader();
    const objURL = require("./shieldgenerator.obj");
    objLoader.load(
      // resource URL
      objURL,
      function(object) {
        object.scale.set(0.02, 0.02, 0.02);
        // Look up your actual geometry object
        object.children[0].geometry = new THREE.Geometry().fromBufferGeometry(
          object.children[0].geometry
        );
        const parser = new ParsedModel();
        const meshData = parser.parse(object.children[0]);
        self.setState({
          reactor: {
            faces: meshData.faces,
            vertices: meshData.vertices,
            colors: meshData.colors,
            faceVertexUvs: meshData.faceVertexUvs
          }
        });
      }
    );
  }
  _onAnimate = () => {
    this.setState(({ rotation }) => {
      return { rotation: rotation + 0.005 };
    });
  };
  render() {
    const { width } = this.props;
    return (
      <React3
        alpha
        mainCamera="camera"
        width={width}
        height={width}
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
            position={this.cameraPosition}
          />
          <directionalLight
            color={0x88ccff}
            intensity={1}
            lookAt={new THREE.Vector3(0, 0, 0)}
            position={new THREE.Vector3(0, 0, 1)}
          />
          <directionalLight
            color={0xff8888}
            intensity={1}
            lookAt={new THREE.Vector3(0, 0, 0)}
            position={new THREE.Vector3(0, 0, -1)}
          />
          {this.state.reactor && (
            <mesh
              rotation={new THREE.Euler(0, this.state.rotation, 0)}
              scale={new THREE.Vector3(0.02, 0.02, 0.02)}
            >
              <geometry {...this.state.reactor} />
              <meshPhongMaterial>
                <texture url={this.txURL} />
              </meshPhongMaterial>
            </mesh>
          )}
        </scene>
      </React3>
    );
  }
}

export default ReactorModel;
