import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ParticleDetector from "./particleDetector";
import "./style.scss";

const contactsData = `
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
icon
type
destroyed
startTime
endTime
speed
particle
`;

const QUERY = gql`
  query Particles($simulatorId: ID!) {
    sensorContacts(simulatorId:$simulatorId, type:"particle") {
      ${contactsData}
    }
    sensors(simulatorId:$simulatorId, domain:"external") {
      id
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId, type: "particle") {
      ${contactsData}
    }
  }
`;

class ParticleDetectorData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sensorContacts, sensors } = data;
          if (loading || !sensorContacts) return null;
          if (!sensors[0]) return <div>No Sensors</div>;
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
              <ParticleDetector
                {...this.props}
                sensors={sensors[0]}
                contacts={sensorContacts}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default ParticleDetectorData;
