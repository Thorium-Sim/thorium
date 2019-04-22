import React, { Component } from "react";
import { Query } from "react-apollo";
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

const QUERY = gql`
  query LongRangeCommunications($simulatorId: ID!) {
    longRangeCommunications(simulatorId: $simulatorId) {
      ...LRCommData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
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
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { longRangeCommunications } = data;
          if (loading || !longRangeCommunications) return null;
          if (!longRangeCommunications[0])
            return <div>No LongRangeCommunications</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      longRangeCommunications:
                        subscriptionData.data.longRangeCommunicationsUpdate
                    });
                  }
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
