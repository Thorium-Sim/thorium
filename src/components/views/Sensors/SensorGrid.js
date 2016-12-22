import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

function degtorad(deg){
  return deg *(Math.PI/180);
}

class SensorGrid extends Component{
	constructor(props){
		super(props);
    this.cameraPosition = new THREE.Vector3(0, 0, 2.45);
    this.state = {
      weaponsRangeOpacity: 0,
      weaponsRangePulse: 1
    }
    this._onAnimate = () => {
      // we will get this callback every frame
      // React will be sure that the rotation has now updated.
      let {weaponsRangePulse, weaponsRangeOpacity} = this.state;
      if (weaponsRangePulse !== 0){
        weaponsRangeOpacity += weaponsRangePulse * 0.05;
        if (weaponsRangeOpacity >= 1){
          weaponsRangePulse = -1;
        }
        if (weaponsRangeOpacity < 0){
          weaponsRangePulse = 0;
        }
        if (weaponsRangeOpacity <= 0) weaponsRangeOpacity = 0;
        if (weaponsRangeOpacity >= 1) weaponsRangeOpacity = 1;
        this.setState({
          weaponsRangePulse,
          weaponsRangeOpacity
        })
      }
    };
  }
  componentDidMount() {
    this.setState({
      weaponsRangePulse: 0
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.weaponsRangePulse,this.state.weaponsRangePulse, nextProps.weaponsRangePulse !== this.state.weaponsRangePulse)
    if (nextProps.weaponsRangePulse !== this.state.weaponsRangePulse){
      this.setState({
        weaponsRangePulse: 1
      })
    }
  }
  render(){
    const { width, height } = this.props.dimensions;
    //Make the circle geometry
    const geometry = new THREE.CircleGeometry( 1, 64 );
    // Remove center vertice
    geometry.vertices.shift();
    return <React3
    alpha
    antialias
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
    <line>
    <geometry vertices={geometry.vertices} />
    <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
    </line>
    <line scale={new THREE.Vector3(0.66,0.66,0.66)}>
    <geometry vertices={geometry.vertices} />
    <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
    </line>
    <line scale={new THREE.Vector3(0.33,0.33,0.33)}>
    <geometry vertices={geometry.vertices} />
    <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
    </line>
    <line scale={new THREE.Vector3(0.33,0.33,0.33)}>
    <geometry vertices={geometry.vertices} />
    <lineBasicMaterial color={0xff0000} transparent opacity={this.state.weaponsRangeOpacity} linewidth={3} />
    </line>

    {
      Array(12).fill(1).map((a, i) => {
        const vertices = [];
        vertices.push(new THREE.Vector3(0, 0, 0));
        vertices.push(new THREE.Vector3(Math.cos(degtorad(i * 30 + 15)), Math.sin(degtorad(i * 30 + 15)), 0));
        return (<line key={`line-${i}`}>
          <geometry vertices={vertices} />
          <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
          </line>
          )
      })
    }
    
    </scene>
    </React3>
  }
}

SensorGrid.defaultProps = {
  weaponsRangePulse: 0
};

export default SensorGrid;

/*
for (var i = 0; i < 12; i++){
         var lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        lineGeometry.vertices.push(new THREE.Vector3(Math.cos(degtorad(i * 30 + 15)) * radius, Math.sin(degtorad(i * 30 + 15)) * radius, 0));
        var line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        }
        */