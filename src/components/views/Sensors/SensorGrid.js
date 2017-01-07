import React, {Component} from 'react';
import Async from 'react-promise';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {parse as parsePath} from 'extract-svg-path';
import svgMesh3d from 'svg-mesh-3d';
import MouseInput from '../../../helpers/threeMouseInput';

const createGeom = require('three-simplicial-complex')(THREE)

function degtorad(deg){
  return deg *(Math.PI/180);
}

//TODO: Cache the sensor icon geometry so it can be reused without flickering the sensor contacts on re-render
const SENSORCONTACT_SUB = gql`
subscription SensorContactsChanged($sensorId: ID) {
  sensorContactUpdate(sensorId: $sensorId){
    id
    name
    size
    iconUrl
    pictureUrl
    speed
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    infrared
    cloaked
    destroyed
  }
}`;

class SensorGrid extends Component{
	constructor(props){
		super(props);
    this.cameraPosition = new THREE.Vector3(0, 0, 2.45);
    this.state = {
      weaponsRangeOpacity: 0,
      weaponsRangePulse: 1,
      mouseInput: null,
      camera: null,
      hovering: false,
      dragging: false,
      contactGeometries: {}
    }
    this.contacts = [];
    this.asyncCount = null;
    this._cursor = {
      hovering: false,
      dragging: false,
    };
    this.sensorContactsSubscription = null;
    this._onAnimate = () => {
      // we will get this callback every frame
      const {
        mouseInput,
        camera,
      } = this.refs;
      if (!mouseInput.isReady() && this.asyncCount === 0) {
        const {
          scene,
          container,
        } = this.refs;
        console.log(this.contacts);
        mouseInput.ready(scene, container, camera);
        mouseInput.restrictIntersections(this.contacts);
        mouseInput.setActive(false);
      }

      if (this.state.mouseInput !== mouseInput) {
        this.setState({
          mouseInput,
        });
      }

      if (this.state.camera !== camera) {
        this.setState({
          camera,
        });
      }
      let {weaponsRangePulse, weaponsRangeOpacity} = this.state;
      if (weaponsRangePulse !== 0){
        weaponsRangeOpacity += weaponsRangePulse * 0.05;
        if (weaponsRangeOpacity >= 1){
          weaponsRangePulse = -1;
        }
        if (weaponsRangeOpacity < 0){
          weaponsRangePulse = 0;
        }
        if (weaponsRangeOpacity <= 0) {
          weaponsRangeOpacity = 0;
        }
        if (weaponsRangeOpacity >= 1) {
          weaponsRangeOpacity = 1;
        }
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
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.data.loading){
      window.scene = this.refs.scene
    }
    console.log('Contacts:', this.contacts, this.asyncCount);
    if (this.asyncCount === 0){
      console.log('Working');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.weaponsRangePulse !== this.state.weaponsRangePulse){
      this.setState({
        weaponsRangePulse: 1
      })
    }

    //Subscribe
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSORCONTACT_SUB,
        variables: {sensorId: this.props.sensor},
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.sensorContacts = subscriptionData.data.sensorContactUpdate
          return previousResult;
        },
      });
    }
  }
  _onHoverStart(a, b, c, d) {
    //debugger;
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd() {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart() {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd() {
    this.setState({
      dragging: false,
    });
  };
  _ref(mesh) {
    console.log('Mesh:', mesh);
    if (mesh){
      this.asyncCount -= 1;
      this.contacts.push(mesh);
    }
  }
  _asyncCount(){
    this.asyncCount += 1;
  }
  render(){
    const {
      mouseInput,
      camera,

      hovering,
      dragging,
    } = this.state;
    const style = {};

    if (dragging) {
      style.cursor = 'move';
    } else if (hovering) {
      style.cursor = 'pointer';
    }
    this._cursor.hovering = hovering;
    this._cursor.dragging = dragging;

    const { width, height } = this.props.dimensions;
    //Make the circle geometry
    const geometry = new THREE.CircleGeometry( 1, 64 );
    // Remove center vertice
    geometry.vertices.shift();
    return (
      <div id="sensorGrid" ref="container" style={style}>

      {!this.props.data.loading &&
        <React3
        alpha
        antialias
        ref="renderer"
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this._onAnimate}
        >
        <module
        ref="mouseInput"
        descriptor={MouseInput}
        />
        <scene ref="scene">
        <perspectiveCamera
        name="camera"
        fov={45}
        aspect={width/height}
        near={0.1}
        far={1000}
        ref="camera"
        lookAt={new THREE.Vector3(0,0,0)}
        position={this.cameraPosition}
        />
        <line name={`outer-circle`}>
        <geometry vertices={geometry.vertices} />
        <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
        </line>
        <line name={`middle-circle`} scale={new THREE.Vector3(0.66,0.66,0.66)}>
        <geometry vertices={geometry.vertices} />
        <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
        </line>
        <line name={`inner-circle`} scale={new THREE.Vector3(0.33,0.33,0.33)}>
        <geometry vertices={geometry.vertices} />
        <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
        </line>
        <line name={`weapons-circle`} scale={new THREE.Vector3(0.33,0.33,0.33)}>
        <geometry vertices={geometry.vertices} />
        <lineBasicMaterial color={0xff0000} transparent opacity={this.state.weaponsRangeOpacity} linewidth={3} />
        </line>

        {
          Array(12).fill(1).map((a, i) => {
            const vertices = [];
            vertices.push(new THREE.Vector3(0, 0, 0));
            vertices.push(new THREE.Vector3(Math.cos(degtorad(i * 30 + 15)), Math.sin(degtorad(i * 30 + 15)), 0));
            return (<line name={`line-${i}`} key={`line-${i}`}>
              <geometry vertices={vertices} />
              <lineBasicMaterial color={0xffffff} transparent opacity={0.5} linewidth={1} />
              </line>
              )
          })
        }
        {
          !this.props.data.loading && this.props.data.sensorContacts.map((contact) => {
            // Sensor Contacts
            this.asyncCount = 0;
            const prom = fetch(contact.iconUrl).then((res) => res.text())
            return (
              <Async key={`test-${contact.id}`} promise={prom} ref={this._asyncCount.bind(this)} pendingRender={<object3D />} then={(val) => {
                // Process the response
                var div = document.createElement('div');
                div.innerHTML = val;
                const svg = div.querySelector('svg');
                const svgPath = parsePath(svg);
                const complex = svgMesh3d(svgPath, {
                  delaunay: true,
                  scale: 4,
                  simplify: 1,
                  randomization: 10,
                });
                //const mesh = reindex(unindex(complex.positions, complex.cells));
                const geometry = new createGeom(complex);
                return (<mesh name={contact.name} ref={this._ref.bind(this)}
                  position={new THREE.Vector3(contact.location.x, contact.location.y, contact.location.z)}
                  scale={new THREE.Vector3(contact.size/20, contact.size/20, contact.size/20)}
                  onMouseEnter={this._onHoverStart.bind(this)}
                  onMouseLeave={this._onHoverEnd.bind(this)}
                  >
                  <geometry vertices={geometry.vertices} faces={geometry.faces} />
                  <meshBasicMaterial 
                  color={0xffff00}
                  side={THREE.DoubleSide}
                  />
                  </mesh>)
              }} />
              )
          })
        }
        </scene>
        </React3>
      }

      </div>)
  }
}

SensorGrid.defaultProps = {
  weaponsRangePulse: 0
};

const CONTACTS_QUERY = gql`
query Contacts($sensorsId: ID) {
  sensorContacts(sensorsId: $sensorsId) {
    id
    name
    size
    iconUrl
    pictureUrl
    speed
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    infrared
    cloaked
    destroyed
  }
}`;
export default graphql(CONTACTS_QUERY, {
  options: ({sensor}) => ({variables:{sensorsId: sensor}})
})(withApollo(SensorGrid));
