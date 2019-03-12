import React, { Component } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag.macro";
import { Mutation, graphql, withApollo } from "react-apollo";
import { Button, Row, Col, Card, CardBody } from "reactstrap";
import Tour from "helpers/tourHelper";
import { Typing } from "react-typing";
import "./style.scss";
import Grid from "./GridDom";
import DamageOverlay from "../helpers/DamageOverlay";
import SensorScans from "./SensorScans";
import { Asset } from "helpers/assets";
import SubscriptionHelper from "helpers/subscriptionHelper";

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
      interference
      timeSincePing
      movement {
        x
        y
        z
      }
      segments {
        ring
        line
        state
      }
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

/*const PING_SUB = gql`
  subscription SensorPing($id: ID) {
    sensorsPing(sensorId: $id)
  }
`;*/

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Sensors allow you to get information about what is going on around your ship."
  },
  {
    selector: "#sensorGrid",
    content:
      "This is your sensor grid. Your ship is located at the center of the grid, where the lines converge. The top segment is directly in front of your ship, as if you were looking down on your ship from above it. You can see the relative location of objects around your ship on this grid."
  },
  /*{
    selector: ".ping-controls",
    content:
      "Some sensor systems allow you to control how often the sensor grid 'pings', or detects objects around the ship. You can control the rate of pings with these controls. Whenever your sensors pings, it sends out a faint signal which can be detected by other ships. Turning down the rate of sensor pings can keep your ship's position masked."
  },*/
  {
    selector: ".contact-info",
    content:
      "When you move your mouse over a contact, the contact's identification will show up in this box."
  },
  {
    selector: ".processedData",
    content:
      "Text will sometimes appear in this box. Your sensors will passively scan and when it finds useful information it will inform you here. Whenever it does, you want to read it out loud so the Captain can know about what is going on around your ship."
  },
  {
    selector: ".scanEntry",
    content:
      "If you want to know specific information about a contact around your ship, you can scan it directly. Just type what you want to know, such as the weapons on a ship, the population, size, distance, or anything else you want to know about. Click the scan button to initiate your scan. The results will appear in the box below."
  }
];
class Sensors extends Component {
  constructor(props) {
    super(props);
    this.sensorsSubscription = null;
    this.pingSub = null;
    this.state = {
      hoverContact: { name: "", pictureUrl: "" }
    };
  }
  componentDidMount() {
    if (!this.state.dimensions && ReactDOM.findDOMNode(this)) {
      const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
      if (domNode) {
        this.setState({
          dimensions: domNode.getBoundingClientRect()
        });
      }
    }
  }
  componentDidUpdate() {
    if (!ReactDOM.findDOMNode(this)) return;
    const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
    if (
      domNode &&
      (!this.state.dimensions ||
        this.state.dimensions.width !== domNode.getBoundingClientRect().width)
    ) {
      this.setState({
        dimensions: domNode.getBoundingClientRect()
      });
    }
  }
  showWeaponsRange = () => {
    this.props.client
      .query({
        query: gql`
          query Targeting($id: ID!) {
            targeting(simulatorId: $id) {
              id
              range
            }
          }
        `,
        variables: { id: this.props.simulator.id }
      })
      .then(({ data: { targeting } }) => {
        const target = targeting[0];
        if (!target) return;
        this.setState({
          weaponsRange: target.range
        });
        setTimeout(() => {
          this.setState({
            weaponsRange: null
          });
        }, 1000);
      });
  };

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
  selectPing = which => {
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
  };
  clickContact = action => (e, contact, selectContact) => {
    e.preventDefault();
    e.stopPropagation();
    selectContact(contact);
    const { x, y, z } = contact.location;
    action({
      variables: {
        simulatorId: this.props.simulator.id,
        coordinates: { x: Math.abs(x), y: Math.abs(y), z: Math.abs(z) },
        contactId: contact.id
      }
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.sensors)
      return <p>Loading...</p>;
    const needScans =
      !this.props.widget &&
      !this.props.station.cards.find(c => c.component === "SensorScans");
    const sensors = this.props.data.sensors[0];
    const { pingMode } = sensors;
    const pings = false;
    const { hoverContact, ping, pingTime, weaponsRange } = this.state;
    return (
      <div className="cardSensors">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SENSOR_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sensors: subscriptionData.data.sensorsUpdate
                });
              }
            })
          }
        />
        <div>
          <Row>
            {needScans && (
              <Col sm={3}>
                <DamageOverlay
                  message="External Sensors Offline"
                  system={sensors}
                />
                <SensorScans sensors={sensors} client={this.props.client} />
                {pings && (
                  <PingControl
                    selectPing={this.selectPing}
                    pingMode={pingMode}
                    ping={ping}
                    triggerPing={this.triggerPing}
                  />
                )}
                <Button onClick={this.showWeaponsRange.bind(this)} block>
                  Show Weapons Range
                </Button>
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
                */}
              </Col>
            )}
            <Col
              sm={{ size: 6, offset: !needScans ? 1 : 0 }}
              className="arrayContainer"
            >
              <div className="spacer" />
              <div id="threeSensors" className="array">
                <Mutation
                  mutation={gql`
                    mutation SetCalculatedTarget(
                      $simulatorId: ID
                      $coordinates: CoordinatesInput!
                      $contactId: ID
                    ) {
                      setTargetingCalculatedTarget(
                        simulatorId: $simulatorId
                        coordinates: $coordinates
                        contactId: $contactId
                      )
                    }
                  `}
                >
                  {action => (
                    <Grid
                      dimensions={this.state.dimensions}
                      sensor={sensors.id}
                      damaged={sensors.damage.damaged}
                      hoverContact={this._hoverContact.bind(this)}
                      movement={sensors.movement}
                      ping={ping}
                      pings={pings}
                      pingTime={pingTime}
                      simulatorId={this.props.simulator.id}
                      segments={sensors.segments}
                      interference={sensors.interference}
                      mouseDown={this.clickContact(action)}
                      includeTypes={[
                        "contact",
                        "planet",
                        "border",
                        "ping",
                        "projectile"
                      ]}
                      range={
                        weaponsRange && {
                          size: weaponsRange,
                          color: "rgba(255, 0, 0, 0.5)"
                        }
                      }
                    />
                  )}
                </Mutation>
              </div>
              <DamageOverlay
                message="External Sensors Offline"
                system={sensors}
              />
            </Col>
            <Col sm={{ size: 3, offset: !needScans ? 1 : 0 }} className="data">
              <Row className="contact-info">
                <Col className="col-sm-12">
                  <div className="card contactPictureContainer">
                    {hoverContact.picture && (
                      <Asset asset={hoverContact.picture}>
                        {({ src }) => (
                          <div
                            className="contactPicture"
                            style={{
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundColor: "black",
                              backgroundImage: `url('${src}')`
                            }}
                          />
                        )}
                      </Asset>
                    )}
                  </div>
                </Col>
                <Col className="col-sm-12 contactNameContainer">
                  <div className="card contactName">{hoverContact.name}</div>
                </Col>
              </Row>
              <Row>
                <Col className="col-sm-12">
                  <h3>Processed Data</h3>
                </Col>
                <Col className="col-sm-12">
                  <Card className="processedData">
                    <CardBody>
                      <pre>
                        <Typing keyDelay={20} key={sensors.processedData}>
                          {sensors.processedData}
                        </Typing>
                      </pre>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {pings && !needScans && (
                <PingControl
                  selectPing={this.selectPing}
                  pingMode={pingMode}
                  ping={ping}
                  triggerPing={this.triggerPing}
                />
              )}
              {!needScans && (
                <Button onClick={this.showWeaponsRange} block>
                  Show Weapons Range
                </Button>
              )}
            </Col>
          </Row>
        </div>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </div>
    );
  }
}

const PingControl = ({ selectPing, pingMode, ping, triggerPing }) => {
  return (
    <Row>
      <Col sm="12">
        <label>Sensor Options:</label>
      </Col>
      <Col sm={12} className="ping-controls">
        <Card>
          <li
            onClick={() => selectPing("active")}
            className={`list-group-item ${
              pingMode === "active" ? "selected" : ""
            }`}
          >
            Active Scan
          </li>
          <li
            onClick={() => selectPing("passive")}
            className={`list-group-item ${
              pingMode === "passive" ? "selected" : ""
            }`}
          >
            Passive Scan
          </li>
          <li
            onClick={() => selectPing("manual")}
            className={`list-group-item ${
              pingMode === "manual" ? "selected" : ""
            }`}
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
          onClick={triggerPing}
        >
          Ping
        </Button>
      </Col>
    </Row>
  );
};
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
      interference
      timeSincePing
      movement {
        x
        y
        z
      }
      segments {
        ring
        line
        state
      }
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
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(Sensors));
