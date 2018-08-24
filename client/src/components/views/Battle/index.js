import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import BattleCore from "./battle";

const queryData = `
id
name
icon
hostile
autoFire
`;

const QUERY = gql`
  query SensorContacts($simulatorId: ID!) {
    sensorContacts(simulatorId: $simulatorId, hostile:true) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SensorContactsUpdate($simulatorId: ID!) {
    sensorContactUpdate(simulatorId: $simulatorId, hostile: true) {
${queryData}
    }
  }
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sensorContacts } = data;
          if (loading || !sensorContacts) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    console.log(previousResult, { subscriptionData });
                    return Object.assign({}, previousResult, {
                      sensorContacts: subscriptionData.data.sensorContactUpdate
                    });
                  }
                })
              }
            >
              <BattleCore {...this.props} contacts={sensorContacts} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
