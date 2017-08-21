import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import {
  Row,
  Col,
  Button,
  Input,
  Card,
  CardBlock,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import gql from "graphql-tag";
import moment from "moment";
import assetPath from "../../../helpers/assets";
import Immutable from "immutable";
import DamageOverlay from "../helpers/DamageOverlay";
import "./style.scss";

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
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ sensors: subscriptionData.data.sensorsUpdate })
            .toJS();
        }
      });
    }
    const nextSensors = nextProps.data.sensors[0];
    if (!nextProps.data.loading) {
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
      if (this.state.selectedRoom !== "") {
        roomName = deck.rooms.find(r => r.id === this.state.selectedRoom).name;
      }
    }
    const request = `${moment().format("h:mm:ss a")} - ${this.state
      .selectedScanType} - ${deckName}${roomName && ", "}${roomName}\n${this
      .state.scanRequest}`;
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
    if (this.props.data.loading) return null;
    const { scanning } = this.props.data.sensors[0];
    const decks = [{ id: null }].concat(this.props.data.decks);
    let rooms;
    if (this.state.selectedDeck && this.state.selectedDeck !== "All Decks") {
      rooms = [{ id: null }].concat(
        decks.find(d => d.id === this.state.selectedDeck).rooms
      );
    }
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
          <Row>
            <Col sm={"auto"}>
              <UncontrolledDropdown>
                <DropdownToggle block caret>
                  {this.state.selectedDeck
                    ? `Deck ${decks.find(d => d.id === this.state.selectedDeck)
                        .number}`
                    : "All Decks"}
                </DropdownToggle>
                <DropdownMenu>
                  {decks
                    .concat()
                    .sort((a, b) => {
                      if (a.number > b.number) return -1;
                      if (b.number > a.number) return 1;
                      return 0;
                    })
                    .map(d =>
                      <DropdownItem
                        key={d.id}
                        onClick={() => {
                          this.setState({
                            selectedDeck: d.id,
                            selectedRoom: null
                          });
                        }}
                      >
                        {d.number ? `Deck ${d.number}` : `All Decks`}
                      </DropdownItem>
                    )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col>
              <UncontrolledDropdown>
                <DropdownToggle
                  disabled={
                    !this.state.selectedDeck ||
                    this.state.selectedDeck === "All Decks"
                  }
                  block
                  caret
                >
                  {this.state.selectedRoom
                    ? decks
                        .find(d => d.id === this.state.selectedDeck)
                        .rooms.find(r => r.id === this.state.selectedRoom).name
                    : "Entire Deck"}
                </DropdownToggle>
                {this.state.selectedDeck &&
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        this.setState({ selectedRoom: null });
                      }}
                    >
                      Deck{" "}
                      {decks.find(d => d.id === this.state.selectedDeck).number}
                    </DropdownItem>
                    {rooms.map(r =>
                      <DropdownItem
                        key={r.id}
                        onClick={() => {
                          this.setState({ selectedRoom: r.id });
                        }}
                      >
                        {r.name}
                      </DropdownItem>
                    )}
                  </DropdownMenu>}
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <h4>Scan Input:</h4>
          </Row>
          <Row>
            <Col>
              <Input
                type="text"
                onChange={this._setScanRequest.bind(this)}
                value={this.state.scanRequest}
              />
            </Col>
          </Row>
          {scanning
            ? <div>
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
            : <div>
                <Row>
                  <Col sm="auto">
                    <Button size="lg" onClick={this._scanRequest.bind(this)}>
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
                      <CardBlock>
                        <p>
                          {this.state.scanResults}
                        </p>
                      </CardBlock>
                    </Card>
                  </Col>
                </Row>
              </div>}
        </Col>
        <Col sm={{ size: 2, offset: 1 }}>
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
