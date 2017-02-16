import React, { Component } from 'react';
import { OutputField, TypingField } from '../../generic/core';
import { Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const SENSOR_SUB = gql`
subscription SensorsChanged {
  sensorsUpdate {
    id
    simulatorId
    scanResults
    scanRequest
    processedData
    scanning
  }
}`;

class SensorsCore extends Component {
  constructor(props){
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      dataField: ''
    }
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
  sendScanResult(sensors){
    this.props.client.mutate({
      mutation: gql`
      mutation SensorScanResult($id: ID!, $result: String!){
        sensorScanResult(id:$id, result: $result)
      }`,
      variables: {
        id: sensors.id,
        result: this.state.dataField
      }
    })
  }
  sendProcessedData(sensors){
    this.props.client.mutate({
      mutation: gql`
      mutation ProcessedData($id: ID!, $data: String!){
        processedData(id:$id, data: $data)
      }`,
      variables: {
        id: sensors.id,
        data: this.state.dataField
      }
    })
  }
  flash(){

  }
  render() {
    const sensors = this.props.data.loading ? {} : this.props.data.sensors[0];
    const fieldStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: 'calc(100% - 40px)',
    }
    const buttonStyle = {
      display: 'flex',
      height: 22,
    }
    return (<div>
      <p>Sensor Scans</p>
      {
        this.props.data.loading ? <span>Loading...</span> :
        <div>
        <div style={fieldStyle}>
        <OutputField style={{flexGrow: 2}} alert={sensors.scanning}>{sensors.scanRequest}</OutputField>
        <TypingField style={{flexGrow: 6}} onChange={(e) => {this.setState({dataField: e.target.value})}} value={this.state.dataField} />
        </div>
        <div style={buttonStyle}>
        <Button onClick={this.sendScanResult.bind(this, sensors)} style={{flexGrow: 2}} size={'sm'}>Send</Button>
        <Button onClick={this.flash.bind(this)} style={{flexGrow: 1}} size={'sm'}>Flash</Button>
        <select style={{flexGrow: 4}}>
        <option>Scan Answers</option>
        </select>
        <select style={{flexGrow: 4}}>
        <option>Sensor Info</option>
        </select>
        <Button onClick={this.sendProcessedData.bind(this, sensors)} style={{flexGrow: 4}} size={'sm'}>Processed Data</Button>
        </div>
        </div>
      }
      </div>
      );
  }
}

const SENSOR_QUERY = gql`
query GetSensors($simulatorId: ID){
  sensors (simulatorId: $simulatorId){
    id
    simulatorId
    scanResults
    scanRequest
    scanning
    processedData
  }
}`;

export default  graphql(SENSOR_QUERY, {
    options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(SensorsCore));