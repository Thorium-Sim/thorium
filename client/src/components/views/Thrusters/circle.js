import * as THREE from "three";

class Circle extends THREE.Group {
  constructor(params) {
    super(params);
    for (let i = 0; i < 32; i++) {
      const theta = ((2 * Math.PI) / 32) * i + 0.1;
      const x1 = 1 * Math.cos(theta);
      const x2 = 0.9 * Math.cos(theta);
      const y1 = 1 * Math.sin(theta);
      const y2 = 0.9 * Math.sin(theta);
      const geometry = new THREE.Geometry();
      geometry.vertices = [
        new THREE.Vector3(x1, y1, 0),
        new THREE.Vector3(x2, y2, 0)
      ];
      const material = new THREE.LineBasicMaterial({
        color: params.color || 0xff0000,
        lineWidth: 1
      });
      const line = new THREE.Line(geometry, material);
      this.add(line);
    }
    this.rotation.setFromVector3(params.rotation);
  }
}

export default Circle;
