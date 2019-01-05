import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Decon from "./decon";
import "./style.scss";

const queryData = `
  id
  deconActive
  deconProgram
  deconLocation
  bunks {
    id
  }
`;

const QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId:$simulatorId) {
      ${queryData}
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
`;
const SUBSCRIPTION = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId:$simulatorId) {
      ${queryData}
    }
  }
`;

class DeconData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sickbay, decks } = data;
          if (loading || !sickbay) return null;
          if (!sickbay[0]) return <div>No Sickbay</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      sickbay: subscriptionData.data.sickbayUpdate
                    });
                  }
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
