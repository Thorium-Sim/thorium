import React from "react";
import {Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import Dot from "./dots";
import {useQuery} from "@apollo/client";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";

export const STATUS_HELIUM_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        helium
        showHelium
      }
    }
  }
`;

export const STATUS_HELIUM_QUERY = gql`
  query Ship($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        helium
        showHelium
      }
    }
  }
`;

const Helium = ({simulator}) => {
  const {loading, data, subscribeToMore} = useQuery(STATUS_HELIUM_QUERY, {
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
  useSubscribeToMore(subscribeToMore, STATUS_HELIUM_SUB, config);
  if (loading || !data) return null;
  const {simulators} = data;
  const {helium, showHelium} = simulators[0].ship;

  if (!showHelium) return null;
  return (
    <div>
      <Label>Helium</Label>
      <Dot level={helium} color="#0088ff" />
    </div>
  );
};

export default Helium;
