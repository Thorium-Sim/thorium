import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "../";
import { Button, ButtonGroup } from "reactstrap";
import FontAwesome from "react-fontawesome";
import moment from "moment";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import CoreFeedConfig from "./config";

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
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_coreFeed");
    const allowed = storedAllowed ? JSON.parse(storedAllowed) : {};
    this.state = { components: {}, allowed };
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
  toggle = () => {
    const storedAllowed = localStorage.getItem("allowed_coreFeed");
    const allowed = storedAllowed ? JSON.parse(storedAllowed) : {};
    this.setState({ config: !this.state.config, allowed });
  };
  render() {
    if (this.props.data.loading || !this.props.data.coreFeed) return null;
    const coreFeed = this.props.data.coreFeed.concat().reverse();
    const { components, config, allowed } = this.state;
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
        <ButtonGroup>
          <Button color="warning" size="sm" onClick={this.toggle}>
            Configure
          </Button>
          <Button color="info" size="sm" onClick={this.ignoreAll}>
            Ignore All
          </Button>
        </ButtonGroup>
        <p>Click on core feed notification for contextual component.</p>
        {coreFeed.length ? (
          coreFeed
            .filter(c => !c.ignored && allowed[c.component] !== false)
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
                <div key={`${c.id}-alert`}>
                  <div
                    className={`alert alert-${c.color} alert-dismissible`}
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
        <CoreFeedConfig modal={config} toggle={this.toggle} />
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
