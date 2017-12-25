import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button, Card } from "reactstrap";
import Measure from "react-measure";
import Tour from "reactour";

import ReactorModel from "./model";
import "./style.css";

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
  constructor(props) {
    super(props);
    this.state = {};
    this.internalSub = null;
    this.systemSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: REACTOR_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            reactors: subscriptionData.data.reactorUpdate
          });
        }
      });
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
    this.systemSub && this.systemSub();
  }
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
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.reactors ||
      !this.props.data.systems
    )
      return null;
    const { reactors, systems } = this.props.data;
    if (!reactors) return null;
    const reactor = reactors.find(r => r.model === "reactor");
    const battery = reactors.find(r => r.model === "battery");
    const charge = battery && battery.batteryChargeLevel;
    if (!reactor) return <p>No Reactor</p>;
    const powerTotal = systems.reduce((prev, next) => {
      return next.power.power + prev;
    }, 0);
    const efficiencies = [
      {
        label: "Overload",
        color: "danger",
        efficiency: 1.25
      },
      {
        label: "Cruise",
        color: "primary",
        efficiency: 1
      },
      {
        label: "Silent Running",
        color: "cloak",
        efficiency: 0.87
      },
      {
        label: "Reduced",
        color: "default",
        efficiency: 0.5
      },
      {
        label: "Auxilliary",
        color: "info",
        efficiency: 0.38
      },
      {
        label: "Minimal",
        color: "warning",
        efficiency: 0.27
      },
      {
        label: "Power Down",
        color: "danger",
        efficiency: 0
      },
      {
        label: "External Power",
        color: "success"
      }
    ];
    return (
      <Container className="reactor-control">
        <Row>
          <Col sm={6}>
            <Row>
              <Col sm={12}>
                <Measure
                  bounds
                  onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds });
                  }}
                >
                  {({ measureRef }) => (
                    <div ref={measureRef} style={{ height: "500px" }}>
                      {this.state.dimensions && (
                        <ReactorModel dimensions={this.state.dimensions} />
                      )}
                    </div>
                  )}
                </Measure>
              </Col>
            </Row>
            <Row className="reactor-info">
              <Col sm={12}>
                <h1>
                  Reactor Efficiency: {Math.round(reactor.efficiency * 100)}%
                </h1>
                <h2>
                  Reactor Output:{" "}
                  {Math.round(reactor.efficiency * reactor.powerOutput)}
                </h2>
                <h2>Power Used: {powerTotal}</h2>
              </Col>
            </Row>
          </Col>
          {battery ? (
            <Col sm={6}>
              <Row className="batteries">
                <Col sm={{ size: 10, offset: 1 }}>
                  <Card>
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
                </Col>
              </Row>
              <Row className="reactor-buttons">
                {efficiencies.map(e => (
                  <Col sm={6} key={e.label}>
                    <Button
                      block
                      className={
                        e.efficiency === reactor.efficiency ? "active" : ""
                      }
                      onClick={() => this.setEfficiency(e.efficiency)}
                      size="lg"
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
          ) : (
            <Col sm={{ size: 4, offset: 2 }}>
              {efficiencies.map(e => (
                <Button
                  key={e.label}
                  block
                  className={
                    e.efficiency === reactor.efficiency ? "active" : ""
                  }
                  onClick={() => this.setEfficiency(e.efficiency)}
                  size="lg"
                  color={e.color}
                >
                  {e.label}
                  {typeof e.efficiency === "number" &&
                    ": " + e.efficiency * 100 + "%"}
                </Button>
              ))}
            </Col>
          )}
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const REACTOR_QUERY = gql`
  query Reactors($simulatorId: ID!) {
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
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ReactorControl));

const Battery = ({ level = 1 }) => {
  return (
    <div className="battery">
      <div className="battery-bar" style={{ height: `${level * 100}%` }} />
      <div className="battery-level">{Math.round(level * 100)}</div>
    </div>
  );
};
