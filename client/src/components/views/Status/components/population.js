import React from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag.macro";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

const POP_SUB = gql`
  subscription Population($simulatorId: ID) {
    crewCountUpdate(simulatorId: $simulatorId, killed: false)
  }
`;

const SIM_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;
const POP_QUERY = gql`
  query Population($simulatorId: ID!) {
    crewCount(simulatorId: $simulatorId, killed: false)
    simulators(id: $simulatorId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;

const Population = ({ simulator }) => {
  const { loading, data, subscribeToMore } = useQuery(POP_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, SIM_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  useSubscribeToMore(subscribeToMore, POP_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      crewCount: subscriptionData.data.crewCountUpdate
    })
  });
  const { simulators, crewCount = 0 } = data;
  if (loading || !simulators) return null;
  const { ship } = simulators[0];

  if (!ship) return null;
  return (
    <div>
      <Label>Crew Population</Label>
      <div className="status-field">
        {crewCount + (ship.bridgeCrew ? ship.bridgeCrew : 0)}
      </div>
    </div>
  );
};

export default Population;
