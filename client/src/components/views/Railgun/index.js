import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import Railgun from "./railgun";
import "./style.scss";

const queryData = `
id
displayName
damage {
  damaged
}
power {
  power
  powerLevels
}
ammo
maxAmmo
availableAmmo
`;

const QUERY = gql`
  query Railgun($simulatorId: ID!) {
    railgun(simulatorId: $simulatorId) {
${queryData}
    }
    sensorContacts(simulatorId:$simulatorId, type:"projectile") {
      id
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      position {
        x
        y
        z
      }
      destroyed
      startTime
      endTime
      speed
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription RailgunUpdate($simulatorId: ID!) {
    railgunUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const CONTACTS_SUB = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId) {
      id
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      position {
        x
        y
        z
      }
      destroyed
      startTime
      endTime
      speed
    }
  }
`;
class RailgunData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { railgun } = data;
          if (loading || !railgun) return null;
          if (!railgun[0]) return <div>No Railgun</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      railgun: subscriptionData.data.railgunUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: CONTACTS_SUB,
                    variables: { simulatorId: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        sensorContacts:
                          subscriptionData.data.sensorContactUpdate
                      });
                    }
                  })
                }
              />
              <Railgun {...this.props} {...railgun[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default RailgunData;
