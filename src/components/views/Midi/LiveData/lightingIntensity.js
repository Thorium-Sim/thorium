import React from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "react-apollo";
import {useLightingControlSubscription} from "generated/graphql";

const UPDATE_LIGHTING = gql`
  mutation UpdateLighting($id: ID!, $intensity: Float!) {
    lightingSetIntensity(simulatorId: $id, intensity: $intensity)
  }
`;

const LightingIntensity = ({simulatorId, value, setValue}) => {
  const valueSet = React.useRef(false);
  const {data} = useLightingControlSubscription({variables: {simulatorId}});
  const intensity = data?.simulators?.[0].lighting.intensity;

  const [updateLighting] = useMutation(UPDATE_LIGHTING, {
    variables: {id: simulatorId, intensity: value},
  });

  // Update the parent component
  React.useEffect(() => {
    valueSet.current = true;
    setTimeout(() => {
      valueSet.current = false;
    }, 1000 / 10);
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
