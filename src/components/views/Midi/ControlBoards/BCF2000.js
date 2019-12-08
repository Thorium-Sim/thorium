import React from "react";
import gql from "graphql-tag.macro";
import {useMidi} from "helpers/midi";
import {useMutation} from "react-apollo";
import {bcf2000Controls} from "containers/FlightDirector/Midi/boardLayouts/bcf2000";
const EXECUTE_MACRO = gql`
  mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
    triggerMacros(simulatorId: $simulatorId, macros: $macros)
  }
`;

const BCF2000 = ({
  simulatorId,
  deviceName,
  actionMode,
  config,
  channel,
  messageType,
  keyVal: key,
  controllerNumber,
}) => {
  const {addSubscriber} = useMidi();
  const [executeMacros] = useMutation(EXECUTE_MACRO);

  React.useEffect(() => {
    const address = {
      name: deviceName,
      channel: channel ?? undefined,
      messageType: messageType ?? undefined,
      key: key ?? undefined,
      controllerNumber: controllerNumber ?? undefined,
    };
    const [controlId] = Object.entries(bcf2000Controls).find(
      ([prop, value]) => {
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
      },
    );
    return addSubscriber(address, event => {
      if (actionMode === "macro" || actionMode === "momentaryMacro") {
        // Buttons are identified by the control mapping
        if (controlId.includes("button")) {
          console.log(event);
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
        }
      }
    });
  }, [
    config,
    actionMode,
    addSubscriber,
    channel,
    controllerNumber,
    deviceName,
    key,
    messageType,
    executeMacros,
    simulatorId,
  ]);
  return null;
};

export default BCF2000;
