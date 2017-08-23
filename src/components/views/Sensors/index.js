import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Button, Row, Col, Card, CardBlock } from "reactstrap";
import Immutable from "immutable";
import "./style.scss";
import Grid from "./GridDom";
import Measure from "react-measure";
import DamageOverlay from "../helpers/DamageOverlay";
import SensorScans from "./SensorScans";

const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      id
      simulatorId
      scanResults
      scanRequest
      processedData
      scanning
      pings
      pingMode
      timeSincePing
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

const PING_SUB = gql`
  subscription SensorPing($id: ID) {
    sensorsPing(sensorId: $id)
  }
`;

class Sensors extends Component {
  constructor(props) {
    super(props);
    this.sensorsSubscription = null;
    this.pingSub = null;
    this.state = {
      processedData: "",
      weaponsRangePulse: 0,
      hoverContact: { name: "", pictureUrl: "" }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ sensors: subscriptionData.data.sensorsUpdate })
            .toJS();
        }
      });
    }
    if (!this.pingSub && !nextProps.data.loading) {
      this.pingSub = nextProps.data.subscribeToMore({
        document: PING_SUB,
        variables: { id: nextProps.data.sensors[0] },
        updateQuery: (previousResult, { subscriptionData }) => {
          if (
            previousResult.sensors.find(
              s => s.id === subscriptionData.data.sensorsPing
            )
          ) {
            this.ping();
          }
        }
      });
    }
    const nextSensors = nextProps.data.sensors[0];
    if (!nextProps.data.loading) {
      if (this.props.data.loading) {
        //First time load
        this.setState({
          processedData: nextSensors.processedData,
          pingTime: Date.now() - nextSensors.timeSincePing,
          ping: false
        });
      } else {
        //Every other load
        if (nextSensors.processedData !== this.state.processedData) {
          if (this.state.scanResults === undefined) {
            this.setState({
              processedData: nextSensors.processedData
            });
          } else {
            this.typeIn(nextSensors.processedData, 0, "processedData");
          }
        }
      }
    }
  }
  showWeaponsRange() {
    this.setState({
      weaponsRangePulse: 1
    });
    setTimeout(() => {
      this.setState({
        weaponsRangePulse: 0
      });
    }, 1000);
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
  _hoverContact(contact = {}) {
    this.setState({
      hoverContact: contact
    });
  }
  ping = () => {
    // Reset the state
    this.setState(
      {
        ping: false
      },
      () => {
        this.setState({
          ping: true,
          pingTime: Date.now()
        });
        setTimeout(() => {
          this.setState({ ping: false });
        }, 1000 * 5);
      }
    );
  };
  triggerPing = () => {
    const mutation = gql`
      mutation SendPing($id: ID!) {
        pingSensors(id: $id)
      }
    `;
    const variables = {
      id: this.props.data.sensors[0].id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  selectPing(which) {
    const mutation = gql`
      mutation SetPingMode($id: ID!, $mode: PING_MODES) {
        setSensorPingMode(id: $id, mode: $mode)
      }
    `;
    const variables = {
      id: this.props.data.sensors[0].id,
      mode: which
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    //if (this.props.data.error) console.error(this.props.data.error);
    if (this.props.data.loading) return null;
    const sensors = this.props.data.sensors[0];
    const { pingMode, pings } = sensors;
    const { hoverContact, ping, pingTime } = this.state;
    return (
      <div className="cardSensors">
        <div>
          <Row>
            <Col sm={3}>
              <DamageOverlay
                message="External Sensors Offline"
                system={sensors}
              />
              <SensorScans sensors={sensors} client={this.props.client} />
              {pings &&
                <Row>
                  <Col sm="12">
                    <label>Sensor Options:</label>
                  </Col>
                  <Col sm={12}>
                    <Card>
                      <li
                        onClick={() => this.selectPing("active")}
                        className={`list-group-item ${pingMode === "active"
                          ? "selected"
                          : ""}`}
                      >
                        Active Scan
                      </li>
                      <li
                        onClick={() => this.selectPing("passive")}
                        className={`list-group-item ${pingMode === "passive"
                          ? "selected"
                          : ""}`}
                      >
                        Passive Scan
                      </li>
                      <li
                        onClick={() => this.selectPing("manual")}
                        className={`list-group-item ${pingMode === "manual"
                          ? "selected"
                          : ""}`}
                      >
                        Manual Scan
                      </li>
                    </Card>
                    <Button
                      block
                      disabled={ping}
                      className="pingButton"
                      style={{
                        opacity: pingMode === "manual" ? 1 : 0,
                        pointerEvents: pingMode === "manual" ? "auto" : "none"
                      }}
                      onClick={this.triggerPing}
                    >
                      Ping
                    </Button>
                  </Col>
                </Row>}
              {/*<Row>
			<Col className="col-sm-12">
			<h4>Contact Coordinates</h4>
			</Col>
			<Col className="col-sm-12">
			<Card>
			<p>X:</p>
			<p>Y:</p>
			<p>Z:</p>
			</Card>
			</Col>
			</Row>
		<Button onClick={this.showWeaponsRange.bind(this)} block>Show Weapons Range</Button>*/}
            </Col>
            <Col sm={6} className="arrayContainer">
              <div className="spacer" />
              <Measure useClone={true} includeMargin={false}>
                {dimensions =>
                  <div
                    id="threeSensors"
                    className="array"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {dimensions.width > 0 &&
                      <Grid
                        dimensions={dimensions}
                        sensor={sensors.id}
                        hoverContact={this._hoverContact.bind(this)}
                        ping={ping}
                        pings={sensors.pings}
                        pingTime={pingTime}
                      />}
                  </div>}
              </Measure>
              <DamageOverlay
                message="External Sensors Offline"
                system={sensors}
              />
            </Col>
            <Col className="col-sm-3 data">
              <Row>
                <Col className="col-sm-12 contactPictureContainer">
                  <div
                    className="card contactPicture"
                    style={{
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "black",
                      backgroundImage: `url('${hoverContact.pictureUrl}')`
                    }}
                  />
                </Col>
                <Col className="col-sm-12 contactNameContainer">
                  <div className="card contactName">
                    {hoverContact.name}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-sm-12">
                  <h3>Processed Data</h3>
                </Col>
                <Col className="col-sm-12">
                  <Card className="processedData">
                    <CardBlock>
                      <pre>
                        {this.state.processedData}
                      </pre>
                    </CardBlock>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const SENSOR_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
      simulatorId
      scanResults
      scanRequest
      scanning
      processedData
      pings
      pingMode
      timeSincePing
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

export default graphql(SENSOR_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(Sensors));
