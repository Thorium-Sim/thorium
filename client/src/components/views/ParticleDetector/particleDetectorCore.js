import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const particleIcons = [
  "Anomaly",
  "Asteroid",
  "Asteroids",
  "Asteroids 2",
  "Black Hole",
  "Cross",
  "Debris",
  "Particles",
  "Singularity",
  "Wreckage"
];
const particleTypes = [
  "Dilithium",
  "Tachyon",
  "Neutrino",
  "AntiMatter",
  "Anomaly"
];

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
`;

const QUERY = gql`
  query Particles($simulatorId: ID!) {
    sensorContacts(simulatorId:$simulatorId, type:"particle") {
      ${contactsData}
    }
  }
`;
const CONTACTS_SUB = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId, type: "particle") {
      ${contactsData}
    }
  }
`;

const ParticleDetectorCore = () => (
  <div className="particleDetector-core">Hello World!</div>
);

const ParticleDetectorData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { sensorContacts } = data;
      if (loading || !sensorContacts) return null;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: CONTACTS_SUB,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sensorContacts: subscriptionData.data.sensorContactUpdate
                });
              }
            })
          }
        >
          <ParticleDetectorCore {...props} contacts={sensorContacts} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);

export default ParticleDetectorData;
