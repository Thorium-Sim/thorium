import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "./index";

import "./style.scss";

console.log(Cores);

const COREFEED_SUB = gql`
  subscription CoreFeedUpdate($simulatorId: ID) {
    coreFeedUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      component
      ignored
    }
  }
`;

class CoreFeed extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: COREFEED_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            coreFeed: subscriptionData.data.coreFeedUpdate
          });
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    return <div className="coreFeed-core">This is the core feed</div>;
  }
}

const COREFEED_QUERY = gql`
  query CoreFeed($simulatorId: ID) {
    coreFeed(simulatorId: $simulatorId) {
      id
      simulatorId
      component
      ignored
    }
  }
`;
export default graphql(COREFEED_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CoreFeed));
