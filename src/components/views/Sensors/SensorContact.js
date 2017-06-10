import React, { Component } from 'react';
import ReactKonva from 'react-konva';
import {parse as parsePath} from 'extract-svg-path';
import Immutable from 'immutable';
import gql from 'graphql-tag';
import * as THREE from 'three';
import { withApollo } from 'react-apollo';

const {
  Group,
  Path
} = ReactKonva;

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

class KonvaContact extends Component {
  constructor(props) {
    super(props);
    this.moveTimeout = null;
    this.state = {
      contact: null
    }
  }
  componentDidMount() {
    this.refreshContact(this.props);
    this._moveContact();
  }
  componentWillUnmount() {
    clearInterval(this.moveTimeout);
  }
  componentWillReceiveProps(nextProps) {
    this.refreshContact(nextProps);
  }
  refreshContact({id, data, location, icon, iconUrl, pictureUrl, speed, destination, velocity, size, radius}) {
    const {contact} = this.state;
    Promise.resolve().then(() => {
      if (contact){
        //Transfer over the information necessary.
        debugger;
        if (icon === contact.icon){
          return Promise.resolve({
            id: id,
            data: contact.data,
            icon: icon,
            iconUrl: iconUrl,
            pictureUrl: pictureUrl,
            speed: speed,
            fill: contact.fill,
            location: location,
            destination: destination,
            velocity: velocity,
            size: size,
            selected: contact.selected
          })
        } else {
          return fetch(iconUrl).then((res) => res.text())
          .then((svg) => parsePath(svg))
          .then((data) => {
            return Promise.resolve({
              id: id,
              data: data,
              icon: icon,
              iconUrl: iconUrl,
              pictureUrl: pictureUrl,
              speed: speed,
              fill: contact.fill,
              location: location,
              destination: destination,
              velocity: velocity,
              size: size,
              selected: contact.selected
            })
          });
        }
      } else {
        //Get the SVG data
        return fetch(iconUrl).then((res) => res.text())
        .then((svg) => parsePath(svg))
        .then((data) => {
          //Return the new target; put it in a random place.
          return Promise.resolve({
            id: id,
            data,
            icon: icon,
            iconUrl: iconUrl,
            pictureUrl: pictureUrl,
            speed: speed,
            fill: '#0f0',
            location: location,
            destination: destination,
            velocity: velocity,
            size: size,
            selected: false
          })
        })
      }
    }).then(contact => {
      this.setState({
        contact
      })
    });
  }
  _moveMouse = (e) => {
    if (e.target.offsetParent.classList.contains('konvajs-content')){
      const {radius, padding} = this.props;
      const contact = Immutable.Map(this.state.contact);
      const destination = {
        x: (e.offsetX - radius - (radius / 14.285) - padding / 2)/ radius, // TODO: Factor in scale
        y: (e.offsetY - radius - (radius / 14.285) - padding / 2)/ radius,
        z: 0
      }
      this.setState({
        contact: contact.set('destination', destination).toJS()
      })
    }
  }
  _downMouse(id,e,a,b) {
    document.addEventListener('mousemove', this._moveMouse)
    document.addEventListener('mouseup', this._upMouse)
  }
  _upMouse = () => {
    document.removeEventListener('mousemove', this._moveMouse);
    document.removeEventListener('mouseup', this._upMouse);
    // Send the update to the server
    const speed = 0.5;
    const {contact} = this.state;
    const distance = distance3d({x:0,y:0,z:0},contact.destination);
    let mutation;
    if (distance > 1.08) {
      // Delete the contact
      mutation = gql`
      mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
        removeSensorContact(id: $id, contact: $contact)
      }`;
    } else {
      mutation = gql`
      mutation MoveSensorContact($id: ID!, $contact: SensorContactInput!){
        moveSensorContact(id:$id, contact: $contact)
      }`;
    }
    const variables = {
      id: this.props.sensor,
      contact: {
        id: contact.id,
        speed: speed,
        /*location: {
          x: contact.location.x,
          y: contact.location.y,
          z: contact.location.z
        },*/
        destination: {
          x: contact.destination.x,
          y: contact.destination.y,
          z: contact.destination.z
        }
      }
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _moveContact() {
    const interval = 100;
    this.setState(({contact}) => {
      this.moveTimeout = setTimeout(this._moveContact.bind(this), interval);
      if (!contact) return {};
      let { location, destination, speed } = contact;
      const newContact = Immutable.Map(contact);
      if (speed > 0) {
        // Update the velocity
        const locationVector = new THREE.Vector3(location.x, location.y, location.z);
        const destinationVector = new THREE.Vector3(destination.x, destination.y, destination.z);
        const velocity = destinationVector.sub(locationVector).normalize().multiplyScalar(speed);

        // Update the location
        const newLocation = {
          x: location.x + Math.round(velocity.x / (10000 / interval) * 10000) / 10000,
          y: location.y + Math.round(velocity.y / (10000 / interval) * 10000) / 10000,
          z: location.z + Math.round(velocity.z / (10000 / interval) * 10000) / 10000
        }

        // Why not clean up the destination while we're at it?
        const newDestination = {
          x: Math.round(destination.x * 10000) / 10000,
          y: Math.round(destination.y * 10000) / 10000,
          z: Math.round(destination.z * 10000) / 10000
        }
        // Check to see if it is close enough to the destination
        if (distance3d(destination, location) < 0.005) { // A magic number
          speed = 0;
        }
        return {
          contact: newContact
          .set('location', newLocation)
          .set('destination', newDestination)
          .set('speed',speed).toJS()
        };
      }
      return {contact};
    })
  }
  render() {
    const {contact} = this.state;
    if (!contact) return <Group></Group>;
    const {radius, padding, core, mouseover = (() => {console.log('mouseover')})} = this.props;
    const {id, data, location, destination, size} = contact;
    return <Group
    x={radius}
    y={radius}>
    <Path
    data={data}
    onMouseover={mouseover.bind(this, contact)}
    onMouseout={mouseover.bind(this, {})}
    x={location.x * radius + padding}
    y={location.y * radius + padding}
    fill={'#0f0'}
    opacity={core ? 0.5 : 1}
    scale={{
      x: size*(radius/400),
      y: size*(radius/400)
    }}
    />
    {core && 
      <Path 
      onMouseDown={this._downMouse.bind(this, id)}
      data={data}
      x={destination.x * radius + padding}
      y={destination.y * radius + padding}
      fill={'#0f0'}
      scale={{
        x: size*(radius/400),
        y: size*(radius/400)
      }} />
    }
    </Group>
  }
}

export default withApollo(KonvaContact);
