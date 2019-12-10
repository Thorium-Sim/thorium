import React from "react";
import gql from "graphql-tag.macro";
import {useMidi} from "helpers/midi";
import {useMutation} from "react-apollo";
import {bcf2000Controls} from "containers/FlightDirector/Midi/boardLayouts/bcf2000";
import LiveDataComponents from "../LiveData";
const EXECUTE_MACRO = gql`
  mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
    triggerMacros(simulatorId: $simulatorId, macros: $macros)
  }
`;

function Rotor({simulatorId, componentName, channel, controllerNumber}) {
  const [value, setValue] = React.useState(0);
  const {addSubscriber, sendOutput} = useMidi();
  const selfTriggeredRef = React.useRef(false);
  const Comp = LiveDataComponents[componentName];

  React.useEffect(() => {
    return addSubscriber(
      {
        name: "BCF2000 Port 1",
        channel,
        messageType: "controlchange",
        controllerNumber,
      },
      ({value: val}) => {
        selfTriggeredRef.current = true;
        setTimeout(() => {
          selfTriggeredRef.current = false;
        }, 500);
        setValue(val / 127);
      },
    );
  }, [addSubscriber, channel, controllerNumber]);

  React.useEffect(() => {
    if (selfTriggeredRef.current) {
      return;
    }
    sendOutput({
      name: "BCF2000 Port 1",
      messageType: "controlchange",
      controllerNumber,
      value: Math.round(value * 127),
    });
  }, [value, controllerNumber, sendOutput]);

  if (!Comp) return null;
  return <Comp simulatorId={simulatorId} value={value} setValue={setValue} />;
}

function Slider({simulatorId, componentName, channel, controllerNumber}) {
  const [value, setValue] = React.useState(0);
  const {addSubscriber, sendOutput} = useMidi();
  const selfTriggeredRef = React.useRef(false);
  const Comp = LiveDataComponents[componentName];

  React.useEffect(() => {
    return addSubscriber(
      {
        name: "BCF2000 Port 1",
        channel,
        messageType: "controlchange",
        controllerNumber,
      },
      ({value: val}) => {
        selfTriggeredRef.current = true;
        setTimeout(() => {
          selfTriggeredRef.current = false;
        }, 500);
        setValue(val / 127);
      },
    );
  }, [addSubscriber, channel, controllerNumber]);

  React.useEffect(() => {
    if (selfTriggeredRef.current) {
      return;
    }
    sendOutput({
      name: "BCF2000 Port 1",
      messageType: "controlchange",
      controllerNumber,
      value: Math.round(value * 127),
    });
  }, [value, controllerNumber, sendOutput]);

  if (!Comp) return null;
  return <Comp simulatorId={simulatorId} value={value} setValue={setValue} />;
}

const Button = ({
  simulatorId,
  channel,
  messageType,
  keyVal: key,
  controllerNumber,
  config,
}) => {
  const {addSubscriber} = useMidi();
  const [executeMacros] = useMutation(EXECUTE_MACRO);

  React.useEffect(() => {
    const address = {
      name: "BCF2000 Port 1",
      channel: channel ?? undefined,
      messageType: messageType ?? undefined,
      key: key ?? undefined,
      controllerNumber: controllerNumber ?? undefined,
    };

    return addSubscriber(address, event => {
      if (config.macros.length > 0) {
        executeMacros({
          variables: {
            simulatorId,
            macros: config.macros.map(({id, args, ...macro}) => ({
              ...macro,
              args: JSON.stringify(args),
            })),
          },
        });
      }
    });
  }, [
    config,
    addSubscriber,
    channel,
    controllerNumber,
    key,
    messageType,
    executeMacros,
    simulatorId,
  ]);
  return null;
};

const BCF2000 = ({
  simulatorId,
  actionMode,
  config,
  channel,
  messageType,
  keyVal: key,
  controllerNumber,
}) => {
  const [controlId] = Object.entries(bcf2000Controls).find(([_prop, value]) => {
    if (Array.isArray(value)) {
      return value.find(
        value =>
          value.channel === channel &&
          value.controllerNumber === controllerNumber &&
          value.messageType === messageType,
      );
    } else {
      return (
        value.channel === channel &&
        value.controllerNumber === controllerNumber &&
        value.messageType === messageType
      );
    }
  });
  // Buttons are identified by the control mapping
  if (
    (actionMode === "macro" || actionMode === "momentaryMacro") &&
    controlId.includes("button")
  ) {
    return (
      <Button
        simulatorId={simulatorId}
        channel={channel}
        messageType={messageType}
        keyVal={key}
        controllerNumber={controllerNumber}
        config={config}
      />
    );
  }
  if (
    actionMode === "valueAssignment" &&
    config.valueAssignmentComponent &&
    messageType === "controlchange" &&
    controlId.includes("slider")
  ) {
    return (
      <Slider
        simulatorId={simulatorId}
        componentName={config.valueAssignmentComponent}
        channel={channel}
        keyVal={key}
        controllerNumber={controllerNumber}
      />
    );
  }
  if (
    actionMode === "valueAssignment" &&
    config.valueAssignmentComponent &&
    messageType === "controlchange" &&
    controlId.includes("rotor")
  ) {
    return (
      <Rotor
        simulatorId={simulatorId}
        componentName={config.valueAssignmentComponent}
        channel={channel}
        keyVal={key}
        controllerNumber={controllerNumber}
      />
    );
  }

  return null;
};

export default BCF2000;
