import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Timeline from "./timeline";
import "./style.scss";

const queryData = `
id
currentTimelineStep
executedTimelineSteps
mission {
  id
  name
  description
  timeline {
    id
    name
    order
    description
    timelineItems {
      id
      name
      type
      args
      event
      delay
    }
  }
}
`;

const QUERY = gql`
  query Timeline($simulatorId: String) {
    missions {
      id
      name
      description
    }
    simulators(id: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TimelineUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class TimelineData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { simulators, missions } = data;
          if (loading || !simulators) return null;
          if (!simulators[0]) return <div>No Timeline</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      simulators: subscriptionData.data.simulatorsUpdate
                    });
                  }
                })
              }
            >
              <Timeline
                {...this.props}
                {...simulators[0]}
                missions={missions}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TimelineData;
