import React, { Component } from "react";
import { OutputField, TypingField } from "../../generic/core";
import { Button, Container, Row, Col } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import ScanPresets from "./ScanPresets";
import { subscribe } from "../helpers/pubsub";

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
      history
      scans {
        id
        request
        mode
        location
        response
        scanning
        timestamp
        cancelled
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
            sensors: subscriptionData.data.sensorsUpdate
          });
        }
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keypress);
    this.sensorDataBox = subscribe("sensorData", data => {
      this.setState({
        dataField: data
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypress);
    this.sensorsSubscription && this.sensorsSubscription();
    this.sensorDataBox && this.sensorDataBox();
  }
  keypress = evt => {
    if (evt.altKey) {
      evt.preventDefault();
      const index = parseInt(evt.code.substr(-1, 1), 10);
      if (!isNaN(index)) {
        const data = index === 0 ? ScanPresets[10] : ScanPresets[index - 1];
        this.scanPreset({ target: { value: data.value } });
      }
    }
  };
  sendScanResult = sensors => {
    let mutation;
    let variables;
    if (sensors.history) {
      if (!this.state.selectedScan) return;
      mutation = gql`
        mutation ScanResponse($id: ID!, $scan: SensorScanInput!) {
          updateSensorScan(id: $id, scan: $scan)
        }
      `;
      variables = {
        id: sensors.id,
        scan: {
          id: this.state.selectedScan,
          response: this.state.dataField
        }
      };
    } else {
      mutation = gql`
        mutation SensorScanResult($id: ID!, $result: String!) {
          sensorScanResult(id: $id, result: $result)
        }
      `;
      variables = {
        id: sensors.id,
        result: this.state.dataField
      };
    }
    this.props.client.mutate({
      mutation,
      variables
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
      domain: which,
      selectedScan: null
    });
    localStorage.setItem("sensorCore-domain", which);
  };
  setSensorsHistory = e => {
    const external = this.props.data.sensors.find(s => s.domain === "external");
    const internal = this.props.data.sensors.find(s => s.domain === "internal");
    const sensor = this.state.domain === "external" ? external : internal;

    const mutation = gql`
      mutation SensorsHistory($id: ID!, $history: Boolean!) {
        setSensorsHistory(id: $id, history: $history)
      }
    `;
    const variables = {
      id: sensor.id,
      history: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  selectScan = ({ id, response }) => {
    this.setState({
      selectedScan: id,
      dataField: response
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.sensors) return null;
    const external = this.props.data.sensors.find(s => s.domain === "external");
    const internal = this.props.data.sensors.find(s => s.domain === "internal");
    const sensor = this.state.domain === "external" ? external : internal;
    const probes = this.props.data.probes[0];
    const fieldStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      height: "100%",
      minHeight: "20vh"
    };
    const buttonStyle = {
      display: "flex",
      height: 22
    };
    const { selectedScan } = this.state;
    if (!sensor) return <p>No Sensors</p>;
    const scan = sensor.scans.find(s => s.id === selectedScan);
    if (this.props.data.loading) return <span>Loading...</span>;
    return (
      <Container className="sensor-core" style={{ height: "100%" }}>
        <Row>
          <Button
            size="sm"
            className={`${this.state.domain === "external" ? "active" : ""} ${
              external.scanning ? "btn-danger" : ""
            }`}
            onClick={() => this.setDomain("external")}
          >
            External
          </Button>
          <Button
            size="sm"
            className={`${this.state.domain === "internal" ? "active" : ""} ${
              internal.scanning ? "btn-danger" : ""
            }`}
            onClick={() => this.setDomain("internal")}
          >
            Internal
          </Button>
          <label>
            <input
              type="checkbox"
              checked={sensor.history}
              onChange={this.setSensorsHistory}
            />
            History
          </label>
        </Row>
        <Row style={{ height: "calc(100% - 100px)" }}>
          {sensor.history && (
            <Col sm={4}>
              <div className="scan-list">
                {sensor.scans
                  .concat()
                  .reverse()
                  .map(s => (
                    <p
                      key={s.id}
                      className={`${s.cancelled ? "text-danger" : ""} ${
                        selectedScan === s.id ? "selected" : ""
                      } ${!s.cancelled && !s.scanning ? "text-success" : ""}`}
                      onClick={() => this.selectScan(s)}
                    >
                      {s.request.substr(0, 15)}...{" "}
                      {s.scanning && <FontAwesome name="refresh" spin />}
                    </p>
                  ))}
              </div>
            </Col>
          )}
          <Col sm={sensor.history ? 8 : 12}>
            <div style={fieldStyle}>
              <OutputField
                style={{ flexGrow: 2 }}
                alert={sensor.history ? scan && scan.scanning : sensor.scanning}
              >
                {(() => {
                  if (sensor.history) {
                    if (scan) {
                      const date = new Date(scan.timestamp);
                      return (
                        `${date.toLocaleTimeString()} - ${
                          scan.mode
                        }${scan.location && " - " + scan.location}` +
                        "\n" +
                        scan.request
                      );
                    }
                    return "";
                  }
                  return sensor.scanRequest;
                })()}
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
          </Col>
        </Row>
        <Row style={buttonStyle}>
          <Button
            onClick={() => this.sendScanResult(sensor)}
            style={{ flexGrow: 2 }}
            size={"sm"}
          >
            Send
          </Button>
          {/*<Button
            onClick={this.flash.bind(this)}
            style={{ flexGrow: 1 }}
            size={"sm"}
          >
            Flash
          </Button>*/}
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
        </Row>
        <Row style={buttonStyle}>
          <Button
            onClick={() => this.probeData(probes)}
            style={{ flexGrow: 2 }}
            size={"sm"}
          >
            Probe Data
          </Button>
        </Row>
      </Container>
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
      history
      scans {
        id
        request
        mode
        location
        response
        scanning
        timestamp
        cancelled
      }
    }
    probes(simulatorId: $simulatorId) {
      id
    }
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(SensorsCore));
