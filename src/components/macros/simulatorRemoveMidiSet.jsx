import React from "react";
import {FormGroup, Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {useQuery} from "react-apollo";

const MIDI_SETS = gql`
  query MidiSets {
    midiSets {
      id
      name
    }
  }
`;
export default ({updateArgs, args: {midiSet}}) => {
  const {loading, data} = useQuery(MIDI_SETS);
  if (loading) return <p>Loading MIDI Sets...</p>;
  return (
    <FormGroup className="macro-removeMidiSet">
      <Label>MIDI Set </Label>
      <select
        value={midiSet || "nothing"}
        onChange={evt => updateArgs("midiSet", evt.target.value)}
      >
        <option disabled value="nothing">
          Choose a MIDI Set
        </option>
        {data.midiSets.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </FormGroup>
  );
};
