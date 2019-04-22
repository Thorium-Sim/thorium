import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { OutputField } from "../../generic/core";

import "./style.scss";

const fragment = gql`
  fragment CrmData on Crm {
    id
    activated
  }
`;

const QUERY = gql`
  query Crm($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription CrmUpdate($simulatorId: ID!) {
    crmUpdate(simulatorId: $simulatorId) {
      ...CrmData
    }
  }
  ${fragment}
`;
const CrmCore = props => {
  console.log(props);
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
          state: !props.activated
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
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { crm } = data;
      if (loading) return null;
      if (!crm) return <div>No CRM System</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crm: subscriptionData.data.crmUpdate
                });
              }
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
