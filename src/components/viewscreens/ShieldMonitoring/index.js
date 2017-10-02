import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import Shield1 from "./shield-1";
import Shield4 from "./shield-4";
import Shield6 from "./shield-6";
import "./style.scss";

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
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ shields: subscriptionData.data.shieldsUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const shields = this.props.data.shields;
    if (shields.length === 1) {
      return <Shield1 shields={shields} simulator={this.props.simulator} />;
    }
    if (shields.length === 4) {
      return <Shield4 shields={shields} simulator={this.props.simulator} />;
    }
    if (shields.length === 6) {
      return <Shield6 shields={shields} simulator={this.props.simulator} />;
    }
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
