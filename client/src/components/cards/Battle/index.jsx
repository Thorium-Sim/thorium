import React, {Component} from "react";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import BattleCore from "./battle";

const fragment = gql`
  fragment BattleCoreData on SensorContact {
    id
    name
    icon
    hostile
    autoFire
  }
`;

export const BATTLE_QUERY = gql`
  query SensorContacts($simulatorId: ID!) {
    sensorContacts(simulatorId: $simulatorId, hostile: true) {
      ...BattleCoreData
    }
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
      defaultSpeed
      defaultHitpoints
      missPercent
    }
  }
  ${fragment}
`;
export const BATTLE_CONTACT_SUB = gql`
  subscription SensorContactsUpdate($simulatorId: ID!) {
    sensorContactUpdate(simulatorId: $simulatorId, hostile: true) {
      ...BattleCoreData
    }
  }
  ${fragment}
`;

export const BATTLE_SENSORS_SUB = gql`
  subscription SensorsSub($simulatorId: ID!) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      id
      defaultSpeed
      defaultHitpoints
      missPercent
    }
  }
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={BATTLE_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, error, subscribeToMore}) => {
          if (loading || !data) return null;
          const {sensorContacts, sensors} = data;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: BATTLE_CONTACT_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      sensorContacts: subscriptionData.data.sensorContactUpdate,
                    });
                  },
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: BATTLE_SENSORS_SUB,
                    variables: {simulatorId: this.props.simulator.id},
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        sensors: subscriptionData.data.sensorsUpdate,
                      });
                    },
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
