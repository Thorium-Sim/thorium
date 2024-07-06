import { Query } from "@apollo/client";
import React, {Component} from "react";
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

export const SICKBAY_QUERY = gql`
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

export const SICKBAY_CREW_SUB = gql`
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
export const SICKBAY_SUB = gql`
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
      <Query
        query={SICKBAY_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {sickbay, crew} = data;
          if (!sickbay[0]) return <div>No Sickbay</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SICKBAY_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      sickbay: subscriptionData.data.sickbayUpdate,
                    });
                  },
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: SICKBAY_CREW_SUB,
                    variables: {simulatorId: this.props.simulator.id},
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        crew: subscriptionData.data.crewUpdate,
                      });
                    },
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
