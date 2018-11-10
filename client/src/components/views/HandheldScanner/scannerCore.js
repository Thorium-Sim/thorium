import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { OutputField, TypingField } from "../../generic/core";
import ScanPresets from "../Sensors/ScanPresets";

function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

class ScannerCore extends Component {
  state = { changed: {} };
  componentDidUpdate(prevProps) {
    const { keypads } = this.props;
    const { keypads: oldKeypads } = prevProps;
    const clients = this.props.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => keypads.find(k => k.id === c.id));
    const oldClients = prevProps.clients
      .filter(c => c.station && c.station.name === "RemoteAccess")
      .map(c => oldKeypads.find(k => k.id === c.id));
    // If the entered field is different, trigger an update
    const diffs = {};
    clients.forEach(c => {
      const oldClient = oldClients.find(o => c.id === o.id);
      if (oldClient.enteredCode.join("") !== c.enteredCode.join("")) {
        diffs[c.id] = true;
      }
    });
    if (Object.keys(diffs).length > 0) {
      this.setState(state => ({
        changed: { ...state.changed, ...diffs }
      }));
    }
  }
  scanPreset = evt => {
    let dataField = evt.target.value;
    if (dataField === "omnicourse") {
      dataField = `Course Calculated:
      X: ${Math.round(Math.random() * 100000) / 100}
      Y: ${Math.round(Math.random() * 100000) / 100}
      Z: ${Math.round(Math.random() * 100000) / 100}`;
    }
    if (dataField === "thrusterdodge") {
      dataField = `Incoming weapons detected. Recommend firing ${randomFromList(
        ["port", "starboard", "forward", "reverse", "up", "down"]
      )} thrusters to dodge.`;
    }
    this.setState({
      dataField
    });
  };
  render() {
    const screens = ["MedicalTricorder", "Tricorder"];
    const { scanners } = this.props;
    const { selectedScanner } = this.state;
    const clients = this.props.clients
      .filter(c => c.station && screens.indexOf(c.station.name) > -1)
      .map(c => scanners.find(k => k.id === c.id));
    const scanner = scanners.find(k => k.id === selectedScanner);

    const fieldStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      height: "100%"
    };

    return clients.length === 0 ? (
      <p>No handheld scanners. Use the Thorium Mobile app to use this core.</p>
    ) : (
      <Container className="handheldScanner-core">
        <Row>
          <Col sm={4}>
            <ListGroup>
              {clients.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedScanner}
                  onClick={() =>
                    this.setState(state => ({
                      selectedScanner: c.id
                    }))
                  }
                  style={{
                    backgroundColor: c.scanning ? `rgba(255, 0, 0, 0.3)` : null
                  }}
                >
                  {c.id}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          {scanner && (
            <Col sm={8}>
              <div style={fieldStyle}>
                <OutputField
                  style={{ flexGrow: 2, minHeight: "44px" }}
                  alert={scanner.scanning}
                >
                  {scanner.scanRequest}
                </OutputField>
                <TypingField
                  style={{ flexGrow: 6, minHeight: "44px" }}
                  controlled
                  onChange={e => {
                    this.setState({ dataField: e.target.value });
                  }}
                  value={this.state.dataField}
                />
                <div style={{ display: "flex" }}>
                  <Mutation
                    mutation={gql`
                      mutation ScannerResponse($id: ID!, $response: String!) {
                        handheldScannerResponse(id: $id, response: $response)
                      }
                    `}
                  >
                    {action => (
                      <Button
                        onClick={() =>
                          action({
                            variables: {
                              id: scanner.id,
                              response: this.state.dataField
                            }
                          })
                        }
                        style={{ flexGrow: 2 }}
                        size={"sm"}
                        color="primary"
                      >
                        Send
                      </Button>
                    )}
                  </Mutation>
                  <select
                    value={"answers"}
                    onChange={this.scanPreset}
                    style={{ flexGrow: 4, maxWidth: 100 }}
                  >
                    <option value={"answers"} disabled>
                      Answers
                    </option>
                    {ScanPresets().map(p => (
                      <option key={p.label} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {/* <select
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
            </select> */}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
export default ScannerCore;
