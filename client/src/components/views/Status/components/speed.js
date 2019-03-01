import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql } from "react-apollo";
import { Label } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";

const SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    engineUpdate(simulatorId: $simulatorId) {
      id
      name
      speeds {
        text
        number
        velocity
      }
      velocity
      heat
      speed
      on
      stealthFactor
    }
  }
`;

class EngineCoreView extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.engines) return null;
    const { engines } = this.props.data;
    if (!engines || engines.length === 0) return null;
    const onEngine = engines.find(e => e.on);
    const speed = !onEngine
      ? "Full Stop"
      : onEngine.speeds[onEngine.speed - 1] &&
        onEngine.speeds[onEngine.speed - 1].text;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SPEEDCHANGE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  engines: previousResult.engines.map(engine => {
                    if (engine.id === subscriptionData.data.engineUpdate.id) {
                      return Object.assign(
                        {},
                        engine,
                        subscriptionData.data.engineUpdate
                      );
                    }
                    return engine;
                  })
                });
              }
            })
          }
        />
        <Label>Speed</Label>
        <div className="status-field">{speed}</div>
      </div>
    );
  }
}

const ENGINE_QUERY = gql`
  query getEngines($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      id
      name
      speeds {
        text
        number
        velocity
      }
      velocity
      heat
      speed
      on
      stealthFactor
    }
  }
`;

export default graphql(ENGINE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(EngineCoreView);
