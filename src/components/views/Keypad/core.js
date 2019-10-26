import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import KeypadCore from "./keypadCore";
import "./style.scss";

const fragment = gql`
  fragment KeypadData on Keypad {
    id
    label
    code
    enteredCode
    codeLength
    giveHints
    allowedAttempts
    attempts
    locked
  }
`;

export const KEYPAD_QUERY = gql`
  query Keypad($simulatorId: ID!) {
    keypads(simulatorId: $simulatorId) {
      ...KeypadData
    }
  }
  ${fragment}
`;
export const KEYPAD_SUB = gql`
  subscription KeypadUpdate($simulatorId: ID!) {
    keypadsUpdate(simulatorId: $simulatorId) {
      ...KeypadData
    }
  }
  ${fragment}
`;

class KeypadData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={KEYPAD_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {keypads} = data;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: KEYPAD_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      keypads: subscriptionData.data.keypadsUpdate,
                    });
                  },
                })
              }
            >
              <KeypadCore {...this.props} keypads={keypads} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default KeypadData;
