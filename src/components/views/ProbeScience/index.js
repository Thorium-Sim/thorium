import { Query } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ProbeScience from "./probeScience";
import "./style.scss";

const fragments = {
  contactFragment: gql`
    fragment ProbeScienceSensorContactData on SensorContact {
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
    }
  `,
  probeFragment: gql`
    fragment ProbeScienceData on Probes {
      id
      scienceTypes {
        id
        name
        type
        description
        equipment
      }
      probes {
        id
        type
        name
        launched
        equipment {
          id
          name
          count
        }
        charge
      }
    }
  `,
};
export const PROBES_SCIENCE_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      ...ProbeScienceData
    }
  }
  ${fragments.probeFragment}
`;

export const PROBES_SCIENCE_QUERY = gql`
  query Bursts($simulatorId: ID!) {
    sensorContacts(simulatorId: $simulatorId, type: "burst") {
      ...ProbeScienceSensorContactData
    }
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
    }
    probes(simulatorId: $simulatorId) {
      ...ProbeScienceData
    }
  }
  ${fragments.contactFragment}
  ${fragments.probeFragment}
`;
export const PROBES_SCIENCE_CONTACT_SUB = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId, type: "burst") {
      ...ProbeScienceSensorContactData
    }
  }
  ${fragments.contactFragment}
`;

class ParticleDetectorData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={PROBES_SCIENCE_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {sensorContacts, sensors, probes} = data;
          if (!sensors[0]) return <div>No Sensors</div>;
          if (!probes[0]) return <div>No Probes</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: PROBES_SCIENCE_CONTACT_SUB,
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
                    document: PROBES_SCIENCE_SUB,
                    variables: {simulatorId: this.props.simulator.id},
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        probes: subscriptionData.data.probesUpdate,
                      });
                    },
                  })
                }
              />
              <ProbeScience
                {...this.props}
                sensors={sensors[0]}
                probes={probes[0]}
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
