import React from "react";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {OutputField} from "../../generic/core";
import {Button} from "helpers/reactstrap";
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

export const SUBSPACE_CORE_QUERY = gql`
  query SubspaceField($simulatorId: ID!) {
    subspaceField(simulatorId: $simulatorId) {
      ...SubspaceFieldCoreData
    }
  }
  ${fragment}
`;
export const SUBSPACE_CORE_SUB = gql`
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
  dorsal,
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
          style={{display: "inline-block", minWidth: "4ch"}}
          alert={totalPower !== total}
        >
          {total}
        </OutputField>
      </div>
      <div>
        Power Available:{" "}
        <OutputField style={{display: "inline-block", minWidth: "4ch"}}>
          {totalPower}
        </OutputField>
      </div>
      <div style={{display: "flex"}}>
        <Mutation
          mutation={gql`
            mutation Flux($id: ID!) {
              fluxSubspaceField(id: $id)
            }
          `}
          variables={{id}}
        >
          {action => (
            <Button
              size="sm"
              style={{flex: 1}}
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
          variables={{id}}
        >
          {action => (
            <Button
              size="sm"
              style={{flex: 1}}
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
  <Query
    query={SUBSPACE_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {subspaceField} = data;
      if (!subspaceField[0]) return <div>No Subspace Field</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSPACE_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  subspaceField: subscriptionData.data.subspaceFieldUpdate,
                });
              },
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
