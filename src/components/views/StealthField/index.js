import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import Tour from "reactour";
import DamageOverlay from "../helpers/DamageOverlay";
import { Asset } from "../../../helpers/assets";
import Scene from "./effect";
import StealthBoard from "./stealthBoard";
import ChargeBar from "./chargeBar";

import "./style.css";

const STEALTH_SUB = gql`
  subscription StealthFieldUpdate($simulatorId: ID!) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".stealth-button",
    content:
      "The ship’s stealth field allows it to move through space without being detected by other starships. If your stealth field needs to be activated, click this button to activate or deactivate the stealth field."
  },
  {
    selector: ".stealth-board",
    content:
      "This dashboard shows the way that the ship’s operations impact the stealth field. Use of some shp functionality may increase the ship’s probability of being detected. For example, sending out messages and other signals makes it obvious to other starships that this ship is around. They may not be able to see the ship, but they’ll notice that someone is there. If you start shooting at them, they will probably realize that something fishy is going on."
  }
];

/*
const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID, $type: String) {
    systemsUpdate(simulatorId: $simulatorId, type: $type) {
      id
      name
      type
      stealthFactor
    }
  }
`;*/
class StealthField extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.systemsSubscription = null;
  }
  scene = null;
  componentDidMount() {
    this.props.data.startPolling(1000);
  }
  componentWillUnmount() {
    this.props.data.stopPolling();
    this.subscription && this.subscription();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STEALTH_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            stealthField: subscriptionData.stealthFieldUpdate
          });
        }
      });
    }
  }
  _activate() {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation ActivateStealth($id: ID!) {
        activateStealth(id: $id)
      }
    `;
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _deactivate() {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation DeactivateStealth($id: ID!) {
        deactivateStealth(id: $id)
      }
    `;
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading) return null;
    const stealthField =
      this.props.data.stealthField && this.props.data.stealthField[0];
    if (!stealthField) return <p>No Stealth Field</p>;
    return (
      <Container fluid className="card-stealthField">
        <DamageOverlay
          system={stealthField}
          message={`${stealthField.name} Offline`}
        />
        <Row>
          <Col sm="3">
            {stealthField.charge && (
              <Row className="charge-row">
                <Col sm={6}>
                  <ChargeBar
                    id={stealthField.id}
                    client={this.props.client}
                    value={stealthField.quadrants.fore}
                    label="Fore"
                    simulator={this.props.simulator}
                  />
                </Col>
                <Col sm={6}>
                  <ChargeBar
                    id={stealthField.id}
                    client={this.props.client}
                    value={stealthField.quadrants.port}
                    label="Port"
                    simulator={this.props.simulator}
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col sm="6">
            <Asset
              asset="/Ship Views/Left"
              simulatorId={this.props.simulator.id}
            >
              {({ src }) => {
                if (!this.scene) {
                  this.scene = true;
                  setTimeout(() => (this.scene = new Scene()), 100);
                }
                return (
                  <div
                    className="stealth"
                    style={{ transform: "rotate(360deg)" }}
                  >
                    <img
                      alt="ship"
                      style={{ width: "100%" }}
                      src={src}
                      draggable="false"
                    />
                    <canvas
                      id="stealth-canvas"
                      style={{
                        WebkitMaskImage: `url(${src})`,
                        display:
                          stealthField.id &&
                          (!stealthField.activated || stealthField.state)
                            ? "block"
                            : "none"
                      }}
                    />
                  </div>
                );
              }}
            </Asset>
            {stealthField.activated &&
              (stealthField.state ? (
                <Button
                  size="lg"
                  color="warning"
                  className="stealth-button"
                  block
                  onClick={this._deactivate.bind(this)}
                >
                  Deactivate Stealth Field
                </Button>
              ) : (
                <Button
                  size="lg"
                  color="primary"
                  className="stealth-button"
                  block
                  onClick={this._activate.bind(this)}
                >
                  Activate Stealth Field
                </Button>
              ))}
          </Col>
          <Col sm="3">
            {stealthField.charge && (
              <Row className="charge-row">
                <Col sm={6}>
                  <ChargeBar
                    id={stealthField.id}
                    client={this.props.client}
                    value={stealthField.quadrants.aft}
                    label="Aft"
                    simulator={this.props.simulator}
                  />
                </Col>
                <Col sm={6}>
                  <ChargeBar
                    id={stealthField.id}
                    client={this.props.client}
                    value={stealthField.quadrants.starboard}
                    label="Starboard"
                    simulator={this.props.simulator}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <StealthBoard
          systems={this.props.data.systems}
          stealthField={stealthField}
        />
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const STEALTH_QUERY = gql`
  query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      stealthFactor
    }
  }
`;

export default graphql(STEALTH_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(StealthField));
