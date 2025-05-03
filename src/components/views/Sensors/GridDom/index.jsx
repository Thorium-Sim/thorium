import React from "react";
import gql from "graphql-tag.macro";
import Grid from "./grid";
import "./style.scss";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";

const fragment = gql`
  fragment ContactData on SensorContact {
    id
    name
    size
    color
    icon
    picture
    speed
    type
    rotation
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    position {
      x
      y
      z
    }
    startTime
    endTime
    infrared
    cloaked
    destroyed
    forceUpdate
    targeted
    selected
    locked
    disabled
    hostile
  }
`;

export const SENSOR_GRID_QUERY = gql`
  query Contacts($sensorsId: ID) {
    sensorContacts(sensorsId: $sensorsId) {
      ...ContactData
    }
  }
  ${fragment}
`;
export const SENSOR_GRID_SUB = gql`
  subscription SensorContactsChanged($sensorId: ID) {
    sensorContactUpdate(sensorId: $sensorId) {
      ...ContactData
    }
  }
  ${fragment}
`;

const GridData = props => {
  const {sensor} = props;
  const {loading, data} = useQueryAndSubscription(
    {query: SENSOR_GRID_QUERY, variables: {sensorsId: sensor}},
    {query: SENSOR_GRID_SUB, variables: {sensorId: sensor}},
  );

  if (loading || !data) return null;
  const {sensorContacts} = data;
  if (!sensorContacts) return <div>No Contacts</div>;
  return <Grid {...props} contacts={sensorContacts} />;
};

export default GridData;
