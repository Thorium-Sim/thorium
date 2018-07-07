import React, { Component } from "react";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";

OBJLoader(THREE);
window.THREE = THREE;

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

class ThreeView extends Component {
  constructor(props) {
    super(props);
    this.rotation = 0;
    const { width, height } = props.dimensions;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(width, height);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.position.set(0, 500, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-1, 0.75, 1);
    dirLight.position.multiplyScalar(50);
    dirLight.name = "dirlight";
    this.scene.add(dirLight);

    this.camera.position.y = 1;
    this.camera.position.z = 3;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.objectGroup = new THREE.Group();

    this.scene.add(this.objectGroup);
    this.objLoader = new window.THREE.OBJLoader();
  }
  componentDidMount() {
    const { wireframe, color = "#ffffff", src, texSrc } = this.props;
    this.texture = new THREE.TextureLoader().load(texSrc);
    this.material = new THREE.MeshPhongMaterial({
      color: parseInt(color.replace("#", ""), 16),
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1,
      opacity: wireframe ? 0.3 : 1,
      transparent: true
    });
    this.wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 4,
      visible: wireframe ? true : false,
      opacity: 0.7
    });
    this.objLoader.load(src, obj => {
      obj.scale.set(0.3, 0.3, 0.3);
      // mesh
      this.material = obj.children[0].material = this.material;

      // wireframe
      const geo = new THREE.EdgesGeometry(obj.children[0].geometry); // or WireframeGeometry
      const wireframeMesh = new THREE.LineSegments(geo, this.wireMat);
      wireframeMesh.scale.set(0.3, 0.3, 0.3);
      this.objectGroup.add(obj);
      this.objectGroup.add(wireframeMesh);
    });
    document
      .getElementById("thrustersMount")
      .appendChild(this.renderer.domElement);
    this.animating = true;
    this.animate();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      wireframe,
      color = "#ffffff",
      src,
      dimensions: { width, height }
    } = nextProps;
    if (width !== this.props.dimensions.width) {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
    if (src !== this.props.src) {
      while (this.objectGroup.children.length > 0) {
        if (this.objectGroup.children[0]) {
          this.objectGroup.remove(this.objectGroup.children[0]);
        } else {
          break;
        }
      }
      this.objLoader.load(src, obj => {
        obj.scale.set(0.3, 0.3, 0.3);
        obj.children[0].material = this.material;
        const geo = new THREE.EdgesGeometry(obj.children[0].geometry); // or WireframeGeometry
        const wireframeMesh = new THREE.LineSegments(geo, this.wireMat);
        wireframeMesh.scale.set(0.3, 0.3, 0.3);
        this.objectGroup.add(obj);
        this.objectGroup.add(wireframeMesh);
      });
    }

    this.material.color.setHex(parseInt(color.replace("#", ""), 16));
    this.wireMat.color.setHex(parseInt(color.replace("#", ""), 16));
    this.material.opacity = wireframe ? 0.3 : 1;
    this.wireMat.visible = wireframe ? true : false;
    this.material.needsUpdate = true;
    this.wireMat.needsUpdate = true;
  }
  componentWillUnmount() {
    this.animating = false;
    cancelAnimationFrame(this.frame);
  }
  animate = () => {
    if (!this.animating) return;

    const rot = new THREE.Euler(
      degtorad(0),
      degtorad(this.rotation * -1),
      degtorad(0)
    );
    this.rotation += 0.05;
    this.objectGroup.rotation.setFromVector3(rot);
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="thrustersMount" />;
  }
}
export default ThreeView;
