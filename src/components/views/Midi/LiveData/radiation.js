import React from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {
  STATUS_RADIATION_QUERY,
  STATUS_RADIATION_SUB,
} from "components/views/Status/components/radiation";

const UPDATE_RADIATION = gql`
  mutation SetRadiation($simulatorId: ID!, $radiation: Float!) {
    changeSimulatorRadiation(simulatorId: $simulatorId, radiation: $radiation)
  }
`;
const Radiation = ({simulatorId, value, setValue}) => {
  const radiationSet = React.useRef(false);
  const {data} = useQueryAndSubscription(
    {query: STATUS_RADIATION_QUERY, variables: {simulatorId}},
    {query: STATUS_RADIATION_SUB, variables: {simulatorId}},
  );
  const radiation = data?.simulators?.[0].ship.radiation || 0;
  const [updateRadiation] = useMutation(UPDATE_RADIATION, {
    variables: {simulatorId, radiation: value},
  });
  // Update the parent component
  React.useEffect(() => {
    radiationSet.current = true;
    setTimeout(() => {
      radiationSet.current = false;
    }, 1000 / 10);
    setValue(radiation);
  }, [radiation, setValue]);

  // Send updates when the value changes.
  React.useEffect(() => {
    if (value !== radiation && radiationSet.current === false) {
      updateRadiation();
    }
  }, [radiation, updateRadiation, value]);
  return null;
};

Radiation.actionModes = ["valueAssignment"];

export default Radiation;
