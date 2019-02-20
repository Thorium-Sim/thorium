import React, { Component } from "react";
import { Button, Row, Col, Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Engine1 from "./engine-1";
import Engine2 from "./engine-2";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const updateData = `
id
name
displayName
power {
  power
  powerLevels
}
damage {
  damaged
  report
}
speeds {
  text
  number
}
heat
speed
coolant
on`;
const SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    engineUpdate(simulatorId: $simulatorId) {
${updateData}
    }
  }
`;

const HEATCHANGE_SUB = gql`
  subscription HeatChanged($simulatorId: ID) {
    heatChange(simulatorId: $simulatorId) {
      id
      heat
      coolant
    }
  }
`;

class EngineControl extends Component {
  interactionTime = 0;
  speedBarStyle(array, speed, engineCount, index) {
    let width = (speed / array.length) * 100;
    if (engineCount - 1 === index) {
      return {
        width: `calc(${width}%)`
      };
    }
    return {
      width: `calc(${width}% - ${(40 / array.length) * speed}px)`
    };
  }
  setSpeed(engine, speed) {
    if (
      !engine.damage.damaged &&
      engine.power.power >= engine.power.powerLevels[0] &&
      Date.now() - this.interactionTime > 1000
    ) {
      this.props.setSpeed({ id: engine.id, speed: speed + 1, on: true });
      this.interactionTime = Date.now();
    }
  }
  fullStop() {
    const engine =
      this.props.data.engines && this.props.data.engines.find(e => e.on);
    engine && this.props.setSpeed({ id: engine.id, speed: -1, on: false });
  }
  render() {
    const engines = this.props.data.engines || [];
    return (
      <Container fluid className="EngineControl flex-column">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SPEEDCHANGE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                const engines = previousResult.engines.map(engine => {
                  if (engine.id === subscriptionData.data.engineUpdate.id) {
                    return Object.assign(
                      {},
                      engine,
                      subscriptionData.data.engineUpdate
                    );
                  }
                  return engine;
                });
                return Object.assign({}, previousResult, { engines });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: HEATCHANGE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                const engineIndex = previousResult.engines.findIndex(
                  e => e.id === subscriptionData.data.heatChange.id
                );
                if (engineIndex < 0) {
                  return previousResult;
                }
                return {
                  engines: previousResult.engines.map(
                    (e, i) =>
                      i === engineIndex
                        ? Object.assign({}, e, {
                            heat: subscriptionData.data.heatChange.heat,
                            coolant: subscriptionData.data.heatChange.coolant
                          })
                        : e
                  )
                };
              }
            })
          }
        />
        <Row>
          <Col className="col-sm-12 enginesBar">
            {(() => {
              return engines.map((engine, index) => {
                return (
                  <div key={engine.id} className="engineGroup">
                    <h4>{engine.name}</h4>
                    <ul className="engine">
                      {engine.speeds.map((speed, speedIndex) => {
                        const powerIndex =
                          engine.power.powerLevels
                            .concat(1000)
                            .findIndex(p => p > engine.power.power) - 1;
                        let speedWord = speed;
                        if (typeof speed === "object") {
                          speedWord = speed.number;
                        }
                        return (
                          <li
                            key={`${engine.id}-${speedWord}`}
                            className={`speedNums speedBtn ${
                              speedIndex <= powerIndex ? "powered" : ""
                            }`}
                            onClick={() => {
                              this.setSpeed(engine, speedIndex, engines, index);
                            }}
                          >
                            {speedWord}
                          </li>
                        );
                      })}
                    </ul>
                    <div
                      className="speedBar"
                      style={this.speedBarStyle(
                        engine.speeds,
                        engine.speed,
                        engines.length,
                        index
                      )}
                    />
                  </div>
                );
              });
            })()}
          </Col>
          <Col className="col-sm-4 offset-sm-4">
            <Button
              className="full-stop"
              color="warning"
              block
              onClick={this.fullStop.bind(this)}
            >
              Full Stop
            </Button>
          </Col>
        </Row>
        <Row className="flex-max">
          {engines.length === 1 && (
            <Engine1 engines={engines} setSpeed={this.setSpeed.bind(this)} />
          )}
          {engines.length === 2 && (
            <Engine2 engines={engines} setSpeed={this.setSpeed.bind(this)} />
          )}
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".enginesBar",
    content:
      "This is where you can see your current speed. The yellow bar indicates how fast you are currently going. You can also click on the numbers here to change your speed."
  },
  {
    selector: "button.speedBtn",
    content: "You can click on any of these buttons to change the speed too."
  },
  {
    selector: ".full-stop",
    content: "Click this button to stop the ship entirely."
  },
  {
    selector: ".heat",
    content:
      "Watch your heat to make sure it doesn't get too high! Your engines could become damaged if they get too hot."
  },
  {
    selector: ".cool-engines",
    content:
      "You can cool down your engines with coolant by clicking this button."
  },
  {
    selector: ".coolant",
    content:
      "If you run out of coolant, one of the crew members is in charge of giving you more. Ask around."
  }
];

const ENGINE_QUERY = gql`
  query getEngines($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      ${updateData}
    }
  }
`;

const SET_SPEED = gql`
  mutation setSpeed($id: ID!, $speed: Int!, $on: Boolean) {
    setSpeed(id: $id, speed: $speed, on: $on)
  }
`;
export default compose(
  graphql(ENGINE_QUERY, {
    options: ownProps => ({
      fetchPolicy: "cache-and-network",
      variables: { simulatorId: ownProps.simulator.id }
    })
  }),
  graphql(SET_SPEED, {
    name: "setSpeed",
    props: ({ setSpeed }) => ({
      setSpeed: props =>
        setSpeed({
          variables: Object.assign(props)
        })
    })
  })
)(EngineControl);
