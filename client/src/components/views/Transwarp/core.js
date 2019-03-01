import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button } from "reactstrap";
import { OutputField } from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragments = {
  coreData: gql`
    fragment CoreData on TranswarpQuad {
      core {
        required
        value
      }
      warp {
        required
        value
      }
      field {
        required
        value
      }
    }
  `,
  transwarpFragment: gql`
    fragment TranswarpCoreData on Transwarp {
      id
      quad1 {
        ...CoreData
      }
      quad2 {
        ...CoreData
      }
      quad3 {
        ...CoreData
      }
      quad4 {
        ...CoreData
      }
      active
      power {
        power
        powerLevels
      }
    }
  `
};

const QUERY = gql`
  query Transwarp($simulatorId: ID!) {
    transwarp(simulatorId: $simulatorId) {
      ...TranswarpCoreData
    }
  }
  ${fragments.coreData}
  ${fragments.transwarpFragment}
`;
const SUBSCRIPTION = gql`
  subscription TranswarpUpdate($simulatorId: ID!) {
    transwarpUpdate(simulatorId: $simulatorId) {
      ...TranswarpCoreData
    }
  }
  ${fragments.coreData}
  ${fragments.transwarpFragment}
`;

const TranswarpCore = ({ id, quad1, quad2, quad3, quad4, active, power }) => {
  const requiredPower = Object.values({ quad1, quad2, quad3, quad4 })
    .map(q =>
      Object.values(q).reduce(
        (prev, next) => prev + parseInt(next.required, 10),
        0
      )
    )
    .reduce((prev, next) => prev + parseInt(next, 10), 0);
  const usedPower = Object.values({ quad1, quad2, quad3, quad4 })
    .map(q =>
      Object.values(q).reduce(
        (prev, next) => prev + parseInt(next.value, 10),
        0
      )
    )
    .reduce((prev, next) => prev + parseInt(next, 10), 0);
  // Power total is current power level divided by the max power level times 300
  const powerTotal =
    (power.power / power.powerLevels[power.powerLevels.length - 1]) * 300;
  return (
    <div className="transwarp-core">
      <div>
        Power Used:{" "}
        <OutputField style={{ display: "inline-block", minWidth: "4ch" }}>
          {usedPower}
        </OutputField>
      </div>
      <div>
        Power Required:{" "}
        <OutputField style={{ display: "inline-block", minWidth: "4ch" }}>
          {requiredPower}
        </OutputField>
      </div>
      <div>
        Power Available:{" "}
        <OutputField style={{ display: "inline-block", minWidth: "4ch" }}>
          {powerTotal}
        </OutputField>
      </div>
      <div>
        <Mutation
          mutation={gql`
            mutation SetTranswarpActive($id: ID!, $active: Boolean!) {
              setTranswarpActive(id: $id, active: $active)
            }
          `}
          variables={{ id, active: !active }}
        >
          {action => (
            <OutputField alert={active} onDoubleClick={action}>
              {active ? "Active" : "Deactivated"}
            </OutputField>
          )}
        </Mutation>
      </div>
      <div style={{ display: "flex" }}>
        <Mutation
          mutation={gql`
            mutation Flux($id: ID!) {
              fluxTranswarp(id: $id)
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
              normalTranswarp(id: $id)
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

const TranswarpData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { transwarp } = data;
      if (loading || !transwarp) return null;
      if (!transwarp[0]) return <div>No Transwarp</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  transwarp: subscriptionData.data.transwarpUpdate
                });
              }
            })
          }
        >
          <TranswarpCore {...props} {...transwarp[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TranswarpData;
