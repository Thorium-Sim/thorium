import React from "react";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {InputField} from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragments = {
  RailgunCoreData: gql`
    fragment RailgunCoreData on Railgun {
      id
      ammo
      maxAmmo
      availableAmmo
    }
  `,
};

export const RAILGUN_CORE_QUERY = gql`
  query Railgun($simulatorId: ID!) {
    railgun(simulatorId: $simulatorId) {
      ...RailgunCoreData
    }
  }
  ${fragments.RailgunCoreData}
`;
export const RAILGUN_CORE_SUB = gql`
  subscription RailgunUpdate($simulatorId: ID!) {
    railgunUpdate(simulatorId: $simulatorId) {
      ...RailgunCoreData
    }
    ${fragments.RailgunCoreData}
  }
`;

const RailgunCore = ({id, ammo, maxAmmo, availableAmmo}) => {
  const performAction = action => ammo => {
    if (parseInt(ammo, 10) >= 0)
      action({variables: {id, ammo: parseInt(ammo, 10)}});
  };
  return (
    <div className="railgun-core">
      <div style={{display: "flex"}}>
        <Mutation
          mutation={gql`
            mutation AddAmmo($id: ID!, $ammo: Int!) {
              setRailgunAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{minWidth: "40px", marginRight: "5px"}}
              onClick={performAction(action)}
            >
              {ammo}
            </InputField>
          )}
        </Mutation>{" "}
        Loaded Ammo
      </div>
      <div style={{display: "flex"}}>
        <Mutation
          mutation={gql`
            mutation MaxAmmo($id: ID!, $ammo: Int!) {
              setRailgunMaxAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{minWidth: "40px", marginRight: "5px"}}
              onClick={performAction(action)}
            >
              {maxAmmo}
            </InputField>
          )}
        </Mutation>{" "}
        Max Loadable Ammo
      </div>
      <div style={{display: "flex"}}>
        <Mutation
          mutation={gql`
            mutation AvailableAmmo($id: ID!, $ammo: Int!) {
              setRailgunAvailableAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{minWidth: "40px", marginRight: "5px"}}
              onClick={performAction(action)}
            >
              {availableAmmo}
            </InputField>
          )}
        </Mutation>{" "}
        Available Ammo
      </div>
    </div>
  );
};

const RailgunCoreData = props => (
  <Query
    query={RAILGUN_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {railgun} = data;
      if (!railgun[0]) return <div>No Railgun</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: RAILGUN_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  railgun: subscriptionData.data.railgunUpdate,
                });
              },
            })
          }
        >
          <RailgunCore {...props} {...railgun[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default RailgunCoreData;
