import React, { Component } from "react";
import { Asset } from "../../../../helpers/assets";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import shieldStyle from "../../ShieldControl/shieldStyle";

const SUB = gql`
  subscription StealthUpdate($simulatorId: ID) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      id
      state
      activated
      displayName
    }
  }
`;

const SHIELD_SUB = gql`
  subscription ShieldSub($simulatorId: ID) {
    shieldsUpdate(simulatorId: $simulatorId) {
      id
      position
      integrity
      state
      displayName
    }
  }
`;
class Stealth extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            stealthField: subscriptionData.data.stealthFieldUpdate
          });
        }
      });
    }
    if (!this.shieldSub && !nextProps.data.loading) {
      this.shieldSub = nextProps.data.subscribeToMore({
        document: SHIELD_SUB,
        variables: { simulatorId: nextProps.simulator.id },
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
    this.sub && this.sub();
  }
  render() {
    const stealth =
      this.props.data.loading || !this.props.data.stealthField
        ? {}
        : this.props.data.stealthField[0];
    const shields =
      this.props.data.loading || !this.props.data.shields
        ? []
        : this.props.data.shields;
    return (
      <Asset asset="/Ship Views/Top" simulatorId={this.props.simulator.id}>
        {({ src }) => (
          <div
            className="shieldBubble"
            style={{
              transform: "rotate(270deg)",
              boxShadow: shieldStyle(shields)
            }}
          >
            <div className="stealth" style={{ transform: "rotate(360deg)" }}>
              <img
                alt="ship"
                className="status-ship"
                src={src}
                draggable="false"
              />
              <canvas
                id="stealth-canvas"
                style={{
                  WebkitMaskImage: `url(${src})`,
                  display:
                    stealth.id && (stealth.activated && stealth.state)
                      ? "block"
                      : "none"
                }}
              />
            </div>
          </div>
        )}
      </Asset>
    );
  }
}

const QUERY = gql`
  query Stealth($simulatorId: ID) {
    stealthField(simulatorId: $simulatorId) {
      id
      state
      activated
      displayName
    }
    shields(simulatorId: $simulatorId) {
      id
      position
      integrity
      state
      displayName
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Stealth);
