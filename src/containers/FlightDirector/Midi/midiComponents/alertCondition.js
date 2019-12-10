import React from "react";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import gql from "graphql-tag.macro";
import Slider from "./slider";
import Button from "./button";
import {useMutation} from "react-apollo";

const ALERT_CORE_SUB = gql`
  subscription SimulatorsSub($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      id
      alertlevel
    }
  }
`;

const ALERT_CORE_QUERY = gql`
  query simulators($id: ID) {
    simulators(id: $id) {
      id
      alertlevel
    }
  }
`;

const CHANGE_ALERT_LEVEL = gql`
  mutation AlertLevel($id: ID!, $level: String!) {
    changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $level)
  }
`;

export const AlertConditionSlider = ({simulator}) => {
  const {loading, data} = useQueryAndSubscription(
    {query: ALERT_CORE_QUERY, variables: {id: simulator.id}},
    {query: ALERT_CORE_SUB, variables: {id: simulator.id}},
  );
  const [changeAlertLevel] = useMutation(CHANGE_ALERT_LEVEL);
  const alertLevel = parseInt(loading ? 5 : data.simulators[0].alertlevel, 10);

  function updateAlertLevel(value) {
    const aVal = Math.max(1, Math.round((value / 127) * 5));
    if (aVal !== alertLevel) {
      changeAlertLevel({variables: {id: simulator.id, level: String(aVal)}});
    }
  }
  return (
    <Slider
      controllerNumber={81}
      setValue={updateAlertLevel}
      value={(alertLevel / 5) * 127}
    />
  );
};

export const AlertConditionButton = ({simulator, controllerNumber, level}) => {
  const {loading, data} = useQueryAndSubscription(
    {query: ALERT_CORE_QUERY, variables: {id: simulator.id}},
    {query: ALERT_CORE_SUB, variables: {id: simulator.id}},
  );
  const [changeAlertLevel] = useMutation(CHANGE_ALERT_LEVEL);
  const alertLevel = loading ? "5" : data.simulators[0].alertlevel;

  function updateAlertLevel(value) {
    if (value > 0) {
      changeAlertLevel({variables: {id: simulator.id, level}});
    }
  }

  return (
    <Button
      controllerNumber={controllerNumber}
      setValue={updateAlertLevel}
      value={alertLevel === level ? 127 : 0}
    ></Button>
  );
};
