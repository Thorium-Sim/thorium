import React, { Component } from 'react';
import { InputField, OutputField, TypingField } from '../../generic/core';
import gql from 'graphql-tag';
import { fromTo } from 'gsap';
import { graphql, withApollo } from 'react-apollo';
import SensorGrid from './SensorGrid.js';
import distance from '../../../helpers/distance';
import Measure from 'react-measure';
import Draggable from 'react-draggable';
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import './gridCore.scss';

class GridCore extends Component {
  constructor(props){
    super(props);
    this.state = {
      movingContact: {}
    }
  }
  dragStart(contact, e, a){
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
  render(){
    if (this.props.data.error) console.error(this.props.data.error);
    const sensors = !this.props.data.loading ? this.props.data.sensors[0] : {armyContacts: []}
    return (
      <div className="sensorGridCore">
      <p>Sensor Grid</p>
      {
        this.props.data.loading ? 'Loading...' : 
        <Container fluid>
        <Row>
        <Col sm={8} style={{backgroundColor: 'gray'}}>
        <div className="heightPlaceholder"></div>
        <div className="spacer"></div>
        <Measure>
        { dimensions => (
          <div id="threeSensors" className='array' style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          {(() => console.log(dimensions) /*This is apparently necessary*/)()}
          {dimensions.width > 0 &&
            <SensorGrid sensor={sensors.id} dimensions={dimensions} /> 
          }
          </div>
          ) }
        </Measure>
        </Col>
        <Col sm={4}>
        <p>Contacts:</p>        
        {
          sensors.armyContacts.map((contact) => {
            return <Col key={contact.id} sm={12}>
            <Draggable
            onStart={this.dragStart.bind(this, contact)}
            onStop={this.dragStop.bind(this, contact)}
            position={this.state.movingContact[contact.id]}
            >
            <img key={contact.id} draggable="false" role="presentation" src={contact.iconUrl} style={{width: '16px', height: '16px'}} />
            </Draggable>
            <TypingField style={{width: 'calc(100% - 20px)'}}value={contact.name} /> 
            </Col>
          })
        }
        </Col>
        </Row>
        </Container>
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
  options: (props) => ({ variables: { simulatorId: 'test' } }),
})(withApollo(GridCore));