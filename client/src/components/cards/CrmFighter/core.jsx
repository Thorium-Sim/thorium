import React from "react";
import {Query, Mutation} from "@apollo/client/react/components";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {OutputField} from "../../generic/core";

import "./style.scss";

const fragment = gql`
  fragment CrmCoreData on Crm {
    id
    activated
  }
`;

export const CRM_FIGHTER_CORE_QUERY = gql`
  query Crm($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmCoreData
    }
  }
  ${fragment}
`;
export const CRM_FIGHTER_CORE_SUB = gql`
  subscription CrmUpdate($simulatorId: ID!) {
    crmUpdate(simulatorId: $simulatorId) {
      ...CrmCoreData
    }
  }
  ${fragment}
`;
const CrmCore = props => {
  return (
    <div className="crm-core">
      <Mutation
        mutation={gql`
          mutation SetCRMActiavted($id: ID!, $state: Boolean!) {
            crmSetActivated(id: $id, state: $state)
          }
        `}
        variables={{
          id: props.id,
          state: !props.activated,
        }}
      >
        {action => (
          <OutputField alert={props.activated} onDoubleClick={action}>
            {props.activated ? "Activated" : "Deactivated"}
          </OutputField>
        )}
      </Mutation>
    </div>
  );
};

const CrmData = props => (
  <Query
    query={CRM_FIGHTER_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {crm} = data;
      if (!crm) return <div>No CRM System</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: CRM_FIGHTER_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  crm: subscriptionData.data.crmUpdate,
                });
              },
            })
          }
        >
          <CrmCore {...props} {...crm} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default CrmData;
