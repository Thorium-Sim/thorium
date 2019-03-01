import React, { Component } from "react";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import Arrow from "./arrow";
import Circle from "./circle";

OBJLoader(THREE);
window.THREE = THREE;

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

class ThreeView extends Component {
  constructor(props) {
    super(props);
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

    this.makeArrows();
    this.makeCircles();
    this.scene.add(this.objectGroup);
  }
  makeArrows = () => {
    const arrowScaleVector = new THREE.Vector3(0.4, 0.4, 0.4);
    this.starboardArrow = new Arrow({
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      position: new THREE.Vector3(1.2, 0, 0),
      scale: arrowScaleVector
    });
    this.portArrow = new Arrow({
      rotation: new THREE.Euler(Math.PI / 2, Math.PI, 0),
      position: new THREE.Vector3(-1.2, 0, 0),
      scale: arrowScaleVector
    });

    this.foreArrow = new Arrow({
      rotation: new THREE.Euler(Math.PI / 2, 0, Math.PI / 2),
      position: new THREE.Vector3(0, 0, 1.3),
      scale: arrowScaleVector
    });
    this.reverseArrow = new Arrow({
      rotation: new THREE.Euler(Math.PI / -2, 0, Math.PI / 2),
      position: new THREE.Vector3(0, 0, -1.3),
      scale: arrowScaleVector
    });

    this.upArrow = new Arrow({
      rotation: new THREE.Euler(0, 0, Math.PI / 2),
      position: new THREE.Vector3(0, 1, 0),
      scale: arrowScaleVector
    });
    this.downArrow = new Arrow({
      rotation: new THREE.Euler(0, 0, Math.PI / -2),
      position: new THREE.Vector3(0, -1, 0),
      scale: arrowScaleVector
    });

    this.objectGroup.add(this.starboardArrow);
    this.objectGroup.add(this.portArrow);
    this.objectGroup.add(this.foreArrow);
    this.objectGroup.add(this.reverseArrow);
    this.objectGroup.add(this.upArrow);
    this.objectGroup.add(this.downArrow);
  };
  makeCircles = () => {
    this.objectGroup.add(
      new Circle({
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
        color: 0xff0000
      })
    );
    this.objectGroup.add(
      new Circle({ rotation: new THREE.Euler(0, 0, 0), color: 0x00ff00 })
    );
    this.objectGroup.add(
      new Circle({
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
        color: 0x0000ff
      })
    );
  };
  componentDidMount() {
    const { assets } = this.props.simulator;
    const query = gql`
      query GetAsset($assetKey: String!, $textureAsset: String!) {
        asset(assetKey: $assetKey) {
          assetKey
          url
        }
        textureAsset: asset(assetKey: $textureAsset) {
          assetKey
          url
        }
      }
    `;
    const variables = {
      assetKey: assets.mesh,
      textureAsset: assets.texture,
      simulatorId: this.props.simulatorId
    };
    this.props.client
      .query({
        query,
        variables
      })
      .then(res => {
        const meshSrc = (res.data.asset.url || "").replace(
          /http(s|):\/\/.*:[0-9]{4}/gi,
          ""
        );
        // const texSrc = (res.data.textureAsset.url || "").replace(
        //   /http(s|):\/\/.*:[0-9]{4}/gi,
        //   ""
        // );
        const objLoader = new window.THREE.OBJLoader();
        //const texture = new THREE.TextureLoader().load(texSrc);
        // const material = new THREE.MeshBasicMaterial({ map: texture });
        const color = 0x71bbe9;
        const material = new THREE.MeshPhongMaterial({
          color,
          polygonOffset: true,
          polygonOffsetFactor: 1, // positive value pushes polygon further away
          polygonOffsetUnits: 1,
          opacity: 0.3,
          transparent: true
        });
        const wireMat = new THREE.LineBasicMaterial({
          color,
          linewidth: 4,
          visible: true,
          opacity: 0.7
          // transparent: true
        });

        this.animate();
        objLoader.load(meshSrc, obj => {
          obj.scale.set(0.2, 0.2, 0.2);
          obj.children.forEach(child => {
            child.material = material;
            const geo = new THREE.EdgesGeometry(child.geometry); // or WireframeGeometry
            const wireframeMesh = new THREE.LineSegments(geo, wireMat);
            wireframeMesh.scale.set(0.2, 0.2, 0.2);
            this.objectGroup.add(wireframeMesh);
          });
          this.objectGroup.add(obj);
        });
      });
    document
      .getElementById("thrustersMount")
      .appendChild(this.renderer.domElement);
    this.animating = true;
    this.animate();
  }
  componentDidUpdate() {
    const { direction, rotation } = this.props;
    const directions = [
      "starboardArrow",
      "portArrow",
      "foreArrow",
      "reverseArrow",
      "upArrow",
      "downArrow"
    ];
    directions.forEach(d => {
      this[d].visible = false;
    });
    if (direction.x > 0.2) this.portArrow.visible = true;
    if (direction.x < -0.2) this.starboardArrow.visible = true;
    if (direction.z < -0.2) this.downArrow.visible = true;
    if (direction.z > 0.2) this.upArrow.visible = true;
    if (direction.y < -0.2) this.foreArrow.visible = true;
    if (direction.y > 0.2) this.reverseArrow.visible = true;

    if (rotation) {
      const rot = new THREE.Euler(
        degtorad(rotation.pitch * -1),
        degtorad(rotation.yaw * -1 + 180),
        degtorad(rotation.roll)
      );
      this.objectGroup.rotation.setFromVector3(rot);
    }
  }
  componentWillUnmount() {
    this.animating = false;
    cancelAnimationFrame(this.frame);
  }
  animate = () => {
    if (!this.animating) return;
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
  render() {
    return <div id="thrustersMount" />;
  }
}
export default withApollo(ThreeView);
