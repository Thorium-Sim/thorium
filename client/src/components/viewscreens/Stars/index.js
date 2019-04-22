import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Stars from "./stars";

const fragment = gql`
  fragment StarsData on Engine {
    id
    speed
    previousSpeed
    speeds {
      text
      number
    }
    on
  }
`;

const QUERY = gql`
  query Template($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      ...StarsData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription EngineUpdate($simulatorId: ID!) {
    engineUpdate(simulatorId: $simulatorId) {
      ...StarsData
    }
  }
  ${fragment}
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { engines } = data;
          if (loading || !engines) return null;
          if (!engines) return null;
          const { velocity, activating } = engines.reduce(
            (prev, next, i) => {
              const baseSpeed = next.speed / next.speeds.length;
              if (next.on === true)
                return {
                  velocity: i === 0 ? baseSpeed * 5 : baseSpeed * 100,
                  activating: next.previousSpeed === -1
                };
              return prev;
            },
            { velocity: 0, activating: false }
          );
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return {
                      ...previousResult,
                      engines: previousResult.engines.map(e => {
                        if (e.id === subscriptionData.data.engineUpdate.id)
                          return subscriptionData.data.engineUpdate;
                        return e;
                      })
                    };
                  }
                })
              }
            >
              <Stars
                {...this.props}
                velocity={velocity}
                activating={activating}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
