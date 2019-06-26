import React from "react";
import { Label } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import Dot from "./dots";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

const SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

const QUERY = gql`
  query Ship($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

const Radiation = ({ simulator }) => {
  const { loading, data, subscribeToMore } = useQuery(QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  const { simulators } = data;
  if (loading || !simulators) return null;
  const { radiation } = simulators[0].ship;

  return (
    <div>
      <Label>Radiation</Label>
      <Dot level={radiation} />
    </div>
  );
};

export default Radiation;
