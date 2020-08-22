import React, {Component} from "react";
import * as THREE from "three";
import {CircleGeometry, LineLoop, LineBasicMaterial} from "three";

window.THREE = THREE;

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

class ThreeView extends Component {
  constructor(props) {
    super(props);
    this.rotation = 0;
    this.cloudRotation = 0;
    const {width, height} = props.dimensions;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize(width, height);

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    // hemiLight.position.set(0, 500, 0);
    // this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 3, 3);
    //dirLight.position.multiplyScalar(50);
    dirLight.name = "dirlight";
    this.scene.add(dirLight);

    this.camera.position.y = 1;
    this.camera.position.z = 3.5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.objectGroup = new THREE.Group();

    this.scene.add(this.objectGroup);
    this.objLoader = new window.THREE.OBJLoader();
  }
  componentDidMount() {
    const {wireframe, color = "#ffffff", planet, clouds} = this.props;
    this.planetTex = new THREE.TextureLoader().load(`/assets/${planet}`);
    this.cloudsTex = new THREE.TextureLoader().load(`/assets/${clouds}`);

    this.material = new THREE.MeshLambertMaterial({
      color: wireframe ? parseInt(color.replace("#", ""), 16) : null,
      map: wireframe ? null : this.planetTex,
      opacity: wireframe ? 0.5 : 1,
      wireframe,
      transparent: true,
    });
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
    this.planet = new THREE.Mesh(this.geometry, this.material);
    this.planet.scale.set(1.18, 1.18, 1.18);
    this.objectGroup.add(this.planet);

    this.cloudMaterial = new THREE.MeshLambertMaterial({
      color: wireframe ? parseInt(color.replace("#", ""), 16) : null,
      map: wireframe ? null : this.cloudsTex,
      transparent: true,
      opacity: 0.7,
    });
    this.clouds = new THREE.Mesh(this.geometry, this.cloudMaterial);
    this.clouds.scale.set(1.2, 1.2, 1.2);
    this.clouds.visible = false;
    this.objectGroup.add(this.clouds);
    if (clouds && !wireframe) {
      this.clouds.visible = true;
    }

    const geometry = new CircleGeometry(1.1, 32);
    geometry.vertices.shift();
    const mat1 = new LineBasicMaterial({
      color: 0xfac79e,
    });
    const mat2 = new LineBasicMaterial({
      color: 0xfafa9a,
    });

    this.scannerLine1 = new LineLoop(geometry, mat1);
    this.scannerLine1.scale.set(1.1, 1.1, 1.1);
    this.objectGroup.add(this.scannerLine1);

    this.scannerLine2 = new LineLoop(geometry, mat2);
    this.scannerLine2.scale.set(1.15, 1.15, 1.15);
    this.objectGroup.add(this.scannerLine2);

    this.threeMount.current.appendChild(this.renderer.domElement);
    this.animating = true;
    this.animate();
  }
  componentDidUpdate(oldProps) {
    const {
      wireframe,
      color = "#ffffff",
      planet,
      clouds,
      dimensions: {width, height},
    } = this.props;
    if (width !== oldProps.dimensions.width) {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
    this.planetTex = new THREE.TextureLoader().load(`/assets/${planet}`);
    this.cloudsTex = new THREE.TextureLoader().load(`/assets/${clouds}`);
    this.material = new THREE.MeshLambertMaterial({
      color: wireframe ? parseInt(color.replace("#", ""), 16) : null,
      map: wireframe ? null : this.planetTex,
      opacity: wireframe ? 0.5 : 1,
      wireframe,
      transparent: true,
    });
    this.planet.material = this.material;
    this.cloudMaterial = new THREE.MeshLambertMaterial({
      color: wireframe ? parseInt(color.replace("#", ""), 16) : null,
      map: wireframe ? null : this.cloudsTex,
      transparent: true,
      opacity: 0.7,
    });
    this.clouds.material = this.cloudMaterial;
    if (wireframe) {
      this.clouds.visible = false;
    } else {
      this.clouds.visible = true;
    }
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.wireframe !== this.props.wireframe ||
      nextProps.color !== this.props.color ||
      nextProps.planet !== this.props.planet ||
      nextProps.clouds !== this.props.clouds
    )
      return true;
    return false;
  }
  componentWillUnmount() {
    this.animating = false;
    cancelAnimationFrame(this.frame);
  }
  threeMount = React.createRef();
  animate = () => {
    if (!this.animating) return;

    const rot = new THREE.Euler(
      degtorad(0),
      degtorad(this.rotation * -1),
      degtorad(0),
    );
    const cloudRot = new THREE.Euler(
      degtorad(0),
      degtorad(this.cloudRotation * -1),
      degtorad(0),
    );
    this.rotation += 0.05;
    this.cloudRotation += 0.03;
    this.objectGroup.rotation.setFromVector3(rot);
    this.clouds.rotation.setFromVector3(cloudRot);

    this.scannerLine1.rotation.x += 0.01;
    this.scannerLine1.rotateY(0.02);

    this.scannerLine2.rotation.x += 0.005;
    this.scannerLine2.rotateY(0.03);

    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div ref={this.threeMount} />;
  }
}
export default ThreeView;
