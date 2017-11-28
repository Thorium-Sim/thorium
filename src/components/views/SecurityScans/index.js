import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import { Row, Col, Button, Input, Card, CardBody } from "reactstrap";
import gql from "graphql-tag";
import Tour from "reactour";

import { DeckDropdown, RoomDropdown } from "../helpers/shipStructure";
import assetPath from "../../../helpers/assets";
import DamageOverlay from "../helpers/DamageOverlay";
import "./style.css";

const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "internal") {
      id
      simulatorId
      scanResults
      scanRequest
      processedData
      scanning
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "There are sensors located throughout the entire ship which allow you to run scans. These scans could tell you about the location of people on the ship, or any other situation that is happening inside the ship."
  },
  {
    selector: ".scantype",
    content:
      "You can select a scan type from this list. This will focus your scan to a specific category."
  },
  {
    selector: ".locations",
    content:
      "Select where you want to scan here. The more specific your scan location, the faster your results will come."
  },
  {
    selector: ".scan-input",
    content: "Type in what you want to scan for here."
  },
  {
    selector: ".begin-scan",
    content: "Click here to begin your scan."
  },
  {
    selector: ".results",
    content: "The results of your scan will appear in this box."
  }
];

class SecurityScans extends Component {
  constructor(props) {
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      selectedDeck: null,
      selectedRoom: null,
      selectedScanType: "Standard",
      scanResults: "",
      scanRequest: ""
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
    if (!nextProps.data.loading && nextProps.data.sensors) {
      const nextSensors = nextProps.data.sensors[0];
      if (this.props.data.loading) {
        //First time load
        //Remove the first line of metadata;
        const request = nextSensors.scanRequest.split("\n");
        request.shift();
        this.setState({
          scanResults: nextSensors.scanResults,
          scanRequest: request.join("\n")
        });
      } else {
        //Every other load
        if (nextSensors.scanResults !== this.state.scanResults) {
          if (this.state.scanResults === undefined) {
            this.setState({
              scanResults: nextSensors.scanResults
            });
          } else {
            this.typeIn(nextSensors.scanResults, 0, "scanResults");
          }
        }
      }
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
  }
  _scanRequest() {
    // For now, include the location in the scan request string, not separately.
    if (this.state.scanRequest.trim().length === 0) return;
    let deckName = "All Decks";
    let roomName = "";
    if (this.state.selectedDeck && this.state.selectedDeck !== "All Decks") {
      const deck = this.props.data.decks.find(
        d => d.id === this.state.selectedDeck
      );
      deckName = "Deck " + deck.number;
      roomName = "Entire Deck";
      if (!this.state.selectedRoom || this.state.selectedRoom !== "") {
        const room = deck.rooms.find(r => r.id === this.state.selectedRoom);
        roomName = room ? room.name : roomName;
      }
    }
    const request = `${this.state.selectedScanType} - ${deckName}${roomName &&
      ", "}${roomName}\n${this.state.scanRequest}`;
    const obj = {
      id: this.props.data.sensors[0].id,
      request
    };
    this.props.client.mutate({
      mutation: gql`
        mutation SensorScanRequest($id: ID!, $request: String!) {
          sensorScanRequest(id: $id, request: $request)
        }
      `,
      variables: obj
    });
  }
  _stopScan() {
    let obj = {
      id: this.props.data.sensors[0].id
    };
    this.props.client.mutate({
      mutation: gql`
        mutation CancelScan($id: ID!) {
          sensorScanCancel(id: $id)
        }
      `,
      variables: obj
    });
  }
  typeIn(text, chars, stateProp) {
    let currentState = this.state;
    if (text) {
      if (text.length >= chars) {
        currentState[stateProp] = text.substring(chars, 0);
        this.setState(currentState);
        setTimeout(this.typeIn.bind(this, text, chars + 1, stateProp), 1);
      }
    }
  }
  _selectDeck(e) {
    this.setState({
      selectedDeck: e.target.value,
      selectedRoom: ""
    });
  }
  _selectRoom(e) {
    this.setState({
      selectedRoom: e.target.value
    });
  }
  _setSelectedScan(type) {
    this.setState({
      selectedScanType: type
    });
  }
  _setScanRequest(e) {
    this.setState({
      scanRequest: e.target.value
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.sensors) return null;
    const { scanning } = this.props.data.sensors[0];
    const decks = this.props.data.decks;
    return (
      <Row className="security-scans">
        <DamageOverlay
          message="Internal Sensors Offline"
          system={this.props.data.sensors[0]}
        />
        <Col sm={{ size: 6, offset: 2 }}>
          <Row>
            <h4>Location Select:</h4>
          </Row>
          <Row className="locations">
            <Col sm={"auto"}>
              <DeckDropdown
                selectedDeck={this.state.selectedDeck}
                decks={decks}
                allDecks
                disabled={scanning}
                setSelected={a =>
                  this.setState({
                    selectedDeck: a.deck,
                    selectedRoom: null
                  })}
              />
            </Col>
            <Col>
              <RoomDropdown
                selectedDeck={this.state.selectedDeck}
                selectedRoom={this.state.selectedRoom}
                decks={decks}
                disabled={scanning}
                setSelected={a =>
                  this.setState({
                    selectedRoom: a.room
                  })}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <h4>Scan Input:</h4>
          </Row>
          <Row className="scan-input">
            <Col>
              <Input
                type="text"
                onChange={this._setScanRequest.bind(this)}
                value={this.state.scanRequest}
              />
            </Col>
          </Row>
          {scanning ? (
            <div>
              <Row>
                <Col sm="auto">
                  <Button
                    size="lg"
                    color="danger"
                    onClick={this._stopScan.bind(this)}
                  >
                    Cancel Scan
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "50px" }}>
                <h4 className="text-center">Scan in progress...</h4>
                <Card className="scannerBox">
                  <img
                    alt="ship view"
                    role="presentation"
                    className="mw-100 ship-image"
                    draggable="false"
                    src={assetPath(
                      "/Ship Views/Right",
                      "default",
                      "png",
                      false
                    )}
                  />
                  <div className="scanner" />
                </Card>
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col sm="auto">
                  <Button
                    className="begin-scan"
                    size="lg"
                    onClick={this._scanRequest.bind(this)}
                  >
                    Begin Scan
                  </Button>
                </Col>
                <Col sm="auto">
                  <Button color="warning" size="lg">
                    Clear
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "50px" }}>
                <h4>Scan Results:</h4>
              </Row>
              <Row>
                <Col>
                  <Card className="results">
                    <CardBody>
                      <p>{this.state.scanResults}</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col sm={{ size: 2, offset: 1 }} className="scantype">
          <h4>Scan Type:</h4>
          <Button
            block
            onClick={this._setSelectedScan.bind(this, "Standard")}
            className={
              this.state.selectedScanType === "Standard" ? "active" : ""
            }
          >
            Standard
          </Button>
          <Button
            block
            onClick={this._setSelectedScan.bind(this, "Organic")}
            className={
              this.state.selectedScanType === "Organic" ? "active" : ""
            }
          >
            Organic
          </Button>
          <Button
            block
            onClick={this._setSelectedScan.bind(this, "Inorganic")}
            className={
              this.state.selectedScanType === "Inorganic" ? "active" : ""
            }
          >
            Inorganic
          </Button>
          <Button
            block
            onClick={this._setSelectedScan.bind(this, "Infrared")}
            className={
              this.state.selectedScanType === "Infrared" ? "active" : ""
            }
          >
            Infrared
          </Button>
          <Button
            block
            onClick={this._setSelectedScan.bind(this, "Subspace")}
            className={
              this.state.selectedScanType === "Subspace" ? "active" : ""
            }
          >
            Subspace
          </Button>
        </Col>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Row>
    );
  }
}

const SENSOR_QUERY = gql`
  query GetSensors($simulatorId: ID!) {
    sensors(simulatorId: $simulatorId, domain: "internal") {
      id
      simulatorId
      scanResults
      scanRequest
      scanning
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
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
  }
`;

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(SecurityScans));
