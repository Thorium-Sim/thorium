import React, { Component } from 'react';
import { OutputField, TypingField } from '../../generic/core';
import { Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Immutable from 'immutable';

const SENSOR_SUB = gql`
subscription SensorsChanged {
  sensorsUpdate {
    id
    domain
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
      dataField: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          debugger;
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({sensors: subscriptionData.data.sensorsUpdate}).toJS();
          /*
          previousResult.sensors = previousResult.sensors.map(sensor => {
            if (sensor.id === subscriptionData.data.sensorsUpdate.id){
              return subscriptionData.data.sensorsUpdate;
            } 
            return sensor;
          })
          return previousResult;*/
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
    const {objectId} = this.props; 
    const sensors = this.props.data.loading ? {} : 
    (objectId ? this.props.data.sensors.find(s => s.id === objectId) : this.props.data.sensors[0]);
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
    if (this.props.data.loading) return <span>Loading...</span>;
    return (<div>
    {
      this.props.data.sensors.map(s => 
        <Button key={s.id} onClick={this.props.updateObjectId.bind(this, s.id)} className={sensors.id === s.id ? 'active' : ''} size={'sm'}>{s.domain === 'external' ? 'Sensor Scans' : 'Internal Scans'}</Button>
        )
    }
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
    </div>
    );
  }
}

const SENSOR_QUERY = gql`
query GetSensors($simulatorId: ID){
  sensors (simulatorId: $simulatorId){
    id
    domain
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