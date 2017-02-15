import React, {Component} from 'react';
import { graphql, withApollo } from 'react-apollo';
import { Row, Col, ListGroup, ListGroupItem, Button, Card, CardBlock, Input } from 'reactstrap';
import gql from 'graphql-tag';

const SENSOR_SUB = gql`
subscription SensorsChanged {
  sensorsUpdate {
    id
    simulatorId
    scanResults
    scanRequest
    scanning
  }
}`;


class SecurityScans extends Component {
  constructor(props){
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      scanResults: '',
      scanRequest: '',
      weaponsRangePulse: 0,
      hoverContact: {name:'', pictureUrl: ''}
    };
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
    const nextSensors = nextProps.data.sensors[0];
    if (!nextProps.data.loading){
      if (this.props.data.loading){
        //First time load
        this.setState({
          scanResults:nextSensors.scanResults,
          scanRequest:nextSensors.scanRequest,
        })
      } else {
        //Every other load
        if (nextSensors.scanResults !== this.state.scanResults){
          if (this.state.scanResults === undefined){
            this.setState({
              scanResults: nextSensors.scanResults
            });
          } else {
            this.typeIn(nextSensors.scanResults,0,"scanResults");
          }
        }
      }
    }
  }
  _scanRequest() {
    // For now, include the location in the scan request string, not separately.
  }
  render(){
    if (this.props.data.loading) return null;
    return (<Row className="security-scans">
      <h1>Scans</h1>
      </Row>)
  }
}

const SENSOR_QUERY = gql`
query GetSensors($simulatorId: ID){
  sensors (simulatorId: $simulatorId, domain: "internal"){
    id
    simulatorId
    scanResults
    scanRequest
    scanning
  }
  decks(simulatorId: $simulatorId) {
    id
    number
    evac
    doors
    rooms {
      id
      name
      gas
    }
  }
}`;


export default graphql(SENSOR_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(SecurityScans));
