import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "../";
import { Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import moment from "moment";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

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
  state = { components: {} };
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
  ignoreAll = () => {
    const mutation = gql`
      mutation IgnoreCoreFeed($id: ID) {
        ignoreCoreFeed(id: $id)
      }
    `;
    const variables = { id: this.props.simulator.id };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  showComponent = id => {
    this.setState({
      components: Object.assign({}, this.state.components, { [id]: true })
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.coreFeed) return null;
    const coreFeed = this.props.data.coreFeed.concat().reverse();
    const { components } = this.state;
    return (
      <div className="coreFeed-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: COREFEED_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  coreFeed: subscriptionData.data.coreFeedUpdate
                });
              }
            })
          }
        />
        <p>Core Feed</p>
        <Button color="info" size="sm" block onClick={this.ignoreAll}>
          Ignore All
        </Button>
        <p>Click on core feed notification for contextual component.</p>
        {coreFeed.length ? (
          coreFeed
            .filter(c => !c.ignored)
            .filter((c, i) => (i < 50 ? true : false))
            .map(c => {
              if (components[c.id] && c.component && Cores[c.component]) {
                const CoreComponent = Cores[c.component];

                return (
                  <div
                    key={`${c.id}-component`}
                    className="core-feed-component"
                  >
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
              }
              return (
                <div>
                  <div
                    className={`alert alert-${c.color} alert-dismissible`}
                    key={`${c.id}-alert`}
                    onClick={() => this.showComponent(c.id)}
                  >
                    <strong className="alert-heading">
                      {moment(c.timestamp).format("H:mm:ssa")} - {c.title}
                    </strong>
                    {c.body && <p>{c.body}</p>}
                    <FontAwesome
                      className="pull-right"
                      name="times"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.ignoreCoreFeed(c.id);
                      }}
                    />
                  </div>
                </div>
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
