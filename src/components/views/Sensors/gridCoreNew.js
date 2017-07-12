import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Measure from 'react-measure';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import Immutable from 'immutable';
import ContactContextMenu from './contactContextMenu';
import { Row, Col, Container, Button, Input } from 'reactstrap';
import Grid from './GridKonva';

import './gridCore.scss';

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

const SENSOR_SUB = gql`
  subscription SensorsChanged {
    sensorsUpdate {
      id
      simulatorId
      armyContacts {
        id
        name
        size
        icon
        iconUrl
        picture
        pictureUrl
        color
        infrared
        cloaked
        destroyed
      }
    }
  }
`;

class GridCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingContact: {},
      selectedContact: null,
      removeContacts: false,
      contextContact: null,
      speed: 0.6
    };
    this.sensorsSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ sensors: subscriptionData.data.sensorsUpdate })
            .toJS();
        }
      });
    }
  }
  dragStart(contact) {
    const obj = {};
    obj[contact.id] = { x: 0, y: 0 };
    this.setState({
      movingContact: obj
    });
  }
  dragStop(contact, e, a) {
    const grid = document.querySelector('#sensorGrid');
    const gridRect = grid.getClientRects()[0];
    const x =
      (a.node.getBoundingClientRect().left -
        gridRect.left -
        gridRect.width / 2 +
        10) /
      (gridRect.width / 2);
    const y =
      (a.node.getBoundingClientRect().top -
        gridRect.top -
        gridRect.height / 2 +
        10) /
      (gridRect.height / 2);
    // Construct the new contact
    const newContact = Object.assign({}, contact, {
      location: {
        x,
        y: y,
        z: 0
      },
      destination: {
        x,
        y: y,
        z: 0
      }
    });
    delete newContact.iconUrl;
    delete newContact.pictureUrl;
    delete newContact.id;
    delete newContact.__typename;
    // Add the contact
    this.props.client.mutate({
      mutation: gql`
        mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
          createSensorContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id: this.props.data.sensors[0].id,
        contact: newContact
      }
    });
  }
  _addArmyContact() {
    const { armyContacts, id } = this.props.data.sensors[0] || {
      armyContacts: []
    };
    const templateContact = armyContacts[armyContacts.length - 1] || {
      name: 'Contact',
      size: 1,
      icon: '/Sensor Contacts/Icons/N',
      picture: '/Sensor Contacts/Pictures/N',
      infrared: false,
      cloaked: false
    };
    const defaultContact = {
      name: templateContact.name,
      size: templateContact.size,
      icon: templateContact.icon,
      picture: templateContact.picture,
      infrared: templateContact.infrared,
      cloaked: templateContact.cloaked
    };
    //Run the mutation to create the army contact
    this.props.client.mutate({
      mutation: ADD_ARMY_CONTACT,
      variables: Object.assign(
        {
          id: id
        },
        defaultContact
      )
    });
  }
  _updateArmyContact(contact, key, value) {
    const { id } = this.props.data.sensors[0];
    const newContact = {
      id: contact.id,
      name: contact.name,
      size: contact.size,
      icon: contact.icon,
      picture: contact.picture,
      speed: contact.speed,
      infrared: contact.infrared,
      cloaked: contact.cloaked
    };
    newContact[key] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!, $contact: SensorContactInput!) {
          updateSensorArmyContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id,
        contact: newContact
      }
    });
  }
  _updateSensorContact(contact, key, value) {
    const { id } = this.props.data.sensors[0];
    const newContact = {
      id: contact.id,
      name: contact.name,
      size: contact.size,
      icon: contact.icon,
      picture: contact.picture,
      speed: contact.speed,
      infrared: contact.infrared,
      cloaked: contact.cloaked
    };
    newContact[key] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!, $contact: SensorContactInput!) {
          updateSensorContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id,
        contact: newContact
      }
    });
  }
  _removeArmyContact(contact) {
    const { id } = this.props.data.sensors[0] || { armyContacts: [] };
    this.props.client.mutate({
      mutation: REMOVE_ARMY_CONTACT,
      variables: Object.assign({
        id: id,
        contact: contact.id
      })
    });
  }
  _contextMenu(contact, e) {
    e.preventDefault();
    const { top: outerTop, left: outerLeft } = document
      .getElementsByClassName('sensorGridCore')[0]
      .getBoundingClientRect();
    const { top, left } = e.target.getBoundingClientRect();
    const obj = {
      left: left - outerLeft + 20,
      top: top - outerTop,
      contact: contact
    };
    this.setState({
      contextContact: obj
    });
  }
  _closeContext() {
    this.setState({
      contextContact: null,
      selectedContact: null
    });
  }
  _clearContacts() {
    const mutation = gql`
      mutation DeleteContact($id: ID!) {
        removeAllSensorContacts(id: $id)
      }
    `;
    const { id } = this.props.data.sensors[0];
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _stopContacts() {
    const mutation = gql`
      mutation StopContacts($id: ID!) {
        stopAllSensorContacts(id: $id)
      }
    `;
    const { id } = this.props.data.sensors[0];
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _freezeContacts() {}
  _changeSpeed(e) {
    this.setState({
      speed: e.target.value
    });
  }
  _setSelectedContact(selectedContact) {
    this.setState({
      selectedContact
    });
  }
  render() {
    if (this.props.data.loading) return <p>Loading...</p>;
    if (!this.props.data.sensors[0]) return <p>No Sensor Grid</p>;
    const sensors = this.props.data.sensors[0];
    return (
      <Container className="sensorGridCore" fluid style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col sm={3}>
            <Input
              type="select"
              name="select"
              onChange={this._changeSpeed.bind(this)}
              defaultValue={this.state.speed}>
              <option value="1000">Instant</option>
              <option value="5">Warp</option>
              <option value="2">Very Fast</option>
              <option value="1">Fast</option>
              <option value="0.6">Moderate</option>
              <option value="0.4">Slow</option>
              <option value="0.1">Very Slow</option>
              <option disabled>─────────</option>
              <option>Timed</option>
            </Input>
            <Button
              size="sm"
              color="danger"
              onClick={this._clearContacts.bind(this)}>
              Clear
            </Button>
            <Button
              size="sm"
              color="warning"
              onClick={this._stopContacts.bind(this)}>
              Stop
            </Button>
            <Button
              size="sm"
              color="info"
              disabled
              onClick={this._freezeContacts.bind(this)}>
              Freeze
            </Button>
          </Col>
          <Col sm={9} style={{ height: '100%' }}>
            <Measure useClone={true} includeMargin={false}>
              {dimensions =>
                <div
                  id="threeSensors"
                  className="array"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}>
                  {dimensions.width > 0 &&
                    <Grid
                      mouseover={this.props.hoverContact}
                      core
                      dimensions={dimensions}
                      sensor={sensors.id}
                      moveSpeed={this.state.speed}
                      setSelectedContact={this._setSelectedContact.bind(this)}
                      selectedContact={this.state.selectedContact}
                      armyContacts={sensors.armyContacts}
                    />}
                </div>}
            </Measure>
          </Col>
          <Col sm={3} className="contacts-container">
            <p>Contacts:</p>
            <div className="contact-scroll">
              {sensors.armyContacts.map(contact => {
                return (
                  <Col key={contact.id} className={'flex-container'} sm={12}>
                    <Draggable
                      onStart={this.dragStart.bind(this, contact)}
                      onStop={this.dragStop.bind(this, contact)}
                      position={this.state.movingContact[contact.id]}>
                      <img
                        onContextMenu={this._contextMenu.bind(this, contact)}
                        draggable="false"
                        role="presentation"
                        className="armyContact"
                        src={contact.iconUrl}
                      />
                    </Draggable>
                    <label
                      onContextMenu={this._contextMenu.bind(this, contact)}>
                      {contact.name}
                    </label>
                    {this.state.removeContacts &&
                      <FontAwesome
                        name="ban"
                        className="text-danger pull-right clickable"
                        onClick={this._removeArmyContact.bind(this, contact)}
                      />}
                  </Col>
                );
              })}
            </div>
            <Button
              size="sm"
              color="success"
              onClick={this._addArmyContact.bind(this)}>
              Add Contact
            </Button>
            <label>
              <input
                type="checkbox"
                onChange={e => {
                  this.setState({ removeContacts: e.target.checked });
                }}
              />{' '}
              Remove
            </label>
            {this.state.contextContact &&
              <ContactContextMenu
                closeMenu={this._closeContext.bind(this)}
                updateArmyContact={this._updateArmyContact.bind(this)}
                contact={this.state.contextContact.contact}
                x={this.state.contextContact.left}
                y={0}
              />}
            {this.state.selectedContact &&
              <ContactContextMenu
                closeMenu={this._closeContext.bind(this)}
                updateArmyContact={this._updateSensorContact.bind(this)}
                contact={this.state.selectedContact}
                x={0}
                y={0}
              />}
          </Col>
        </Row>
      </Container>
    );
  }
}

const GRID_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId) {
      id
      type
      armyContacts {
        id
        name
        size
        icon
        iconUrl
        picture
        pictureUrl
        color
        infrared
        cloaked
        destroyed
      }
    }
  }
`;

export default graphql(GRID_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(GridCore));
