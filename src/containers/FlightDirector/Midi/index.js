import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import "./style.scss";
import {useMutation} from "react-apollo";
import {stardate} from "components/views/OfficerLog";

const fragment = gql`
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
      component
      variables
    }
  }
`;

const QUERY = gql`
  query MidiSets {
    midiSets {
      ...MidiSetData
    }
  }
  ${fragment}
`;

const SUBSCRIPTION = gql`
  subscription MidiSetsSub {
    midiSets {
      ...MidiSetData
    }
  }
  ${fragment}
`;

const ADD_MIDI_SET = gql`
  mutation AddMidiSet($name: String!, $deviceName: String!) {
    midiSetCreate(name: $name, deviceName: $deviceName) {
      ...MidiSetData
    }
  }
  ${fragment}
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
  ${fragment}
`;

const Midi = () => {
  const {data, loading} = useQueryAndSubscription(
    {query: QUERY},
    {query: SUBSCRIPTION},
  );
  const [selectedMidiSet, setSelectedMidiSet] = React.useState(null);

  const [addMidiSet] = useMutation(ADD_MIDI_SET);
  const [removeMidiSet] = useMutation(REMOVE_MIDI_SET, {
    variables: {id: selectedMidiSet},
  });
  const [renameMidiSet] = useMutation(RENAME_MIDI_SET);
  if (loading || !data) return "Loading...";
  const {midiSets} = data;

  const midiSet = midiSets.find(r => r.id === selectedMidiSet);

  return (
    <Container className="midi-container" fluid>
      <h3>MIDI Sets</h3>
      <div className="midi-row">
        <div className="midi-list">
          <ListGroup>
            {midiSets.map(r => (
              <ListGroupItem
                key={r.id}
                active={r.id === selectedMidiSet}
                onClick={() => setSelectedMidiSet(r.id)}
              >
                {r.name}
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
              addMidiSet({variables: {name, deviceName}});
            }}
          >
            <option value="select" disabled>
              Add MIDI Set
            </option>
            <option value="bcf2000">BCF2000</option>
            <option value="xtouchmini">X-Touch Mini</option>
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
        </div>
        <div className="midi-board"></div>
      </div>
    </Container>
  );
};

export default Midi;
