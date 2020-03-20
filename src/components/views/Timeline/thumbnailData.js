import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Timeline from "./thumbnail";
import "./style.scss";

const fragment = gql`
  fragment TimelineThumbnailData on Simulator {
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
  }
`;

export const TIMELINE_THUMBNAIL_QUERY = gql`
  query Timeline($simulatorId: ID) {
    missions {
      id
      name
      description
    }
    simulators(id: $simulatorId) {
      ...TimelineThumbnailData
    }
  }
  ${fragment}
`;
export const TIMELINE_THUMBNAIL_SUB = gql`
  subscription TimelineUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...TimelineThumbnailData
    }
  }
  ${fragment}
`;

class TimelineData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={TIMELINE_THUMBNAIL_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, error, subscribeToMore}) => {
          if (loading || !data) return "Loading...";
          const {simulators, missions} = data;
          if (!simulators[0]) return <div>No Timeline</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: TIMELINE_THUMBNAIL_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      simulators: subscriptionData.data.simulatorsUpdate,
                    });
                  },
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
