import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import Environment from "./environment";
import "./style.css";

const fragment = gql`
  fragment DeckData on Deck {
    id
    number
    environment {
      nitrogen
      oxygen
      trace
      temperature
      humidity
      gravity
      pressure
    }
  }
`;

const QUERY = gql`
  query Environment($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      ...DeckData
    }
  }
  ${fragment}
`;

const SUBSCRIPTION = gql`
  subscription EnvironmentUpdate($simulatorId: ID!) {
    decksUpdate(simulatorId: $simulatorId) {
      ...DeckData
    }
  }
  ${fragment}
`;

class EnvironmentData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { decks } = data;
          if (loading || !decks) return null;

          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      decks: subscriptionData.data.decksUpdate
                    });
                  }
                })
              }
            >
              <Environment {...this.props} decks={decks} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default EnvironmentData;
