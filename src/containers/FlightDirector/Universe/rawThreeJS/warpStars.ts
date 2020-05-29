import {
  Group,
  CylinderBufferGeometry,
  Mesh,
  MeshLambertMaterial,
  Color,
} from "three";

export class WarpStars extends Group {
  stars: Mesh[];
  _velocity: number = 20;
  constructor() {
    super();
    this.stars = [];
    const geometry = new CylinderBufferGeometry(
      1,
      0,
      Math.min(Math.max(1, this._velocity * 4), 500),
      16,
      16,
    );
    for (let i = 0; i < 2000; i++) {
      const material = new MeshLambertMaterial({
        color: new Color(`hsl(0,0%,30%)`),
        emissive: new Color(`hsl(230, 100%, 70%)`),
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new Mesh(geometry, material);
      mesh.rotateX(Math.PI / 2);
      mesh.position.set(
        5000 * (Math.random() - 0.5),
        5000 * (Math.random() - 0.5),
        10000 * (Math.random() - 0.5),
      );
      this.stars.push(mesh);
      this.add(mesh);
    }
  }
  set velocity(value: number) {
    // if (this.props.velocity !== prevProps.velocity) {
    //   this.tween && this.tween.stop();
    //   let duration = 7 * 1000;
    //   let ease = TWEEN.Easing.Exponential.In;
    //   if (this.state.velocity < 5) {
    //     duration = 14 * 1000;
    //     ease = TWEEN.Easing.Exponential.In;
    //   }
    //   if (this.props.velocity === 0) {
    //     duration = 5 * 1000;
    //     ease = TWEEN.Easing.Exponential.InOut;
    //   }
    //   this.tween = new TWEEN.Tween({velocity: this.state.velocity})
    //     .to({velocity: this.props.velocity}, duration)
    //     .easing(ease) // Use an easing function to make the animation smooth.
    //     .onUpdate(({velocity: newVelocity}) => {
    //       this.setState({velocity: newVelocity});
    //     })
    //     .start();
    // }
    // if (this.state.velocity !== prevState.velocity) {
    //   const length = this.stars.length;
    //   const geometry = new THREE.CylinderGeometry(
    //     1,
    //     0,
    //     Math.min(Math.max(1, this.state.velocity * 4), 500),
    //     16,
    //     16,
    //   );
    //   for (let i = 0; i < length; i++) {
    //     const mesh = this.stars[i];
    //     mesh.geometry.dispose();
    //     mesh.geometry = geometry;
    //   }
    // }

    this._velocity = value;
  }
  get velocity() {
    return this._velocity;
  }
  update() {
    // TWEEN.update(time);
    const length = this.stars.length;
    for (let i = 0; i < length; i++) {
      const mesh = this.stars[i];
      const {x, y, z} = mesh.position;
      if (z > 5000) {
        mesh.position.set(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          -5000,
        );
      } else {
        mesh.position.set(x, y, z + this.velocity);
      }
      const a = 0.184;
      const hue = Math.round(
        Math.min(360, Math.max(230, a * mesh.position.z + 130)),
      );
      let material = mesh.material as MeshLambertMaterial;
      material.emissive.set(`hsl(${hue}, 70%, 70%)`);
    }
  }
}
