import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button, Card } from "reactstrap";
import Measure from "react-measure";
import Tour from "helpers/tourHelper";
import AnimatedNumber from "react-animated-number";
import SubscriptionHelper from "helpers/subscriptionHelper";

import HeatBar from "../EngineControl/heatbar";
import ReactorModel from "./model";
import "./style.scss";

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, power: true) {
      id
      name
      power {
        power
      }
    }
  }
`;

const REACTOR_SUB = gql`
  subscription ReactorsUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      type
      name
      heat
      model
      coolant
      damage {
        damaged
      }
      ejected
      efficiency
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
      efficiencies {
        label
        color
        efficiency
      }
    }
  }
`;
const DOCKING_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        clamps
        ramps
        airlock
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".powerlevel-containers",
    content:
      "Your main reactor provides power to your ship. In certain circumstances, you will need to change the output of the main reactor, which you can do from this screen."
  },
  {
    selector: ".reactor-info",
    content:
      "This shows you the current efficiency of the reactor, the reactor output, and the current power being used. Make sure your reactor output matches the current power."
  },
  {
    selector: ".reactor-buttons",
    content:
      "Use these buttons to change the power output of the main reactor. Silent running mode is useful for masking the energy signature put off by your reactor. External power is used when your ship is connected to an external power source, like a starbase. Just make sure you have enough power to run the systems on your ship."
  },
  {
    selector: ".battery-container",
    content:
      "These are the ship’s batteries, if it has any. They show how much power is remaining in the batteries. If you use more power than is being outputted by your reactor, power will draw from the batteries. If they run out of power, you will have to balance your power, and the batteries will need to be recharged. You can recharge batteries from your reactor by using less power than the current reactor output. Don’t let these run out in the middle of space. That would be...problematic."
  }
];

class ReactorControl extends Component {
  state = {};
  setEfficiency(e) {
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation SetReactorEfficiency($id: ID!, $e: Float) {
        reactorChangeEfficiency(id: $id, efficiency: $e)
      }
    `;
    const variables = {
      id: reactor.id,
      e
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  applyCoolant = () => {
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id: reactor.id,
      state: true
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener("touchend", this.stopCoolant);
    document.addEventListener("mouseup", this.stopCoolant);
  };
  stopCoolant = () => {
    document.removeEventListener("touchend", this.stopCoolant);
    document.removeEventListener("mouseup", this.stopCoolant);
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id: reactor.id,
      state: false
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.reactors ||
      !this.props.data.systems
    )
      return null;
    const { reactors, systems, simulators } = this.props.data;
    if (!reactors) return null;
    const reactor = reactors.find(r => r.model === "reactor");
    const battery = reactors.find(r => r.model === "battery");
    const charge = battery && battery.batteryChargeLevel;
    if (!reactor) return <p>No Reactor</p>;
    const powerTotal = systems.reduce((prev, next) => {
      return next.power.power + prev;
    }, 0);
    const efficiencies = reactor
      ? reactor.efficiencies.concat().sort((a, b) => {
          if (a.efficiency > b.efficiency) return -1;
          if (a.efficiency < b.efficiency) return 1;
          return 0;
        })
      : [];
    const { ship = {} } = simulators[0] ? simulators[0] : {};
    return (
      <Container fluid className="reactor-control flex-column">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: REACTOR_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  reactors: subscriptionData.data.reactorUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SYSTEMS_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  systems: subscriptionData.data.systemsUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DOCKING_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={5} style={{ height: "100%" }}>
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div
                  ref={measureRef}
                  style={{ height: "100%", minHeight: "45vh" }}
                >
                  {this.state.dimensions && (
                    <ReactorModel dimensions={this.state.dimensions} />
                  )}
                </div>
              )}
            </Measure>
          </Col>
          <Col sm={2} className="flex-column" style={{ minHeight: "45vh" }}>
            <Row className="flex-max">
              <Col sm={6}>
                <HeatBar
                  label="Heat"
                  level={reactor.heat}
                  background={
                    "linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)"
                  }
                />
              </Col>
              <Col sm={6}>
                <HeatBar
                  label="Coolant"
                  level={reactor.coolant}
                  background={
                    "linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
                  }
                />
              </Col>
            </Row>
            <Button
              color="info"
              block
              onMouseDown={this.applyCoolant}
              onTouchStart={this.applyCoolant}
            >
              Coolant
            </Button>
          </Col>
          <Col sm={5}>
            {battery && (
              <Card className="batteries">
                <div className="battery-container">
                  <Battery
                    level={Math.min(1, Math.max(0, (charge - 0.75) * 4))}
                  />
                  <Battery
                    level={Math.min(1, Math.max(0, (charge - 0.5) * 4))}
                  />
                  <Battery
                    level={Math.min(1, Math.max(0, (charge - 0.25) * 4))}
                  />
                  <Battery level={Math.min(1, Math.max(0, charge * 4))} />
                </div>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="flex-max">
          <Col sm={7}>
            <div className="reactor-info">
              <h1>
                Reactor Efficiency:{" "}
                <AnimatedNumber
                  stepPrecision={3}
                  value={reactor.efficiency}
                  duration={800}
                  formatValue={n => `${Math.round(n * 100)}%`}
                />
              </h1>
              <h2>
                Reactor Output:{" "}
                <AnimatedNumber
                  stepPrecision={3}
                  value={reactor.efficiency * reactor.powerOutput}
                  duration={800}
                  formatValue={n => `${Math.round(n)}`}
                />
              </h2>
              <h2>Power Used: {powerTotal}</h2>
            </div>
          </Col>

          <Col sm={{ size: 5 }} className="flex-column">
            <Row className="reactor-buttons flex-max auto-scroll">
              {efficiencies.map(e => (
                <Col xl={6} key={e.label}>
                  <Button
                    block
                    className={
                      e.efficiency === reactor.efficiency ? "active" : ""
                    }
                    onClick={() => this.setEfficiency(e.efficiency)}
                    size="lg"
                    disabled={
                      !e.efficiency && e.efficiency !== 0 && !ship.clamps
                    }
                    color={e.color}
                  >
                    {e.label}
                    {typeof e.efficiency === "number" &&
                      ": " + e.efficiency * 100 + "%"}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const REACTOR_QUERY = gql`
  query Reactors($simulatorId: ID!, $simId: String!) {
    reactors(simulatorId: $simulatorId) {
      id
      type
      name
      heat
      model
      coolant
      damage {
        damaged
      }
      ejected
      efficiency
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
      efficiencies {
        label
        color
        efficiency
      }
    }
    simulators(id: $simId) {
      id
      ship {
        clamps
        ramps
        airlock
      }
    }
    systems(simulatorId: $simulatorId, power: true) {
      id
      name
      power {
        power
      }
    }
  }
`;
export default graphql(REACTOR_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(ReactorControl));

const Battery = ({ level = 1 }) => {
  return (
    <div className="battery">
      <div className="battery-bar" style={{ height: `${level * 100}%` }} />
      <div className="battery-level">
        <AnimatedNumber
          value={level}
          duration={1000}
          formatValue={n => `${Math.round(n * 100)}`}
        />
      </div>
    </div>
  );
};
