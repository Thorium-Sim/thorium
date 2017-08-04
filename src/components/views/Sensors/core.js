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
  probeData = probe => {
    const mutation = gql`
      mutation ProbeData($id: ID!, $data: String!) {
        probeProcessedData(id: $id, data: $data)
      }
    `;
    const variables = {
      id: probe.id,
      data: this.state.dataField
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const external = this.props.data.sensors.find(s => s.domain === 'external');
    //const internal = this.props.data.sensors.find(s => s.domain === 'internal');
    const probes = this.props.data.probes[0];
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
    return (
      <div style={{ height: '100%' }}>
        <div style={fieldStyle}>
          <OutputField style={{ flexGrow: 2 }} alert={external.scanning}>
            {external.scanRequest}
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
            onClick={this.sendScanResult.bind(this, external)}
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
            onClick={this.sendProcessedData.bind(this, external)}
            style={{ flexGrow: 4 }}
            size={'sm'}>
            Data
          </Button>
        </div>
        <div style={buttonStyle}>
          <Button
            onClick={() => this.probeData(probes)}
            style={{ flexGrow: 2 }}
            size={'sm'}>
            Probe Data
          </Button>
        </div>
      </div>
    );
  }
}

const SENSOR_QUERY = gql`
  query GetSensors($simulatorId: ID!) {
    sensors(simulatorId: $simulatorId) {
      id
      domain
      simulatorId
      scanResults
      scanRequest
      scanning
      processedData
    }
    probes(simulatorId: $simulatorId) {
      id
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(SensorsCore));
