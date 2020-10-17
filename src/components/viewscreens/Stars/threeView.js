import React, {Component} from "react";
import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import TWEEN from "@tweenjs/tween.js";
var params = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

function randomSpherePoint(radius, x0 = 0, y0 = 0, z0 = 0) {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
  var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
  var z = z0 + radius * Math.cos(phi);
  return [x, y, z];
}

class ThreeView extends Component {
  constructor(props) {
    super(props);
    const {velocity, width, height} = props;
    this.state = {velocity};
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ReinhardToneMapping;

    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);

    this.camera.position.y = 0;
    this.camera.position.z = 0;
    this.camera.lookAt(new THREE.Vector3(0, 0, -1));
    this.camera.rotation.y = (props.angle / 180) * Math.PI + Math.PI;

    this.renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85,
    );
    this.bloomPass.threshold = params.bloomThreshold;
    this.bloomPass.strength = params.bloomStrength;
    this.bloomPass.radius = params.bloomRadius;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.bloomPass);

    const light = new THREE.PointLight(0xaaaaaa);
    light.position.set(250, 0, 0);
    this.scene.add(light);

    this.stars = [];
    const geometry = new THREE.CylinderGeometry(
      1,
      0,
      Math.min(Math.max(1, this.state.velocity * 4), 500),
      16,
      16,
    );
    const staticGeometry = new THREE.CircleGeometry(1, 8);
    const staticMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
    });
    for (let i = 0; i < 3000; i++) {
      const mesh = new THREE.Mesh(staticGeometry, staticMaterial);
      mesh.position.set(...randomSpherePoint(1500));
      this.scene.add(mesh);
    }
    for (let i = 0; i < 5000; i++) {
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(`hsl(0,0%,30%)`),
        emissive: new THREE.Color(`hsl(0, 36%, 60%)`),
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotateX(Math.PI / 2);
      mesh.position.set(
        7000 * (Math.random() - 0.5),
        7000 * (Math.random() - 0.5),
        20000 * (Math.random() - 0.5),
      );
      this.stars.push(mesh);
      this.scene.add(mesh);
    }
  }
  componentDidMount() {
    this.animating = true;
    this.animate();

    document
      .getElementById("three-mount")
      .appendChild(this.renderer.domElement);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    this.animating = false;
  }
  componentDidUpdate(prevProps, prevState) {
    this.camera.rotation.y = (this.props.angle / 180) * Math.PI;

    if (this.props.velocity !== prevProps.velocity) {
      this.tween && this.tween.stop();
      let duration = 7 * 1000;
      let ease = TWEEN.Easing.Exponential.In;
      if (this.state.velocity < 5) {
        duration = 14 * 1000;
        ease = TWEEN.Easing.Exponential.In;
      }
      if (this.props.velocity === 0) {
        duration = 5 * 1000;
        ease = TWEEN.Easing.Exponential.InOut;
      }
      this.tween = new TWEEN.Tween({velocity: this.state.velocity})
        .to({velocity: this.props.velocity}, duration)
        .easing(ease) // Use an easing function to make the animation smooth.
        .onUpdate(({velocity: newVelocity}) => {
          this.setState({velocity: newVelocity});
        })
        .start();
    }
    if (this.state.velocity !== prevState.velocity) {
      const length = this.stars.length;
      const geometry = new THREE.CylinderGeometry(
        1,
        0,
        Math.min(Math.max(1, this.state.velocity * 4), 500),
        16,
        16,
      );
      for (let i = 0; i < length; i++) {
        const mesh = this.stars[i];
        mesh.geometry.dispose();
        mesh.geometry = geometry;
      }
    }
  }
  animate = time => {
    const {velocity} = this.state;
    TWEEN.update(time);
    if (!this.animating) return false;
    const length = this.stars.length;
    for (let i = 0; i < length; i++) {
      const mesh = this.stars[i];
      const {x, y, z} = mesh.position;
      if (z > 10000) {
        mesh.position.set(
          7000 * (Math.random() - 0.5),
          7000 * (Math.random() - 0.5),
          -10000,
        );
      } else {
        mesh.position.set(x, y, z + velocity);
      }
      const hue = mesh.position.z < -1250 ? 230 : 0.104 * mesh.position.z + 330;
      mesh.material.emissive.set(`hsl(${hue}, 40%, 70%)`);
    }
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="three-mount" />;
  }
}
export default ThreeView;
