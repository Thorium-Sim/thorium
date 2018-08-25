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
    this.stars = [];
    const geometry = new THREE.CylinderGeometry(
      0.8,
      0,
      this.state.velocity > 5 ? Math.min(Math.max(1, velocity * 3), 500) : 1,
      8,
      8
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
    for (let i = 0; i < 2000; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 16%, 80%)`),
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
        0.8,
        0,
        this.state.velocity > 5
          ? Math.min(Math.max(1, this.state.velocity * 3), 500)
          : 1,
        8,
        8
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
          1500 * (Math.random() - 0.5),
          1500 * (Math.random() - 0.5),
          -10000
        );
      } else {
        mesh.position.set(x, y, z + velocity);
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="three-mount" />;
  }
}
export default ThreeView;
