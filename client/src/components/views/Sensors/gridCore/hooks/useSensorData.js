import gql from "graphql-tag.macro";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

const fragment = gql`
  fragment SensorsData on Sensors {
    id
    type
    autoTarget
    autoThrusters
    interference
    movement {
      x
      y
      z
    }
    segments {
      ring
      line
      state
    }
    armyContacts {
      id
      name
      size
      icon
      picture
      color
      infrared
      cloaked
      destroyed
      locked
      disabled
      hostile
    }
  }
`;
const GRID_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "external") {
      ...SensorsData
    }
  }
  ${fragment}
`;
const SENSOR_SUB = gql`
  subscription SensorsChanged($simulatorId: ID) {
    sensorsUpdate(simulatorId: $simulatorId, domain: "external") {
      ...SensorsData
    }
  }
  ${fragment}
`;

export function useSensorsData(simulatorId) {
  const { loading, data, subscribeToMore } = useQuery(GRID_QUERY, {
    variables: { simulatorId }
  });
  useSubscribeToMore(subscribeToMore, SENSOR_SUB, {
    variables: { simulatorId },
    updateQuery: (previousResult, { subscriptionData }) => {
      return Object.assign({}, previousResult, {
        sensors: subscriptionData.data.sensorsUpdate
      });
    }
  });
  if (loading) return null;
  const sensors = data.sensors[0];
  return sensors;
}
