import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "../";
import { Button } from "reactstrap";
import "./style.scss";

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
  ignoreCoreFeed = id => {
    const mutation = gql`
      mutation IgnoreCoreFeed($id: ID) {
        ignoreCoreFeed(id: $id)
      }
    `;
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const coreFeed = this.props.data.coreFeed.filter(c => !c.ignored);
    return (
      <div className="coreFeed-core">
        <p>Core Feed</p>
        {coreFeed.length
          ? coreFeed.map(c => {
              const CoreComponent = Cores[c.component];
              return (
                <div key={c.id} className="core-feed-component">
                  {c.component.replace("Core", "")}
                  <CoreComponent {...this.props} />
                  <Button
                    color="info"
                    block
                    size="sm"
                    onClick={() => this.ignoreCoreFeed(c.id)}
                  >
                    Ignore
                  </Button>
                </div>
              );
            })
          : <p>No feed items...</p>}
      </div>
    );
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
