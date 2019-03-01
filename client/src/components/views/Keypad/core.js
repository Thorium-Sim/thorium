import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import KeypadCore from "./keypadCore";
import "./style.scss";

const fragment = gql`
  fragment KeypadData on Keypad {
    id
    code
    enteredCode
    codeLength
    giveHints
    allowedAttempts
    attempts
    locked
  }
`;

const QUERY = gql`
  query Keypad($simulatorId: ID!) {
    keypads(simulatorId: $simulatorId) {
      ...KeypadData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
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
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { keypads } = data;
          if (loading || !keypads) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      keypads: subscriptionData.data.keypadsUpdate
                    });
                  }
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
