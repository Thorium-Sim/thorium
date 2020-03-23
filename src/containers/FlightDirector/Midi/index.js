import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import "./style.scss";
import {useMutation} from "react-apollo";
import styled from "styled-components";

import BCF from "./boardLayouts/bcf2000";
import XTouchMini from "./boardLayouts/xtouchmini";
import {MidiProvider} from "helpers/midi";
import BoardConfig from "./config";

const boards = {
  "BCF2000 Port 1": BCF,
  "X-TOUCH MINI": XTouchMini,
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

const QUERY = gql`
  query MidiSets {
    midiSets {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const SUBSCRIPTION = gql`
  subscription MidiSetsSub {
    midiSets {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const ADD_MIDI_SET = gql`
  mutation AddMidiSet($name: String!, $deviceName: String!) {
    midiSetCreate(name: $name, deviceName: $deviceName) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;
const REMOVE_MIDI_SET = gql`
  mutation RemoveMidiSet($id: ID!) {
    midiSetRemove(id: $id)
  }
`;
const RENAME_MIDI_SET = gql`
  mutation RenameMidiSet($id: ID!, $name: String!) {
    midiSetRename(id: $id, name: $name) {
      ...MidiSetData
    }
  }
  ${midiFragment}
`;

const BoardWrapper = styled.div`
  #${({selected}) => selected || "nothing"} {
    fill: goldenrod;
    stroke: darkorange;
  }
`;

const devices = {
  "BCF2000 Port 1": "BCF2000",
  "X-TOUCH MINI": "X-Touch Mini",
};

const Midi = () => {
  const {data, loading} = useQueryAndSubscription(
    {query: QUERY},
    {query: SUBSCRIPTION},
  );
  const [selectedMidiSet, setSelectedMidiSet] = React.useState(null);
  const [selectedComponent, setSelectedComponent] = React.useState(null);

  const [addMidiSet] = useMutation(ADD_MIDI_SET);
  const [removeMidiSet] = useMutation(REMOVE_MIDI_SET, {
    variables: {id: selectedMidiSet},
  });
  const [renameMidiSet] = useMutation(RENAME_MIDI_SET);
  if (loading || !data) return <p>Loading...</p>;
  const {midiSets} = data;

  const midiSet = midiSets.find(r => r.id === selectedMidiSet);
  const BoardComponent = boards[midiSet?.deviceName];

  return (
    <MidiProvider>
      <Container className="midi-container" fluid>
        <h3>MIDI Sets</h3>
        <div className="midi-row">
          <div className="midi-list">
            <ListGroup>
              {midiSets.map(r => (
                <ListGroupItem
                  key={r.id}
                  active={r.id === selectedMidiSet}
                  onClick={() => {
                    setSelectedMidiSet(r.id);
                    setSelectedComponent(null);
                  }}
                >
                  <div>{r.name}</div>
                  <small>{devices[r.deviceName]}</small>
                </ListGroupItem>
              ))}
            </ListGroup>
            <select
              className="btn btn-primary btn-block btn-lg"
              value="select"
              onChange={e => {
                const name = window.prompt(
                  "What is the name of the new MIDI Set?",
                );
                if (!name) return;
                const deviceName = e.target.value;
                addMidiSet({variables: {name, deviceName}}).then(res =>
                  setSelectedMidiSet(res.data.midiSetCreate.id),
                );
              }}
            >
              <option value="select" disabled>
                Add MIDI Set
              </option>
              {Object.entries(devices).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {selectedMidiSet && (
              <>
                <Button
                  color="danger"
                  size="sm"
                  block
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this MIDI set?",
                      )
                    ) {
                      removeMidiSet();
                      setSelectedMidiSet(null);
                      setSelectedComponent(null);
                    }
                  }}
                >
                  Remove MIDI Set
                </Button>
                <Button
                  color="warning"
                  size="sm"
                  block
                  onClick={() => {
                    const name = window.prompt(
                      "What is the new name of the MIDI set?",
                      midiSet.name,
                    );
                    if (!name) return;
                    renameMidiSet({
                      variables: {id: selectedMidiSet, name},
                    });
                  }}
                >
                  Rename MIDI Set
                </Button>
              </>
            )}
            <small>
              Don't see a MIDI board model here that you want? File a bug report
              to get in touch.
            </small>
          </div>
          <div className="midi-board">
            {midiSet && (
              <BoardWrapper selected={selectedComponent?.id}>
                <BoardComponent
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              </BoardWrapper>
            )}
          </div>
          <BoardConfig
            selectedComponent={selectedComponent}
            midiSet={midiSet}
          />
        </div>
      </Container>
    </MidiProvider>
  );
};

export default Midi;
