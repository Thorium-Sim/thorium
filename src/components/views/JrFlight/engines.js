import React, { Component } from "react";
import { Button, Row, Col, Container } from "reactstrap";
import gql from "graphql-tag";
import Immutable from "immutable";
import { graphql, compose } from "react-apollo";

import "./style.scss";

const SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    speedChange(simulatorId: $simulatorId) {
      id
      speed
      on
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

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID, $type: String) {
    systemsUpdate(simulatorId: $simulatorId, type: $type) {
      id
      coolant
      heat
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

class EngineControl extends Component {
  constructor(props) {
    super(props);
    this.setSpeedSubscription = null;
    this.heatChangeSubscription = null;
    this.systemSub = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.setSpeedSubscription && !nextProps.data.loading) {
      this.setSpeedSubscription = nextProps.data.subscribeToMore({
        document: SPEEDCHANGE_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const engines = previousResult.engines.map(engine => {
            if (engine.id === subscriptionData.data.speedChange.id) {
              return Object.assign({}, engine, {
                speed: subscriptionData.data.speedChange.speed,
                on: subscriptionData.data.speedChange.on
              });
            }
            return engine;
          });
          return Object.assign({}, previousResult, { engines });
        }
      });
    }
    if (!this.heatChangeSubscription && !nextProps.data.loading) {
      this.heatChangeSubscription = nextProps.data.subscribeToMore({
        document: HEATCHANGE_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const engineIndex = previousResult.engines.findIndex(
            e => e.id === subscriptionData.data.heatChange.id
          );
          if (engineIndex < 0) {
            return previousResult;
          }
          const engine = Immutable.Map(previousResult.engines[engineIndex]);
          engine.set("heat", subscriptionData.data.heatChange.heat);
          engine.set("coolant", subscriptionData.data.heatChange.coolant);
          return {
            engines: Immutable.List(previousResult.engines)
              .set(engineIndex, engine)
              .toJS()
          };
        }
      });
    }
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id,
          type: "Engine"
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Immutable.Map(previousResult)
            .mergeWith(
              (oldVal, newVal, key) => {
                return newVal.map((e, index) =>
                  Immutable.Map(oldVal[index]).merge({
                    damage: e.get("damage"),
                    power: e.get("power"),
                    coolant: e.get("coolant"),
                    heat: e.get("heat")
                  })
                );
              },
              { engines: subscriptionData.data.systemsUpdate }
            )
            .toJS();
        }
      });
    }
  }
  componentWillUnmount() {
    this.heatChangeSubscription();
    this.setSpeedSubscription();
    this.systemSub();
  }
  speedBarStyle(array, speed, engineCount, index) {
    let width = speed / array.length * 100;
    if (engineCount - 1 === index) {
      return {
        width: `calc(${width}%)`
      };
    }
    return {
      width: `calc(${width}% - ${40 / array.length * speed}px)`
    };
  }
  setSpeed(engine, speed) {
    if (!engine.damage.damaged) {
      this.props.setSpeed({ id: engine.id, speed: speed + 1, on: true });
    }
  }
  fullStop() {
    const engine = this.props.data.engines.find(engine => engine.on);
    this.props.setSpeed({ id: engine.id, speed: -1, on: false });
  }
  render() {
    const engines = this.props.data.engines || [];
    const speeds = engines.reduce((prev, next) => {
      return prev.concat(next.speeds);
    }, []);
    return (
      <div className="engines-slider">
        <div className="engine-arrow" />
        <div className="line" />
        <div className="engines-list">
          {speeds.map(s =>
            <p key={`${s.text}-${s.number}`}>
              {s.text}
            </p>
          )}
        </div>
      </div>
    );
  }
}

const ENGINE_QUERY = gql`
  query getEngines($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      id
      name
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
      on
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
    options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
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
