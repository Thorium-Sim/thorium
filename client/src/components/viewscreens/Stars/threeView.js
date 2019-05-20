import React, { Component } from "react";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

class ThreeView extends Component {
  constructor(props) {
    super(props);
    const { velocity, width, height } = props;
    this.state = { velocity };
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);

    this.camera.position.y = 0;
    this.camera.position.z = 0;
    this.camera.lookAt(new THREE.Vector3(0, 0, -1));

    const light = new THREE.PointLight(0xaaaaaa);
    light.position.set(250, 0, 0);
    this.scene.add(light);

    this.stars = [];
    const geometry = new THREE.CylinderGeometry(
      1,
      0,
      Math.min(Math.max(1, this.state.velocity * 4), 500),
      16,
      16
    );
    const staticGeometry = new THREE.CircleGeometry(1, 8);
    const staticMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333
    });
    for (let i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(staticGeometry, staticMaterial);
      mesh.position.set(
        1500 * (Math.random() - 0.5),
        1500 * (Math.random() - 0.5),
        -1000
      );
      this.scene.add(mesh);
    }
    for (let i = 0; i < 1000; i++) {
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(`hsl(0,0%,30%)`),
        emissive: new THREE.Color(`hsl(0, 36%, 60%)`),
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotateX(Math.PI / 2);
      mesh.position.set(
        3000 * (Math.random() - 0.5),
        3000 * (Math.random() - 0.5),
        Math.random() * -10000
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
      this.tween = new TWEEN.Tween({ velocity: this.state.velocity })
        .to({ velocity: this.props.velocity }, duration)
        .easing(ease) // Use an easing function to make the animation smooth.
        .onUpdate(({ velocity: newVelocity }) => {
          this.setState({ velocity: newVelocity });
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
        16
      );
      for (let i = 0; i < length; i++) {
        const mesh = this.stars[i];
        mesh.geometry.dispose();
        mesh.geometry = geometry;
      }
    }
  }
  animate = time => {
    const { velocity } = this.state;
    TWEEN.update(time);
    if (!this.animating) return false;
    const length = this.stars.length;
    for (let i = 0; i < length; i++) {
      const mesh = this.stars[i];
      const { x, y, z } = mesh.position;
      if (z > 0) {
        mesh.position.set(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          -5000
        );
      } else {
        mesh.position.set(x, y, z + velocity);
      }
      const hue = mesh.position.z < -1250 ? 230 : 0.104 * mesh.position.z + 330;
      mesh.material.emissive.set(`hsl(${hue}, 40%, 70%)`);
    }

    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="three-mount" />;
  }
}
export default ThreeView;
