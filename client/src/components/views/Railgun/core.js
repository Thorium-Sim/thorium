import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { InputField } from "../../generic/core";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const queryData = `
id
ammo
maxAmmo
availableAmmo
`;

const QUERY = gql`
  query Railgun($simulatorId: ID!) {
    railgun(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription RailgunUpdate($simulatorId: ID!) {
    railgunUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const RailgunCore = ({ id, ammo, maxAmmo, availableAmmo }) => {
  const performAction = action => ammo => {
    if (parseInt(ammo, 10) >= 0)
      action({ variables: { id, ammo: parseInt(ammo, 10) } });
  };
  return (
    <div className="railgun-core">
      <div style={{ display: "flex" }}>
        <Mutation
          mutation={gql`
            mutation AddAmmo($id: ID!, $ammo: Int!) {
              setRailgunAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{ minWidth: "40px", marginRight: "5px" }}
              onClick={performAction(action)}
            >
              {ammo}
            </InputField>
          )}
        </Mutation>{" "}
        Loaded Ammo
      </div>
      <div style={{ display: "flex" }}>
        <Mutation
          mutation={gql`
            mutation MaxAmmo($id: ID!, $ammo: Int!) {
              setRailgunMaxAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{ minWidth: "40px", marginRight: "5px" }}
              onClick={performAction(action)}
            >
              {maxAmmo}
            </InputField>
          )}
        </Mutation>{" "}
        Max Loadable Ammo
      </div>
      <div style={{ display: "flex" }}>
        <Mutation
          mutation={gql`
            mutation AvailableAmmo($id: ID!, $ammo: Int!) {
              setRailgunAvailableAmmo(id: $id, ammo: $ammo)
            }
          `}
        >
          {action => (
            <InputField
              style={{ minWidth: "40px", marginRight: "5px" }}
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

const RailgunData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { railgun } = data;
      if (loading || !railgun) return null;
      if (!railgun[0]) return <div>No Railgun</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  railgun: subscriptionData.data.railgunUpdate
                });
              }
            })
          }
        >
          <RailgunCore {...props} {...railgun[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default RailgunData;
