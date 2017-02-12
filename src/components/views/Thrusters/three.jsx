import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import ParsedModel from './parser';
import Arrow from './arrow';

OBJLoader(THREE);
const ObjURL = 'https://s3.amazonaws.com/dynamo-star/_1.obj';
const TxURL = 'https://s3.amazonaws.com/dynamo-star/battleship_elements2_c.png';


window.THREE = THREE;

function degtorad(deg){
  return deg * (Math.PI / 180);
}

const IndicatorCircle = (props) => {
  const lines = [];

  for (var i = 0; i < 32; i++) {
    var theta = (2 * Math.PI / 32) * i + 0.1;
    const x1 = 1 * Math.cos(theta);
    const x2 = 0.9 * Math.cos(theta);
    const y1 = 1 * Math.sin(theta);
    const y2 = 0.9 * Math.sin(theta);
    lines.push(<line key={`${i}-${props.name}`}>
      <geometry vertices={[new THREE.Vector3(x1, y1, 0), new THREE.Vector3(x2, y2, 0)]} />
      <lineBasicMaterial color={props.color || 0xff0000} linewidth={1} />
      </line>);
  }
  return (
    <group rotation={props.rotation} name={props.name}>
    {lines}
    </group>
    )
}

export default class ThreeThrusters extends Component {
  constructor(props){
    super(props);
    this.cameraPosition = new THREE.Vector3(0, 1, 3);
    this.state = {
      width: props.dimensions.width,
      height: props.dimensions.height,
      thrusterRotation: new THREE.Euler(),
      spaceship: (() => <group />)
    }
    this._onAnimate = () => {
      // we will get this callback every frame
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
    };
  }
  componentDidMount() {
    const self = this;
    var objLoader = new THREE.OBJLoader();
    objLoader.load(// resource URL
      ObjURL,
      function ( object ) {
        object.scale.set(0.2,0.2,0.2)
        // Look up your actual geometry object
        object.children[0].geometry = new THREE.Geometry().fromBufferGeometry( object.children[0].geometry );
        const parser = new ParsedModel();
        const meshData = parser.parse(object.children[0])
        self.setState({
          spaceship: {
            faces: meshData.faces,
            vertices: meshData.vertices,
            colors: meshData.colors,
            faceVertexUvs: meshData.faceVertexUvs,
          }
        })
      })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.rotation){
      const thruster = nextProps.rotation || {};
      this.setState({
        thrusterRotation: new THREE.Euler(
          degtorad(thruster.pitch),
          degtorad(thruster.yaw * -1),
          degtorad(thruster.roll)
          ),
      })
    }
  }
  render() {
    //Do some quaternion logic
    const finalAngle = this.state.thrusterRotation;
    const { width, height } = this.props.dimensions;
    const arrowScaleVector = new THREE.Vector3(0.4,0.4,0.4);
    const direction = this.props.direction;
    return (
      <React3
      alpha
      mainCamera="camera"
      width={width}
      height={height}
      onAnimate={this._onAnimate}
      >
      <scene>
      <perspectiveCamera
      name="camera"
      fov={45}
      aspect={width/height}
      near={0.1}
      far={1000}
      lookAt={new THREE.Vector3(0,0,0)}
      position={this.cameraPosition}
      />
      <directionalLight 
      color={0xffffff}
      intensity={2.5}
      lookAt={new THREE.Vector3(0,0,0)} 
      position={new THREE.Vector3(0,0,1)} />
      <directionalLight 
      color={0xffffff}
      intensity={2.5}
      lookAt={new THREE.Vector3(0,0,0)} 
      position={new THREE.Vector3(0,0,-1)} />
      {/*<ambientLight
      color={0x505050}
      />*/}
      <group rotation={finalAngle}>
      <IndicatorCircle name="yaw" rotation={new THREE.Euler(Math.PI/2, 0, finalAngle.y )} color={0xff0000}/>
      <IndicatorCircle name="pitch" rotation={new THREE.Euler(finalAngle.x, Math.PI/2, 0)} color={0x0000ff}/>
      <IndicatorCircle name="roll" color={0x00ff00} rotation={new THREE.Euler(0, 0, finalAngle.z)} />
      {this.state.spaceship.vertices &&
        <mesh scale={new THREE.Vector3(0.2,0.2,0.2)}
        >
        <geometry {...this.state.spaceship} />
        <meshBasicMaterial>
        <texture url={TxURL} />
        </meshBasicMaterial>
        </mesh>
      }
      <Arrow visible={direction.x < -0.2} rotation={new THREE.Euler(Math.PI/2,0,0)} position={new THREE.Vector3(1.2,0,0)} scale={arrowScaleVector}/>
      <Arrow visible={direction.x > 0.2} rotation={new THREE.Euler(Math.PI/2,Math.PI,0)} position={new THREE.Vector3(-1.2,0,0)} scale={arrowScaleVector}/>

      <Arrow visible={direction.z > 0.2} rotation={new THREE.Euler(Math.PI/2,0,Math.PI/2)} position={new THREE.Vector3(0,0,1.3)} scale={arrowScaleVector}/>
      <Arrow visible={direction.z < -0.2} rotation={new THREE.Euler(Math.PI/-2,0,Math.PI/2)} position={new THREE.Vector3(0,0,-1.3)} scale={arrowScaleVector}/>

      <Arrow visible={direction.y < -0.2} rotation={new THREE.Euler(0,0,Math.PI/2)} position={new THREE.Vector3(0,1,0)} scale={arrowScaleVector}/>
      <Arrow visible={direction.y > 0.2} rotation={new THREE.Euler(0,0,Math.PI/-2)} position={new THREE.Vector3(0,-1,0)} scale={arrowScaleVector}/>

      </group>
      </scene>
      </React3>
      );
  }
}
