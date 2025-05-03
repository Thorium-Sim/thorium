import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import CommShortRange from "./shortRangeCommCore";
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

export const COMM_SHORT_RANGE_CORE_QUERY = gql`
  query ShortRangeComm($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;
export const COMM_SHORT_RANGE_CORE_SUB = gql`
  subscription ShortRangeCommUpdate($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;

const ShortRangeCommCoreData = props => (
  <Query
    query={COMM_SHORT_RANGE_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {shortRangeComm} = data;
      if (!shortRangeComm[0]) return <div>No ShortRangeComm</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: COMM_SHORT_RANGE_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) =>
                Object.assign({}, previousResult, {
                  shortRangeComm: subscriptionData.data.shortRangeCommUpdate,
                }),
            })
          }
        >
          <CommShortRange {...props} {...shortRangeComm[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default ShortRangeCommCoreData;
