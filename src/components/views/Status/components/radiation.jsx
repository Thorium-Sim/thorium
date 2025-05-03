import React from "react";
import {Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import Dot from "./dots";
import {useQuery} from "@apollo/client";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";

export const STATUS_RADIATION_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

export const STATUS_RADIATION_QUERY = gql`
  query Ship($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

const Radiation = ({simulator}) => {
  const {loading, data, subscribeToMore} = useQuery(STATUS_RADIATION_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const config = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        simulators: subscriptionData.data.simulatorsUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, STATUS_RADIATION_SUB, config);
  if (loading || !data) return null;
  const {simulators} = data;
  const {radiation} = simulators[0].ship;

  return (
    <div>
      <Label>Radiation</Label>
      <Dot level={radiation} />
    </div>
  );
};

export default Radiation;
