import React, { Component } from "react";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";

window.THREE = THREE;

OBJLoader(THREE);

class ThreeView extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0 };

    const txURL = require("./generatortexture.jpg");
    const objURL = require("./shieldgenerator.obj");

    const { width, height } = props.dimensions;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(width, height);

    this.camera.position.y = 2;
    this.camera.position.z = 4;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const light1 = new THREE.DirectionalLight(0x88ccff, 1);
    light1.position.z = 1;
    light1.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xff8888, 1);
    light2.position.z = -1;
    light2.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(light2);

    const objLoader = new window.THREE.OBJLoader();
    const texture = new THREE.TextureLoader().load(txURL);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    objLoader.load(objURL, obj => {
      this.reactor = new THREE.Object3D();
      this.reactor.copy(obj);
      this.reactor.scale.set(0.02, 0.02, 0.02);
      this.reactor.children[0].material = material;
      this.scene.add(this.reactor);
      this.animate();
    });
  }
  componentWillMount() {
    this.animating = true;
    this.animate();
  }
  componentDidMount() {
    document
      .getElementById("reactorMount")
      .appendChild(this.renderer.domElement);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    this.animating = false;
  }
  animate = () => {
    if (!this.animating) return false;
    this.setState(({ rotation }) => {
      return { rotation: rotation + 0.005 };
    });
    if (this.reactor) {
      this.reactor.rotation.y = this.state.rotation;
    }
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="reactorMount" />;
  }
}
export default ThreeView;
