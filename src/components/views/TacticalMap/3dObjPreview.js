import React, { Component } from "react";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";

OBJLoader(THREE);
window.THREE = THREE;

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

class ObjPreview extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.rotation = 0;
    const width = 80;
    const height = 80;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(width, height);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.position.set(0, 500, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(-1, 0.75, 1);
    //dirLight.position.multiplyScalar(50);
    dirLight.name = "dirlight";
    this.scene.add(dirLight);

    this.camera.position.y = 1;
    this.camera.position.z = 3;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.objectGroup = new THREE.Group();

    this.scene.add(this.objectGroup);
  }
  componentDidMount() {
    const { src } = this.props;
    const meshSrc = (src || "").replace(/http(s|):\/\/.*:[0-9]{4}/gi, "");
    const objLoader = new window.THREE.OBJLoader();
    this.material = new THREE.MeshLambertMaterial({
      // wireframe: true,
      color: parseInt("0088ff", 16)
    });

    objLoader.load(meshSrc, obj => {
      obj.scale.set(0.3, 0.3, 0.3);
      obj.children.forEach(child => {
        child.material = this.material;
      });

      this.objectGroup.add(obj);

      const rot = new THREE.Euler(degtorad(0), degtorad(45), degtorad(0));
      this.objectGroup.rotation.setFromVector3(rot);

      this.renderer.render(this.scene, this.camera);
    });
    this.myRef.current.appendChild(this.renderer.domElement);
  }
  render() {
    return <div ref={this.myRef} style={{ height: 80, width: 80 }} />;
  }
}

export default ObjPreview;
