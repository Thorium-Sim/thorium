import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Decon from "./decon";
import "./style.scss";

const fragment = gql`
  fragment DeconData on Sickbay {
    id
    deconActive
    deconProgram
    deconLocation
    bunks {
      id
    }
  }
`;

export const DECON_QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      ...DeconData
    }
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
  ${fragment}
`;
export const DECON_SUB = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      ...DeconData
    }
  }
  ${fragment}
`;

class DeconData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={DECON_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {sickbay, decks} = data;
          if (!sickbay[0]) return <div>No Sickbay</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: DECON_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      sickbay: subscriptionData.data.sickbayUpdate,
                    });
                  },
                })
              }
            >
              <Decon {...this.props} {...sickbay[0]} decks={decks} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DeconData;
