import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Review from "./review";
import "./style.scss";

const fragment = gql`
  fragment LRCommData on LRCommunications {
    id
    messages(crew: false, sent: false, approved: false) {
      id
      sender
      message
      encrypted
      datestamp
      sent
    }
  }
`;

export const COMM_REVIEW_QUERY = gql`
  query LongRangeCommunications($simulatorId: ID!) {
    longRangeCommunications(simulatorId: $simulatorId) {
      ...LRCommData
    }
  }
  ${fragment}
`;
export const COMM_REVIEW_SUB = gql`
  subscription LongRangeCommunicationsUpdate($simulatorId: ID!) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      ...LRCommData
    }
  }
  ${fragment}
`;

class LongRangeCommunicationsData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={COMM_REVIEW_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, error, subscribeToMore}) => {
          console.log(error);
          if (loading || !data) return null;
          const {longRangeCommunications} = data;
          if (!longRangeCommunications[0])
            return <div>No LongRangeCommunications</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: COMM_REVIEW_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      longRangeCommunications:
                        subscriptionData.data.longRangeCommunicationsUpdate,
                    });
                  },
                })
              }
            >
              <Review {...this.props} {...longRangeCommunications[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default LongRangeCommunicationsData;
