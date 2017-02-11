import React, { Component } from 'react';
import { TypingField } from '../../generic/core';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import SensorGrid from './SensorGrid.js';
import Measure from 'react-measure';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import ContactContextMenu from './contactContextMenu';
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap';
import './gridCore.scss';

const ADD_ARMY_CONTACT = gql`
mutation ($id:ID!, $name: String, $size: Float, $icon: String, $picture: String, $infrared: Boolean, $cloaked: Boolean){
  createSensorArmyContact(id: $id, contact: {
    name: $name,
    size: $size,
    icon: $icon,
    picture: $picture,
    infrared: $infrared,
    cloaked: $cloaked
  } )
}`;

const REMOVE_ARMY_CONTACT = gql`
mutation ($id: ID!, $contact: ID!) {
  removeSensorArmyContact(id: $id, contact: $contact)
}`;

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
      infrared
      cloaked
      destroyed
    }
  }
}`;

class GridCore extends Component {
  constructor(props){
    super(props);
    this.state = {
      movingContact: {},
      removeContacts: false,
      contextContact: null,
    }
    this.sensorsSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.sensors = previousResult.sensors.map(sensor => {
            if (sensor.id === subscriptionData.data.sensorsUpdate.id){
              return subscriptionData.data.sensorsUpdate;
            } 
            return sensor;
          })
          return previousResult;
        },
      });
    }
  }
  dragStart(contact){
    const obj = {};
    obj[contact.id] = {x: 0, y: 0}
    this.setState({
      movingContact: obj
    })
  }
  dragStop(contact, e, a){
    const grid = document.querySelector('#sensorGrid');
    const gridRect = grid.getClientRects()[0];
    const x = (a.node.getBoundingClientRect().left - gridRect.left - gridRect.width/2 + 10) / (gridRect.width/2)
    const y = (a.node.getBoundingClientRect().top  - gridRect.top - gridRect.height/2 + 10) / (gridRect.height/2)
    // Construct the new contact
    delete contact.iconUrl;
    delete contact.pictureUrl;
    delete contact.id;
    delete contact.__typename;
    const newContact = Object.assign(contact, {
      location: {
        x,
        y: y * -1,
        z: 0
      },
      destination: {
        x,
        y: y * -1,
        z: 0
      }
    })
    // Add the contact
    this.props.client.mutate({
      mutation: gql`
      mutation CreateContact($id: ID!, $contact: SensorContactInput!){
        createSensorContact(id: $id, contact: $contact)
      }`,
      variables: {
        id: this.props.data.sensors[0].id,
        contact: newContact
      }
    })
  }
  _addArmyContact(){
    const {armyContacts, id} = this.props.data.sensors[0] || {armyContacts: []};
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
      cloaked: templateContact.cloaked,
    }
    //Run the mutation to create the army contact
    this.props.client.mutate({
      mutation: ADD_ARMY_CONTACT,
      variables: Object.assign({
        id: id,
      }, defaultContact)
    })
  }
  _updateArmyContact(contact){
    const { id } = this.props.data.sensors[0];
    this.props.client.mutate({
      mutation: gql`
      mutation ($id:ID!, $contact: SensorContactInput!){
        updateSensorArmyContact(id: $id, contact: $contact)
      }`,
      variables: {
        id,
        contact: {
          id: contact.id,
          name: contact.name,
          size: contact.size,
          icon: contact.icon,
          picture: contact.picture,
          speed: contact.speed,
          infrared: contact.infrared,
          cloaked: contact.cloaked,
        }
      }
    })
  }
  _removeArmyContact(contact){
    const { id } = this.props.data.sensors[0] || {armyContacts: []};
    this.props.client.mutate({
      mutation: REMOVE_ARMY_CONTACT,
      variables: Object.assign({
        id: id,
        contact: contact.id
      })
    });
  }
  _contextMenu(contact, e){
    e.preventDefault();
    const {top:outerTop, left:outerLeft} = document.getElementsByClassName('sensorGridCore')[0].getBoundingClientRect();
    const {top, left} = e.target.getBoundingClientRect();
    const obj = {
      left: left - outerLeft + 20,
      top: top - outerTop,
      contact: contact
    };
    this.setState({
      contextContact: obj
    });
  }
  render(){
    console.log(this.state);
    if (this.props.data.error) console.error(this.props.data.error);
    const sensors = !this.props.data.loading ? this.props.data.sensors[0] : {armyContacts: []}
    return (
      <div className="sensorGridCore" onClick={(e) => {if (e.target.className[0] === 'sensorGridCore') this.setState({contextContact: null})}}>
      <p>Sensor Grid</p>
      {
        this.props.data.loading ? 'Loading...' : 
        (this.props.data.sensors.length > 0 ? <Container fluid>
        <Row>
        <Col sm={8} style={{backgroundColor: 'gray'}}>
        <div className="heightPlaceholder"></div>
        <div className="spacer"></div>
        <Measure>
        { dimensions => (
          <div id="threeSensors" className='array' style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          {(() => console.log(dimensions) /*This is apparently necessary*/)()}
          {dimensions.width > 0 &&
            <SensorGrid
            core={true}
            sensor={sensors.id}
            dimensions={dimensions}
            hoverContact={() => {}}
            /> 
          }
          </div>
          ) }
        </Measure>
        </Col>
        <Col sm={4}>
        <p>Contacts:</p>
        {
          sensors.armyContacts.map((contact) => {
            return <Col key={contact.id} className={'flex-container'} sm={12}>
            <Draggable
            onStart={this.dragStart.bind(this, contact)}
            onStop={this.dragStop.bind(this, contact)}
            position={this.state.movingContact[contact.id]}
            >
            <img onContextMenu={this._contextMenu.bind(this, contact)} draggable="false" role="presentation" className="armyContact" src={contact.iconUrl} />
            </Draggable>
            <TypingField input={true} value={contact.name} onChange={(e) => {contact.name = e.target.value; this._updateArmyContact(contact)}} /> 
            {this.state.removeContacts && 
              <FontAwesome name="ban" className="text-danger pull-right clickable" onClick={this._removeArmyContact.bind(this, contact)} />
            }
            </Col>
          })
        }
        <Button size="sm" color="success" onClick={this._addArmyContact.bind(this)}>Add Contact</Button>
        <label><input type="checkbox" onChange={(e) => {this.setState({removeContacts: e.target.checked})}} /> Remove</label>
        { this.state.contextContact && 
          <ContactContextMenu updateArmyContact={this._updateArmyContact.bind(this)} contact={this.state.contextContact.contact} x={this.state.contextContact.left} y={this.state.contextContact.top}/>
        }
        </Col>
        </Row>
        </Container> : "No Sensors")
      }
      </div>
      )
  }
}

const GRID_QUERY = gql`
query GetSensors($simulatorId: ID){
  sensors (simulatorId: $simulatorId){
    id
    type
    contacts {
      id
      name
      size
      icon
      picture
      speed 
      velocity {
        x
        y
        z
      }
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
    armyContacts {
      id
      name
      size
      icon
      iconUrl
      picture
      pictureUrl
      infrared
      cloaked
      destroyed
    }
  }
}`;

export default  graphql(GRID_QUERY, {
    options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(GridCore));