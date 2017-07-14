import React from 'react';
import Contact from './contact';
import ReactKonva from 'react-konva';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const ADD_ARMY_CONTACT = gql`
  mutation(
    $id: ID!
    $name: String
    $size: Float
    $icon: String
    $picture: String
    $infrared: Boolean
    $cloaked: Boolean
  ) {
    createSensorArmyContact(
      id: $id
      contact: {
        name: $name
        size: $size
        icon: $icon
        picture: $picture
        infrared: $infrared
        cloaked: $cloaked
      }
    )
  }
`;

const REMOVE_ARMY_CONTACT = gql`
  mutation($id: ID!, $contact: ID!) {
    removeSensorArmyContact(id: $id, contact: $contact)
  }
`;

const { Group, Path, Rect } = ReactKonva;

class ArmyContact extends Contact {
  _moveMouse = e => {
    const { contact } = this.state;
    const { size } = contact;
    const { x, y } = this.props;
    if (e.target.offsetParent.classList.contains('konvajs-content')) {
      this.setState({
        x: e.offsetX - x + size * 25 / 2,
        y: e.offsetY - y + size * 25 / 2
      });
    }
  };
  _downMouse(id, e, a, b) {
    document.addEventListener('mousemove', this._moveMouse);
    document.addEventListener('mouseup', this._upMouse.bind(this));
  }
  _upMouse = () => {
    const {
      name,
      size,
      icon,
      picture,
      color,
      infrared,
      cloaked,
      sensor,
      padding,
      radius,
      x: xProp
    } = this.props;
    const { x, y } = this.state;
    document.removeEventListener('mousemove', this._moveMouse);
    this.props.client.mutate({
      mutation: gql`
        mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
          createSensorContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id: sensor,
        contact: {
          name,
          size,
          icon,
          picture,
          color,
          infrared,
          cloaked,
          destination: {
            x: (x + xProp / 2 + padding) / radius,
            y: (y - radius + padding) / radius,
            z: 0
          },
          location: {
            x: (x + xProp / 2 + padding) / radius,
            y: (y - radius + padding) / radius,
            z: 0
          }
        }
      }
    });
    this.setState({
      x: 0,
      y: 0
    });
  };
  render() {
    const { x, y, contact } = this.state;
    if (!contact) return <Group />;
    const { setSelectedContact, selectedContact, radius } = this.props;
    const { id, data, size, color } = contact;
    return (
      <Group x={x} y={y}>
        {selectedContact &&
          selectedContact.id === id &&
          <Group x={0} y={0}>
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
          onClick={e => e.evt.button === 2 && setSelectedContact(contact)}
          onMouseDown={e => e.evt.button === 0 && this._downMouse(this, id)}
          x={0}
          y={0}
          fill={color}
          opacity={1}
          scale={{
            x: size * (radius / 400),
            y: size * (radius / 400)
          }}
        />
      </Group>
    );
  }
}

export default withApollo(ArmyContact);
