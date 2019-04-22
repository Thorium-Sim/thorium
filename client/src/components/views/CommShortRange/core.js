import React from "react";
import { Query } from "react-apollo";
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

const QUERY = gql`
  query ShortRangeComm($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription ShortRangeCommUpdate($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
      ...ShortRangeData
    }
  }
  ${fragment}
`;

const ShortRangeCommCoreData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { shortRangeComm } = data;
      if (loading || !shortRangeComm) return null;
      if (!shortRangeComm[0]) return <div>No ShortRangeComm</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) =>
                Object.assign({}, previousResult, {
                  shortRangeComm: subscriptionData.data.shortRangeCommUpdate
                })
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
