import React, { Component } from "react";
import { OutputField, TypingField } from "../../generic/core";
import { Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import ScanPresets from "./ScanPresets";

const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId) {
      id
      domain
      simulatorId
      scanResults
      scanRequest
      processedData
      scanning
      presetAnswers {
        label
        value
      }
    }
  }
`;

class SensorsCore extends Component {
  constructor(props) {
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      dataField: "",
      domain: localStorage.getItem("sensorCore-domain") || "external"
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            sensors: subscriptionData.sensorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
  }
  sendScanResult = sensors => {
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
  };
  sendProcessedData(sensors) {
    this.props.client.mutate({
      mutation: gql`
        mutation ProcessedData($id: ID, $data: String!) {
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
    if (dataField === "omnicourse") {
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
  setDomain = which => {
    this.setState({
      domain: which
    });
    localStorage.setItem("sensorCore-domain", which);
  };
  render() {
    if (this.props.data.loading) return null;
    const external = this.props.data.sensors.find(s => s.domain === "external");
    const internal = this.props.data.sensors.find(s => s.domain === "internal");
    const sensor = this.state.domain === "external" ? external : internal;
    const probes = this.props.data.probes[0];
    const fieldStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      height: "calc(100% - 100px)",
      minHeight: "20vh"
    };
    const buttonStyle = {
      display: "flex",
      height: 22
    };
    if (this.props.data.loading) return <span>Loading...</span>;
    return (
      <div style={{ height: "100%" }}>
        <div>
          <Button
            size="sm"
            className={`${this.state.domain === "external"
              ? "focus"
              : ""} ${external.scanning ? "btn-danger" : ""}`}
            onClick={() => this.setDomain("external")}
          >
            External
          </Button>
          <Button
            size="sm"
            className={`${this.state.domain === "internal"
              ? "focus"
              : ""} ${internal.scanning ? "btn-danger" : ""}`}
            onClick={() => this.setDomain("internal")}
          >
            Internal
          </Button>
        </div>
        <div style={fieldStyle}>
          <OutputField style={{ flexGrow: 2 }} alert={sensor.scanning}>
            {sensor.scanRequest}
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
            onClick={() => this.sendScanResult(sensor)}
            style={{ flexGrow: 2 }}
            size={"sm"}
          >
            Send
          </Button>
          <Button
            onClick={this.flash.bind(this)}
            style={{ flexGrow: 1 }}
            size={"sm"}
          >
            Flash
          </Button>
          <select
            value={"answers"}
            onChange={this.scanPreset}
            style={{ flexGrow: 4, maxWidth: 100 }}
          >
            <option value={"answers"} disabled>
              Answers
            </option>
            {ScanPresets.map(p => (
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <select
            onChange={this.scanPreset}
            value={"answers"}
            style={{ flexGrow: 4, maxWidth: 50 }}
          >
            <option disabled value={"answers"}>
              Info
            </option>
            {sensor.presetAnswers.map(p => (
              <option key={`${p.label}-${p.value}`} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <Button
            onClick={this.sendProcessedData.bind(this, external)}
            style={{ flexGrow: 4 }}
            size={"sm"}
          >
            Data
          </Button>
        </div>
        <div style={buttonStyle}>
          <Button
            onClick={() => this.probeData(probes)}
            style={{ flexGrow: 2 }}
            size={"sm"}
          >
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
      presetAnswers {
        label
        value
      }
    }
    probes(simulatorId: $simulatorId) {
      id
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(SensorsCore));
