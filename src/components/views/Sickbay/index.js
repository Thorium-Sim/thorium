import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import Sickbay from "./sickbay";
import "./style.css";

const queryData = `
  id
  deconActive
  deconProgram
  deconLocation
`;

const QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId:$simulatorId) {
      ${queryData}
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

class SickbayData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sickbay } = data;
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
                      computerCore: subscriptionData.data.sickbayUpdate
                    });
                  }
                })
              }
            >
              <Sickbay {...this.props} {...template[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default SickbayData;
