import React from 'react';
import ReactKonva from 'react-konva';
import Immutable from 'immutable';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import Contact from './contact';
import * as THREE from 'three';

const { Group, Path, Rect } = ReactKonva;

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

class KonvaContact extends Contact {
  constructor(props) {
    super(props);
    this.moveTimeout = null;
  }
  componentDidMount() {
    super.componentDidMount();
    this._moveContact();
  }
  componentWillUnmount() {
    clearTimeout(this.moveTimeout);
  }
  _moveMouse = e => {
    if (e.target.offsetParent.classList.contains('konvajs-content')) {
      const { radius, padding } = this.props;
      const contact = Immutable.Map(this.state.contact);
      const destination = {
        x: (e.offsetX - radius - radius / 14.285 - padding / 2) / radius, // TODO: Factor in scale
        y: (e.offsetY - radius - radius / 14.285 - padding / 2) / radius,
        z: 0
      };
      this.setState({
        contact: contact.set('destination', destination).toJS()
      });
    }
  };
  _downMouse(id, e, a, b) {
    document.addEventListener('mousemove', this._moveMouse);
    document.addEventListener('mouseup', this._upMouse.bind(this));
    this.setState({
      movingContact: true
    });
  }
  _upMouse = () => {
    document.removeEventListener('mousemove', this._moveMouse);
    document.removeEventListener('mouseup', this._upMouse);
    // Send the update to the server
    const speed = this.props.moveSpeed;
    const { contact } = this.state;
    this.setState({
      movingContact: false
    });
    const distance = distance3d({ x: 0, y: 0, z: 0 }, contact.destination);
    let mutation;
    if (distance > 1.08) {
      // Delete the contact
      mutation = gql`
        mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
          removeSensorContact(id: $id, contact: $contact)
        }
      `;
    } else {
      mutation = gql`
        mutation MoveSensorContact($id: ID!, $contact: SensorContactInput!) {
          moveSensorContact(id: $id, contact: $contact)
        }
      `;
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
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _moveContact() {
    const interval = 30;
    this.setState(({ contact, movingContact }) => {
      this.moveTimeout = setTimeout(this._moveContact.bind(this), interval);
      if (!contact) return {};
      let { location, destination, speed, velocity } = contact;
      const newContact = Immutable.Map(contact);
      if (speed > 100) {
        return {
          contact: newContact
            .set('location', destination)
            .set('speed', 0)
            .toJS()
        };
      } else if (speed > 0) {
        // Update the velocity
        const locationVector = new THREE.Vector3(
          location.x,
          location.y,
          location.z
        );
        const destinationVector = new THREE.Vector3(
          destination.x,
          destination.y,
          destination.z
        );
        if (!movingContact) {
          velocity = destinationVector
            .sub(locationVector)
            .normalize()
            .multiplyScalar(speed);
        }

        // Update the location
        const newLocation = {
          x:
            location.x +
            Math.round(velocity.x / (10000 / interval) * 10000) / 10000,
          y:
            location.y +
            Math.round(velocity.y / (10000 / interval) * 10000) / 10000,
          z:
            location.z +
            Math.round(velocity.z / (10000 / interval) * 10000) / 10000
        };

        // Why not clean up the destination while we're at it?
        const newDestination = {
          x: Math.round(destination.x * 10000) / 10000,
          y: Math.round(destination.y * 10000) / 10000,
          z: Math.round(destination.z * 10000) / 10000
        };
        // Check to see if it is close enough to the destination
        // A magic number
        if (distance3d(destination, location) < 0.01) {
          speed = 0;
        }
        return {
          contact: newContact
            .set('location', newLocation)
            .set('destination', newDestination)
            .set('speed', speed)
            .toJS()
        };
      }
      return { contact };
    });
  }
  render() {
    const { contact } = this.state;
    if (!contact) return <Group />;
    const {
      radius,
      padding,
      core,
      setSelectedContact,
      selectedContact,
      army,
      mouseover = () => {}
    } = this.props;
    const { id, data, location, destination, size, color } = contact;
    return (
      <Group x={radius} y={radius}>
        {selectedContact &&
          selectedContact.id === id &&
          <Group
            x={destination.x * radius + padding}
            y={destination.y * radius + padding}>
            <Rect x={-5} y={-5} height={2} width={7} fill="lightblue" />
            <Rect x={-5} y={-5} height={7} width={2} fill="lightblue" />
            <Rect
              x={5 + (size - 1) * 6}
              y={-5}
              height={2}
              width={7}
              fill="lightblue"
            />
            <Rect
              x={5 + size * 6}
              y={-5}
              height={7}
              width={2}
              fill="lightblue"
            />
            <Rect
              x={-5}
              y={5 + size * 6}
              height={2}
              width={7}
              fill="lightblue"
            />
            <Rect
              x={-5}
              y={5 + (size - 1) * 6}
              height={7}
              width={2}
              fill="lightblue"
            />
            <Rect
              x={5 + (size - 1) * 6}
              y={5 + size * 6}
              height={2}
              width={7}
              fill="lightblue"
            />
            <Rect
              x={5 + size * 6}
              y={5 + (size - 1) * 6}
              height={7}
              width={2}
              fill="lightblue"
            />
          </Group>}
        <Path
          data={data}
          onMouseover={mouseover.bind(this, contact)}
          onMouseout={mouseover.bind(this, {})}
          x={location.x * radius + padding}
          y={location.y * radius + padding}
          fill={color}
          opacity={core ? 0.5 : 1}
          scale={{
            x: size * (radius / 400),
            y: size * (radius / 400)
          }}
        />
        {core &&
          !army &&
          <Path
            onClick={e => e.evt.button === 2 && setSelectedContact(contact)}
            onMouseDown={e => e.evt.button === 0 && this._downMouse(this, id)}
            data={data}
            x={destination.x * radius + padding}
            y={destination.y * radius + padding}
            fill={color}
            scale={{
              x: size * (radius / 400),
              y: size * (radius / 400)
            }}
          />}
      </Group>
    );
  }
}

export default withApollo(KonvaContact);
