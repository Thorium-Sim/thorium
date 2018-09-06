import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
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
    sensors(simulatorId:$simulatorId, domain:"external") {
    id
    defaultSpeed
    defaultHitpoints
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

const SENSORS_SUB = gql`
  subscription SensorsSub($simulatorId: ID!) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      id
      defaultSpeed
      defaultHitpoints
    }
  }
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sensorContacts, sensors } = data;
          if (loading || !sensorContacts || !sensors) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      sensorContacts: subscriptionData.data.sensorContactUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: SENSORS_SUB,
                    variables: { simulatorId: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        sensors: subscriptionData.data.sensorsUpdate
                      });
                    }
                  })
                }
              />
              <BattleCore
                {...this.props}
                contacts={sensorContacts}
                sensors={sensors[0]}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
