import { graphql } from "@apollo/client";
import React, {Component, Fragment} from "react";
import gql from "graphql-tag.macro";
import shieldStyle, {shieldColor} from "../../ShieldControl/shieldStyle";
import SubscriptionHelper from "helpers/subscriptionHelper";
import StealthAnimation from "../../StealthField/stealthAnimation";

export const STATUS_STEALTH_SUB = gql`
  subscription StealthUpdate($simulatorId: ID) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      id
      state
      activated
      displayName
    }
  }
`;

export const STATUS_STEALTH_SHIELD_SUB = gql`
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
  render() {
    const stealth =
      this.props.data.loading || !this.props.data.stealthField
        ? {}
        : this.props.data.stealthField[0];
    const shields =
      this.props.data.loading || !this.props.data.shields
        ? []
        : this.props.data.shields;
    const {assets} = this.props.simulator;
    return (
      <Fragment>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: STATUS_STEALTH_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  stealthField: subscriptionData.data.stealthFieldUpdate,
                });
              },
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: STATUS_STEALTH_SHIELD_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  shields: subscriptionData.data.shieldsUpdate,
                });
              },
            })
          }
        />

        <div
          className="shieldBubble"
          style={{
            transform: "rotate(270deg)",
            boxShadow: shields.length > 1 ? shieldStyle(shields) : null,
            filter:
              shields.length === 1
                ? `drop-shadow(${shieldColor(shields[0])} 0px 0px 30px)`
                : null,
          }}
        >
          <div className="stealth" style={{transform: "rotate(360deg)"}}>
            <img
              alt="ship"
              className="status-ship"
              src={`/assets${assets.top}`}
              draggable="false"
            />
            <StealthAnimation
              status
              {...stealth}
              src={`/assets${assets.top}`}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export const STATUS_STEALTH_QUERY = gql`
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

export default graphql(STATUS_STEALTH_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(Stealth);
