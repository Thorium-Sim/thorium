import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import "./style.scss";
import {MidiProvider} from "helpers/midi";

import XTouchMini from "./ControlBoards/xTouchMini";
import BCF2000 from "./ControlBoards/BCF2000";

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
export const MIDI_QUERY = gql`
  query MidiSets($simulatorId: ID!) {
    midiSets(simulatorId: $simulatorId) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

export const MIDI_SUBSCRIPTION = gql`
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
      </div>
    </MidiProvider>
  );
};
export default MidiCore;
