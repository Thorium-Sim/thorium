import React from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {LIGHTING_QUERY, LIGHTING_SUB} from "components/views/Lighting";

const UPDATE_LIGHTING = gql`
  mutation UpdateLighting($id: ID!, $intensity: Float!) {
    updateSimulatorLighting(id: $id, lighting: {intensity: $intensity})
  }
`;

const LightingIntensity = ({simulatorId, value, setValue}) => {
  const valueSet = React.useRef(false);
  const {data} = useQueryAndSubscription(
    {query: LIGHTING_QUERY, variables: {simulatorId}},
    {query: LIGHTING_SUB, variables: {simulatorId}},
  );
  const intensity = data?.simulators?.[0].lighting.intensity;

  const [updateLighting] = useMutation(UPDATE_LIGHTING, {
    variables: {id: simulatorId, radiation: value},
  });

  // Update the parent component
  React.useEffect(() => {
    valueSet.current = true;
    setTimeout(() => {
      valueSet.current = false;
    }, 200);
    setValue(intensity);
  }, [intensity, setValue]);

  // Send updates when the value changes.
  React.useEffect(() => {
    if (value !== intensity && valueSet.current === false) {
      updateLighting();
    }
  }, [intensity, updateLighting, value]);
  return null;
};

LightingIntensity.actionModes = ["valueAssignment"];

export default LightingIntensity;
