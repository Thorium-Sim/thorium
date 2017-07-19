import React, { Component } from 'react';
import { OutputField, TypingField } from '../../generic/core';
import { Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Immutable from 'immutable';
import ScanPresets from './ScanPresets';

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
  }
`;

class SensorsCore extends Component {
  constructor(props) {
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      dataField: ''
    };
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
  sendScanResult(sensors) {
    this.props.client.mutate({
      mutation: gql`
        mutation SensorScanResult($id: ID!, $result: String!) {
          sensorScanResult(id: $id, result: $result)
        }
      `,
      variables: {
        id: sensors.id,
        result: this.state.dataField
      }
    });
  }
  sendProcessedData(sensors) {
    this.props.client.mutate({
      mutation: gql`
        mutation ProcessedData($id: ID!, $data: String!) {
          processedData(id: $id, data: $data)
        }
      `,
      variables: {
        id: sensors.id,
        data: this.state.dataField
      }
    });
  }
  flash() {}
  scanPreset = evt => {
    let dataField = evt.target.value;
    if (dataField === 'omnicourse') {
      dataField = `Course Calculated:
X: ${Math.round(Math.random() * 100000) / 100}
Y: ${Math.round(Math.random() * 100000) / 100}
Z: ${Math.round(Math.random() * 100000) / 100}`;
    }
    this.setState({
      dataField
    });
  };
  render() {
    const { objectId } = this.props;
    const sensors = this.props.data.loading
      ? {}
      : objectId
        ? this.props.data.sensors.find(s => s.id === objectId)
        : this.props.data.sensors[0];
    const fieldStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: 'calc(100% - 40px)'
    };
    const buttonStyle = {
      display: 'flex',
      height: 22
    };
    if (this.props.data.loading) return <span>Loading...</span>;
    console.log(this.state.dataField);
    return (
      <div style={{ height: '100%' }}>
        <div style={fieldStyle}>
          <OutputField style={{ flexGrow: 2 }} alert={sensors.scanning}>
            {sensors.scanRequest}
          </OutputField>
          <TypingField
            style={{ flexGrow: 6 }}
            controlled
            onChange={e => {
              this.setState({ dataField: e.target.value });
            }}
            value={this.state.dataField}
          />
        </div>
        <div style={buttonStyle}>
          <Button
            onClick={this.sendScanResult.bind(this, sensors)}
            style={{ flexGrow: 2 }}
            size={'sm'}>
            Send
          </Button>
          <Button
            onClick={this.flash.bind(this)}
            style={{ flexGrow: 1 }}
            size={'sm'}>
            Flash
          </Button>
          <select
            value={'answers'}
            onChange={this.scanPreset}
            style={{ flexGrow: 4, maxWidth: 100 }}>
            <option value={'answers'} disabled>
              Answers
            </option>
            {ScanPresets.map(p =>
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            )}
          </select>
          <select disabled style={{ flexGrow: 4 }}>
            <option>Info</option>
          </select>
          <Button
            onClick={this.sendProcessedData.bind(this, sensors)}
            style={{ flexGrow: 4 }}
            size={'sm'}>
            Data
          </Button>
        </div>
      </div>
    );
  }
}

const SENSOR_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId) {
      id
      domain
      simulatorId
      scanResults
      scanRequest
      scanning
      processedData
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(SensorsCore));
