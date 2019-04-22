import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Sickbay from "./sickbay";
import "./style.scss";

const fragment = gql`
  fragment SickbayData on Sickbay {
    id
    bunks {
      id
      patient {
        id
        age
        rank
        name
        gender
        position
        charts {
          id
          o2levels
          symptoms
          heartRate
          diagnosis
          treatment
          treatmentRequest
          temperature
          bloodPressure
          admitTime
          dischargeTime
          painPoints {
            x
            y
          }
        }
      }
      scanning
      scanRequest
      scanResults
    }
    sickbayRoster {
      id
      name
      position
      firstName
      lastName
    }
  }
`;

const QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      ...SickbayData
    }
    crew(simulatorId: $simulatorId) {
      id
      name
      position
      firstName
      lastName
    }
  }
  ${fragment}
`;

const CREWSUB = gql`
  subscription CrewSub($simulatorId: ID!) {
    crewUpdate(simulatorId: $simulatorId) {
      id
      name
      position
      firstName
      lastName
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      ...SickbayData
    }
  }
  ${fragment}
`;

class SickbayData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { sickbay, crew } = data;
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
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: CREWSUB,
                    variables: { simulatorId: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        crew: subscriptionData.data.crewUpdate
                      });
                    }
                  })
                }
              />
              <Sickbay {...this.props} {...sickbay[0]} crew={crew} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default SickbayData;
