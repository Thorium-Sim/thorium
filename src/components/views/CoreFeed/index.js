import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "../";
import { Button, Alert } from "reactstrap";
import moment from "moment";
import "./style.css";

const COREFEED_SUB = gql`
  subscription CoreFeedUpdate($simulatorId: ID) {
    coreFeedUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      component
      ignored
      timestamp
      title
      body
      color
    }
  }
`;

class CoreFeed extends Component {
  sub = null;
  state = { showIgnore: false, components: false };
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
  componentWillUnmount() {
    this.internalSub && this.internalSub();
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
    if (this.props.data.loading || !this.props.data.coreFeed) return null;
    const { showIgnore, components } = this.state;
    const coreFeed = this.props.data.coreFeed.concat().reverse();
    return (
      <div className="coreFeed-core">
        <p>Core Feed</p>
        <label>
          <input
            type="checkbox"
            checked={showIgnore}
            onChange={e => this.setState({ showIgnore: e.target.checked })}
          />{" "}
          Show Ignored
        </label>
        <label>
          <input
            type="checkbox"
            checked={components}
            onChange={e => this.setState({ components: e.target.checked })}
          />{" "}
          Show Components
        </label>

        {coreFeed.length ? (
          coreFeed.map(c => {
            if (components && c.component) {
              if (c.ignored && !showIgnore) return null;
              const CoreComponent = Cores[c.component];
              return (
                <div key={c.id} className="core-feed-component">
                  {c.component.replace("Core", "")}
                  <CoreComponent {...this.props} />
                  {!showIgnore && (
                    <Button
                      color="info"
                      block
                      size="sm"
                      onClick={() => this.ignoreCoreFeed(c.id)}
                    >
                      Ignore
                    </Button>
                  )}
                </div>
              );
            }
            return (
              <Alert
                key={c.id}
                color={c.color}
                isOpen={!c.ignored || showIgnore}
                toggle={showIgnore ? null : () => this.ignoreCoreFeed(c.id)}
              >
                <strong className="alert-heading">
                  {moment(c.timestamp).format("H:mm:ssa")} - {c.title}
                </strong>
                {c.body && <p>{c.body}</p>}
              </Alert>
            );
          })
        ) : (
          <p>No feed items...</p>
        )}
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
      timestamp
      title
      body
      color
    }
  }
`;
export default graphql(COREFEED_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CoreFeed));
