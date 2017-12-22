import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import Shield1 from "./shield-1";
import Shield4 from "./shield-4";
import Shield6 from "./shield-6";
import "./style.css";

const SHIELD_SUB = gql`
  subscription ShieldSub($simulatorId: ID) {
    shieldsUpdate(simulatorId: $simulatorId) {
      id
      state
      position
      integrity
      simulatorId
    }
  }
`;

class ShieldMonitoring extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.shieldSub && !nextProps.data.loading) {
      this.shieldSub = nextProps.data.subscribeToMore({
        document: SHIELD_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            shields: subscriptionData.data.shieldsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.shieldSub && this.shieldSub();
  }
  render() {
    if (this.props.data.loading || !this.props.data.shields) return null;
    const shields = this.props.data.shields;
    return (
      <div className="viewscreen-shieldMonitoring">
        <h1>Shield Monitoring</h1>
        {shields.length === 1 && (
          <Shield1 shields={shields} simulator={this.props.simulator} />
        )}
        {shields.length === 4 && (
          <Shield4 shields={shields} simulator={this.props.simulator} />
        )}
        {shields.length === 6 && (
          <Shield6 shields={shields} simulator={this.props.simulator} />
        )}
      </div>
    );
  }
}

const SHIELD_QUERY = gql`
  query Shields($simulatorId: ID!) {
    shields(simulatorId: $simulatorId) {
      id
      state
      position
      integrity
      simulatorId
    }
  }
`;
export default graphql(SHIELD_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ShieldMonitoring));
