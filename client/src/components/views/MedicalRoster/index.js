import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Roster from "./roster";
import "./style.scss";

const fragment = gql`
  fragment CrewData on Crew {
    id
    firstName
    lastName
    age
    rank
    name
    gender
    position
  }
`;

const QUERY = gql`
  query Template($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      id
      sickbayRoster {
        ...CrewData
      }
    }
    crew(simulatorId: $simulatorId) {
      ...CrewData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription Sickbay($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      id
      sickbayRoster {
        ...CrewData
      }
    }
  }
  ${fragment}
`;

const CREWSUB = gql`
  subscription CrewSub($simulatorId: ID!) {
    crewUpdate(simulatorId: $simulatorId) {
      ...CrewData
    }
  }
  ${fragment}
`;

class TemplateData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data = {}, subscribeToMore }) => {
          const { sickbay, crew } = data;
          if (loading || !sickbay) return null;

          if (!sickbay[0]) return <div>No sickbay</div>;
          return (
            <Fragment>
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
              />
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
              <Roster {...this.props} {...sickbay[0]} crew={crew} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
export default TemplateData;
