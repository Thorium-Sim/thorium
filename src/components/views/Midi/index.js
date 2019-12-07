import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import "./style.scss";
import {MidiProvider, useMidi} from "helpers/midi";
import {useMutation} from "react-apollo";
import {bcf2000Controls} from "containers/FlightDirector/Midi/boardLayouts/bcf2000";
const EXECUTE_MACRO = gql`
  mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
    triggerMacros(simulatorId: $simulatorId, macros: $macros)
  }
`;
const XTouchMini = ({
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
    return addSubscriber(address, event => {
      if (actionMode === "macro" || actionMode === "momentaryMacro") {
        // Buttons are identified with the 'noteon' message type
        if (messageType === "noteon") {
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

const deviceComponents = {
  "X-TOUCH MINI": XTouchMini,
  "BCF2000 Port 1": BCF2000,
};
const midiFragment = gql`
  fragment MidiSetData on MidiSet {
    id
    name
    deviceName
    controls {
      id
      channel
      messageType
      key
      controllerNumber
      channelModeMessage
      actionMode
      config
    }
  }
`;
const MIDI_QUERY = gql`
  query MidiSets($simulatorId: ID!) {
    midiSets(simulatorId: $simulatorId) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const MIDI_SUBSCRIPTION = gql`
  subscription MidiSetsSub($simulatorId: ID!) {
    midiSets(simulatorId: $simulatorId) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const MidiControl = ({deviceName, ...rest}) => {
  const Comp = deviceComponents[deviceName];
  return <Comp {...rest} deviceName={deviceName} />;
};

const MidiSet = ({name, deviceName, controls, simulatorId}) => {
  return (
    <>
      {controls.map(c => (
        <MidiControl
          key={c.id}
          deviceName={deviceName}
          {...c}
          keyVal={c.key}
          simulatorId={simulatorId}
        />
      ))}
      <li>{name}</li>
    </>
  );
};

const MidiCore = props => {
  const {simulator} = props;
  const {loading, data} = useQueryAndSubscription(
    {query: MIDI_QUERY, variables: {simulatorId: simulator.id}},
    {query: MIDI_SUBSCRIPTION, variables: {simulatorId: simulator.id}},
  );

  if (loading || !data) return null;
  const {midiSets} = data;

  return (
    <MidiProvider>
      <div className="core-midi">
        Active MIDI Sets:
        <ul>
          {midiSets.map(m => (
            <MidiSet key={m.id} {...m} simulatorId={simulator.id} />
          ))}
        </ul>
        {/* <AlertConditionSlider simulator={props.simulator} />
        <AlertConditionButton
          simulator={props.simulator}
          level={"1"}
          controllerNumber={73}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"2"}
          controllerNumber={74}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"3"}
          controllerNumber={75}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"4"}
          controllerNumber={76}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"5"}
          controllerNumber={77}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"p"}
          controllerNumber={78}
        /> */}
      </div>
    </MidiProvider>
  );
};
export default MidiCore;
