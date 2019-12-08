import React from "react";
import gql from "graphql-tag.macro";
import {useMidi} from "helpers/midi";
import {useMutation} from "react-apollo";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {
  STATUS_RADIATION_QUERY,
  STATUS_RADIATION_SUB,
} from "components/views/Status/components/radiation";
const EXECUTE_MACRO = gql`
  mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
    triggerMacros(simulatorId: $simulatorId, macros: $macros)
  }
`;

const Button = ({
  simulatorId,
  deviceName,
  actionMode,
  config,
  channel,
  messageType,
  keyVal,
  controllerNumber,
}) => {
  const {addSubscriber} = useMidi();
  const [executeMacros] = useMutation(EXECUTE_MACRO);

  React.useEffect(() => {
    const address = {
      name: deviceName,
      channel: channel ?? undefined,
      messageType: messageType ?? undefined,
      key: keyVal ?? undefined,
      controllerNumber: controllerNumber ?? undefined,
    };
    return addSubscriber(address, event => {
      // Buttons are identified with the 'noteon' message type
      if (event.value === 1 && config.macros.length > 0) {
        executeMacros({
          variables: {
            simulatorId,
            macros: config.macros.map(({id, args, ...macro}) => ({
              ...macro,
              args: JSON.stringify(args),
            })),
          },
        });
      } else if (
        event.value === 0 &&
        actionMode === "momentaryMacro" &&
        config.upMacros.length > 0
      ) {
        executeMacros({
          variables: {
            simulatorId,
            macros: config.upMacros.map(({id, args, ...macro}) => ({
              ...macro,
              args: JSON.stringify(args),
            })),
          },
        });
      }
    });
  }, [
    config,
    actionMode,
    addSubscriber,
    channel,
    controllerNumber,
    deviceName,
    keyVal,
    messageType,
    executeMacros,
    simulatorId,
  ]);
  return null;
};

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
    }, 200);
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

const LiveDataComponents = {
  Radiation,
};

const Slider = ({simulatorId, componentName, deviceName, channel}) => {
  const [value, setValue] = React.useState(0);
  const Comp = LiveDataComponents[componentName];

  const {addSubscriber} = useMidi();
  React.useEffect(() => {
    return addSubscriber(
      {name: deviceName, channel, messageType: "pitchbendchange"},
      ({value: val}) => {
        setValue(val);
      },
    );
  }, [addSubscriber, channel, deviceName, setValue]);
  if (!Comp) return null;
  return <Comp simulatorId={simulatorId} value={value} setValue={() => {}} />;
};

const Rotor = ({
  simulatorId,
  componentName,
  deviceName,
  channel,
  controllerNumber,
}) => {
  const [value, setValue] = React.useState(0);
  const {addSubscriber, sendOutput} = useMidi();
  const Comp = LiveDataComponents[componentName];
  React.useEffect(() => {
    return addSubscriber(
      {
        name: deviceName,
        channel,
        messageType: "controlchange",
        controllerNumber,
      },
      ({value: val}) => {
        setValue(
          v =>
            Math.round(
              Math.min(1, Math.max(0, v + (val > 64 ? 64 - val : val) / 100)) *
                100,
            ) / 100,
        );
      },
    );
  }, [addSubscriber, channel, setValue, deviceName, controllerNumber]);

  React.useEffect(() => {
    let offset = 0;
    let mult = 11;
    sendOutput({
      name: deviceName,
      messageType: "controlchange",
      controllerNumber: controllerNumber + 32,
      value: Math.round(value * mult + offset),
    });
  }, [value, sendOutput, deviceName, controllerNumber]);
  if (!Comp) return null;
  return <Comp simulatorId={simulatorId} value={value} setValue={setValue} />;
};

const XTouchMini = ({
  simulatorId,
  deviceName,
  actionMode,
  config,
  channel,
  messageType,
  keyVal,
  controllerNumber,
}) => {
  if (
    (actionMode === "macro" || actionMode === "momentaryMacro") &&
    messageType === "noteon"
  ) {
    return (
      <Button
        simulatorId={simulatorId}
        deviceName={deviceName}
        actionMode={actionMode}
        config={config}
        channel={channel}
        messageType={messageType}
        keyVal={keyVal}
        controllerNumber={controllerNumber}
      />
    );
  }
  if (
    actionMode === "valueAssignment" &&
    config.valueAssignmentComponent &&
    messageType === "pitchbendchange"
  ) {
    return (
      <Slider
        simulatorId={simulatorId}
        componentName={config.valueAssignmentComponent}
        deviceName={deviceName}
        channel={channel}
        messageType={messageType}
        keyVal={keyVal}
        controllerNumber={controllerNumber}
      />
    );
  }
  if (
    actionMode === "valueAssignment" &&
    config.valueAssignmentComponent &&
    messageType === "controlchange"
  ) {
    return (
      <Rotor
        simulatorId={simulatorId}
        componentName={config.valueAssignmentComponent}
        deviceName={deviceName}
        channel={channel}
        messageType={messageType}
        keyVal={keyVal}
        controllerNumber={controllerNumber}
      />
    );
  }
  return null;
};

export default XTouchMini;
