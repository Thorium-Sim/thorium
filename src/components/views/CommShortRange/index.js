import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ShortRangeComm from "./shortRangeComm";
import "./style.scss";

const fragment = gql`
  fragment ShortRangeData on ShortRangeComm {
    id
    simulatorId
    name
    arrows {
      id
      signal
      frequency
      connected
      muted
    }
    signals {
      id
      name
      image
      color
      range {
        lower
        upper
      }
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
`;

export const COMM_SHORT_RANGE_QUERY = gql`
  query ShortRange($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;
export const COMM_SHORT_RANGE_SUB = gql`
  subscription ShortRangeUpdate($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;

class ShortRangeCommData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={COMM_SHORT_RANGE_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {shortRangeComm} = data;
          if (!shortRangeComm[0]) return <div>No Short Range Comm</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: COMM_SHORT_RANGE_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      shortRangeComm:
                        subscriptionData.data.shortRangeCommUpdate,
                    });
                  },
                })
              }
            >
              <ShortRangeComm {...this.props} {...shortRangeComm[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default ShortRangeCommData;
