import React, { Component } from 'react';
import { InputField, OutputField, TypingField } from '../../generic/core';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import SensorGrid from './SensorGrid.js';
import Measure from 'react-measure';
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import './gridCore.scss';

class GridCore extends Component {

  render(){
    console.log(this.props.data);
    if (this.props.data.error) console.error(this.props.data.error);
    const sensors = !this.props.data.loading ? this.props.data.sensors[0] : {armyContacts: []}
    return (
      <div>
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
            <SensorGrid dimensions={dimensions} /> 
          }
          </div>
          ) }
        </Measure>
        </Col>
        <Col sm={4}>
        <p>Contacts:</p>        
        {
          sensors.armyContacts.map((contact) => {
            return <Col sm={12}>
            <img key={contact.id} role="presentation" src={contact.iconUrl} style={{width: '16px', height: '16px'}} />
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