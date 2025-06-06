import React, {Component} from "react";
import * as THREE from "three";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

window.THREE = THREE;



class ThreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {rotation: 0};

    const txURL = require("./generatortexture.jpg?url");
    const objURL = require("./shieldgenerator.obj?url");

    const {width, height} = props.dimensions;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({alpha: true});
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

    const objLoader = new OBJLoader();
    const texture = new THREE.TextureLoader().load(txURL);
    const material = new THREE.MeshPhongMaterial({map: texture});
    objLoader.load(objURL, obj => {
      this.reactor = new THREE.Object3D();
      this.reactor.copy(obj);
      this.reactor.scale.set(0.025, 0.025, 0.025);
      this.reactor.position.set(0, -0.5, 0);
      this.reactor.children[0].material = material;
      this.scene.add(this.reactor);
      this.animate();
    });
  }
  componentDidMount() {
    this.animating = true;
    this.animate();
    this.reactorMount.current.appendChild(this.renderer.domElement);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    this.animating = false;
  }
  animate = () => {
    if (!this.animating) return false;
    this.setState(({rotation}) => {
      return {rotation: rotation + 0.005};
    });
    if (this.reactor) {
      this.reactor.rotation.y = this.state.rotation;
    }
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  reactorMount = React.createRef();
  render() {
    return <div ref={this.reactorMount} />;
  }
}
export default ThreeView;
