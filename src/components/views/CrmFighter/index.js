import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import FighterData from "./fighterData";
import "./style.scss";

const fragment = gql`
  fragment CrmMovementData on Crm {
    id
    displayName
    fighterImage
    phasers {
      target {
        x
        y
      }
      destination {
        x
        y
      }
    }
    torpedos {
      id
      position {
        x
        y
      }
      destroyed
    }
    enemies {
      id
      icon
      size
      destroyed
      position {
        x
        y
      }
    }
    fighters {
      id
      icon
      size
      destroyed
      docked
      position {
        x
        y
      }
    }
    interval
  }
`;

export const CRM_MOVEMENT_QUERY = gql`
  query CrmMovement($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmMovementData
    }
  }
  ${fragment}
`;
export const CRM_MOVEMENT_SUBSCRIPTION = gql`
  subscription CrmMovement($simulatorId: ID!) {
    crmMovementUpdate(simulatorId: $simulatorId) {
      ...CrmMovementData
    }
  }
  ${fragment}
`;
class CrmData extends Component {
  static hypercard = true;

  state = {};
  render() {
    return (
      <Query
        query={CRM_MOVEMENT_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, error, subscribeToMore}) => {
          console.log(error);
          if (loading || !data) return null;
          const {crm} = data;
          if (!crm) return <div>No CRM System</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: CRM_MOVEMENT_SUBSCRIPTION,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      crm: subscriptionData.data.crmMovementUpdate,
                    });
                  },
                })
              }
            >
              <FighterData {...this.props} crm={crm} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default CrmData;
