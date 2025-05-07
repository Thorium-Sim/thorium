import React, {Component} from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag.macro";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";

import "./style.scss";

export const JR_SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    engineUpdate(simulatorId: $simulatorId) {
      id
      speed
      on
    }
  }
`;

class EngineControl extends Component {
  constructor(props) {
    super(props);
    this.setSpeedSubscription = null;
    this.systemSub = null;
  }
  state = {arrowPos: 0};
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.setSpeedSubscription && !nextProps.data.loading) {
      this.setSpeedSubscription = nextProps.data.subscribeToMore({
        document: JR_SPEEDCHANGE_SUB,
        variables: {simulatorId: nextProps.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const engines = previousResult.engines.map(engine => {
            if (engine.id === subscriptionData.data.engineUpdate.id) {
              return Object.assign({}, engine, {
                speed: subscriptionData.data.engineUpdate.speed,
                on: subscriptionData.data.engineUpdate.on,
              });
            }
            return engine;
          });
          return Object.assign({}, previousResult, {engines});
        },
      });
    }

    if (!nextProps.data.loading) {
      const engines = nextProps.data.engines || [];
      const speeds = [{text: "Full Stop", number: -1}].concat(
        engines.reduce((prev, next) => {
          return prev.concat(
            next.speeds.map((speed, index) => {
              return {
                ...speed,
                on: next.on && next.speed === index + 1,
                engine: next.id,
                speed: index,
              };
            }),
          );
        }, []),
      );

      // Check the props to see if we need to change
      const propsEngines = this.props.data.engines || [];
      const propsSpeeds = [{text: "Full Stop", number: -1}].concat(
        propsEngines.reduce((prev, next) => {
          return prev.concat(
            next.speeds.map((speed, index) => {
              return {
                ...speed,
                on: next.on && next.speed === index + 1,
                engine: next.id,
                speed: index,
              };
            }),
          );
        }, []),
      );
      const propsLevel = propsSpeeds.findIndex(s => s.on);
      const level = speeds.findIndex(s => s.on);
      if (propsLevel !== level) {
        const arrowPos = level / (speeds.length - 1);
        this.setState({
          arrowPos,
        });
      }
    }
  }
  componentWillUnmount() {
    this.setSpeedSubscription && this.setSpeedSubscription();
    this.systemSub && this.systemSub();
  }
  mouseDown = () => {
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("touchend", this.mouseUp);
    document.addEventListener("touchmove", this.mouseMove);
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("touchend", this.mouseUp);
    document.removeEventListener("touchmove", this.mouseMove);

    const engines = this.props.data.engines || [];
    const speeds = [{text: "Full Stop", number: -1}].concat(
      engines.reduce((prev, next) => {
        return prev.concat(
          next.speeds.map((speed, index) => {
            return {
              ...speed,
              on: next.on && next.speed === index + 1,
              engine: next.id,
              speed: index,
            };
          }),
        );
      }, []),
    );
    const levels = speeds.map((s, i) => i / (speeds.length - 1));
    // Get the speed from the level
    const speedIndex = levels.findIndex(s => s === this.state.arrowPos);
    if (speeds[speedIndex] && speeds[speedIndex].engine) {
      this.props.setSpeed({
        id: speeds[speedIndex].engine,
        speed: speeds[speedIndex].speed + 1,
        on: true,
      });
    } else {
      const engine = this.props.data.engines.find(enginef => enginef.on);
      if (engine) {
        this.props.setSpeed({id: engine.id, speed: -1, on: false});
      }
    }
  };
  mouseMove = evt => {
    const line = ReactDOM.findDOMNode(this).querySelector(".line");
    const {y, height} = line.getBoundingClientRect();
    let arrowPos = Math.abs(
      Math.min(
        1,
        Math.max(0, ((evt.clientY || evt.touches[0].clientY) - y) / height),
      ) - 1,
    );
    // Get the speeds and map it to the speed
    const engines = this.props.data.engines || [];
    const speeds = [{text: "Full Stop", number: -1}].concat(
      engines.reduce((prev, next) => {
        return prev.concat(
          next.speeds.map((speed, index) => {
            return {...speed, on: next.on && next.speed === index + 1};
          }),
        );
      }, []),
    );
    const levels = speeds.map((s, i) => i / (speeds.length - 1));
    arrowPos = levels.reduce((prev, next) => {
      if (prev !== arrowPos) return prev;
      if (arrowPos - 0.05 < next && arrowPos + 0.05 > next) return next;
      return arrowPos;
    }, arrowPos);
    this.setState({
      arrowPos,
    });
  };
  speedBarStyle(array, speed, engineCount, index) {
    let width = (speed / array.length) * 100;
    if (engineCount - 1 === index) {
      return {
        width: `calc(${width}%)`,
      };
    }
    return {
      width: `calc(${width}% - ${(40 / array.length) * speed}px)`,
    };
  }
  setSpeed(engine, speed) {
    if (!engine.damage.damaged) {
      this.props.setSpeed({id: engine.id, speed: speed + 1, on: true});
    }
  }
  fullStop() {
    const engine = this.props.data.engines.find(enginef => enginef.on);
    this.props.setSpeed({id: engine.id, speed: -1, on: false});
  }
  render() {
    const engines = this.props.data.engines || [];
    const {arrowPos} = this.state;
    const speeds = [{text: "Full Stop", number: -1}].concat(
      engines.reduce((prev, next) => {
        return prev.concat(
          next.speeds.map((speed, index) => {
            return {...speed, on: next.on && next.speed === index + 1};
          }),
        );
      }, []),
    );
    return (
      <div className="engines-slider">
        <div
          className="engine-arrow-holder"
          onMouseDown={this.mouseDown}
          onTouchStart={this.mouseDown}
          style={{
            transform: `translateY(${
              Math.min(1, Math.abs(arrowPos - 1)) * 100
            }%)`,
          }}
        >
          <div className="engine-arrow" />
        </div>
        <div className="line" />
        <div className="engines-list">
          {speeds.map(s => (
            <p
              key={`${s.text}-${s.number}`}
              style={{color: s.on ? "yellow" : "white"}}
            >
              {s.text}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export const JR_ENGINE_QUERY = gql`
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
  graphql(JR_ENGINE_QUERY, {
    options: ownProps => ({
      fetchPolicy: "cache-and-network",
      variables: {simulatorId: ownProps.simulator.id},
    }),
  }),
  graphql(SET_SPEED, {
    name: "setSpeed",
    props: ({setSpeed}) => ({
      setSpeed: props =>
        setSpeed({
          variables: Object.assign(props),
        }),
    }),
  }),
)(EngineControl);
