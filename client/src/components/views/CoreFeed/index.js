import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Cores } from "../";
import { Button, ButtonGroup } from "reactstrap";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "helpers/subscriptionHelper";
import CoreFeedConfig from "./config";
import { DateTime } from "luxon";
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
  collapseCoreFeed = id => {
    this.setState({
      components: Object.assign({}, this.state.components, { [id]: false })
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
  collapseAll = () => {
    const coreFeed = this.props.data.coreFeed.concat();
    this.setState({
      components: coreFeed.reduce((acc, cf) => ({ ...acc, [cf.id]: false }), {})
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
  coreFeedFilter = c => {
    const { allowed } = this.state;
    if (c.ignored) return false;
    if (c.component === "NewMessagingCore" && allowed.MessagingCore === false)
      return false;
    if (allowed[c.component] === false) return false;
    return true;
  };
  render() {
    if (this.props.data.loading || !this.props.data.coreFeed) return null;
    const coreFeed = this.props.data.coreFeed.concat().reverse();
    const { components, config } = this.state;
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
          <Button color="primary" size="sm" onClick={this.collapseAll}>
            Collapse All
          </Button>
        </ButtonGroup>
        <p>Click on core feed notification for contextual component.</p>
        {coreFeed.length ? (
          coreFeed
            .filter(this.coreFeedFilter)
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
                    <div style={{ display: "flex" }}>
                      <Button
                        color="warning"
                        style={{ flex: 1 }}
                        size="sm"
                        onClick={() => this.collapseCoreFeed(c.id)}
                      >
                        Collapse
                      </Button>{" "}
                      <Button
                        color="info"
                        style={{ flex: 1 }}
                        size="sm"
                        onClick={() => this.ignoreCoreFeed(c.id)}
                      >
                        Ignore
                      </Button>
                    </div>
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
                      {DateTime.fromJSDate(
                        new Date(parseInt(c.timestamp))
                      ).toFormat("h:mm:ssa")}{" "}
                      - {c.title}
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
