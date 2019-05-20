import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import AuxTimeline from "./auxTimeline";
import "./style.scss";

const fragment = gql`
  fragment AuxTimelineData on TimelineInstance {
    id
    currentTimelineStep
    executedTimelineSteps
    mission {
      id
      name
      timeline {
        id
        name
        timelineItems {
          id
          args
          event
          delay
        }
      }
    }
  }
`;
const QUERY = gql`query AuxTimelines($simulatorId:ID!) {
  missions(aux:true) {
    id
    name
  }
  auxTimelines(simulatorId:$simulatorId) {
  ...AuxTimelineData
  }
  ${fragment}
}`;

const SUBSCRIPTION = gql`
  subscription TimelineUpdate($simulatorId: ID!) {
    auxTimelinesUpdate(simulatorId: $simulatorId) {
      ...AuxTimelineData
    }
  }
  ${fragment}
`;

class TimelineData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { auxTimelines, missions } = data;
          if (loading) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      auxTimelines: subscriptionData.data.auxTimelinesUpdate
                    });
                  }
                })
              }
            >
              <AuxTimeline
                {...this.props}
                auxTimelines={auxTimelines}
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
