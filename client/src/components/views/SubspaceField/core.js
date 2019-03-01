import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { OutputField } from "../../generic/core";
import { Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragment = gql`
  fragment SubspaceFieldCoreData on SubspaceField {
    id
    name
    totalPower
    fore {
      required
      value
    }
    aft {
      required
      value
    }
    port {
      required
      value
    }
    starboard {
      required
      value
    }
    ventral {
      required
      value
    }
    dorsal {
      required
      value
    }
  }
`;

const QUERY = gql`
  query SubspaceField($simulatorId: ID!) {
    subspaceField(simulatorId: $simulatorId) {
      ...SubspaceFieldCoreData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription SubspaceFieldUpdate($simulatorId: ID!) {
    subspaceFieldUpdate(simulatorId: $simulatorId) {
      ...SubspaceFieldCoreData
    }
  }
  ${fragment}
`;

const SubspaceFieldCore = ({
  id,
  totalPower,
  fore,
  aft,
  port,
  starboard,
  ventral,
  dorsal
}) => {
  const total =
    fore.value +
    aft.value +
    port.value +
    starboard.value +
    ventral.value +
    dorsal.value;
  return (
    <div className="subspaceField-core">
      <div>
        Power Used:{" "}
        <OutputField
          style={{ display: "inline-block", minWidth: "4ch" }}
          alert={totalPower !== total}
        >
          {total}
        </OutputField>
      </div>
      <div>
        Power Available:{" "}
        <OutputField style={{ display: "inline-block", minWidth: "4ch" }}>
          {totalPower}
        </OutputField>
      </div>
      <div style={{ display: "flex" }}>
        <Mutation
          mutation={gql`
            mutation Flux($id: ID!) {
              fluxSubspaceField(id: $id)
            }
          `}
          variables={{ id }}
        >
          {action => (
            <Button
              size="sm"
              style={{ flex: 1 }}
              color="warning"
              onClick={action}
            >
              Flux
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={gql`
            mutation Normal($id: ID!) {
              normalSubspaceField(id: $id)
            }
          `}
          variables={{ id }}
        >
          {action => (
            <Button
              size="sm"
              style={{ flex: 1 }}
              color="primary"
              onClick={action}
            >
              Normal
            </Button>
          )}
        </Mutation>
      </div>
    </div>
  );
};

const SubspaceFieldData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { subspaceField } = data;
      if (loading || !subspaceField) return null;
      if (!subspaceField[0]) return <div>No Subspace Field</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  subspaceField: subscriptionData.data.subspaceFieldUpdate
                });
              }
            })
          }
        >
          <SubspaceFieldCore {...props} {...subspaceField[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default SubspaceFieldData;
