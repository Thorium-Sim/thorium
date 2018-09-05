import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ShortRangeComm from "./shortRangeComm";
import "./style.scss";

const queryData = `
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
`;

const QUERY = gql`
  query ShortRange($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription ShortRangeUpdate($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class ShortRangeCommData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { shortRangeComm } = data;
          if (loading || !shortRangeComm) return null;
          if (!shortRangeComm[0]) return <div>No Short Range Comm</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      shortRangeComm: subscriptionData.data.shortRangeCommUpdate
                    });
                  }
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
