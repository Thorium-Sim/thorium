import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import SoundPicker from "helpers/soundPicker";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default ({ updateArgs, args }) => {
  const sound = args.sound || {};
  const updateSound = (which, val) => {
    updateArgs("sound", { ...sound, [which]: val });
  };
  if (!args.station) {
    updateArgs("station", "Sound");
  }
  return (
    <div>
      <FormGroup className="macro-PlaySound">
        <Label>Sound type</Label>
        <Input
          type="select"
          value={args.type}
          onChange={e => updateArgs("type", e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="random">Random From Folder</option>
        </Input>
        <Label>Sound</Label>
        <SoundPicker
          pickFolder={args.type === "random"}
          selectedSound={sound.asset || "nothing"}
          setSound={sound => updateSound("asset", sound)}
        />

        <Label>Sound Player</Label>
        <Input
          type="select"
          value={args.station}
          onChange={e => updateArgs("station", e.target.value)}
        >
          <optgroup label="Generic Players">
            <option value="Sound">Sound Player</option>
            <option value="all">All Stations</option>
            <option value="random">Random Station</option>
            <option value="ECS">ECS</option>
          </optgroup>
          <Query
            query={gql`
              query Clients {
                clients(all: true) {
                  id
                }
              }
            `}
          >
            {({ loading, data: { clients } }) =>
              loading ? null : (
                <optgroup label="Clients">
                  {clients.map(
                    c =>
                      console.log(c) || (
                        <option value={c.id} key={c.id}>
                          {c.id}
                        </option>
                      )
                  )}
                </optgroup>
              )
            }
          </Query>
        </Input>
        <Label>Volume</Label>
        <Input
          type="range"
          min={0}
          step={0.01}
          max={1}
          value={sound.volume}
          onChange={e => updateSound("volume", e.target.value)}
        />
        <Label>Playback Rate</Label>
        <Input
          type="number"
          min={0.1}
          step={0.01}
          max={4}
          value={sound.playbackRate}
          onChange={e => updateSound("playbackRate", e.target.value)}
        />
        <Label>
          Channels <small>Advanced</small>
        </Label>
        <Input
          type="text"
          placeholder="0,1"
          value={sound.channel}
          onChange={e => updateSound("channel", e.target.value.split(","))}
        />
        <Label>Looping</Label>
        <Input
          type="checkbox"
          checked={sound.looping}
          onChange={e => updateSound("looping", e.target.checked)}
        />
      </FormGroup>
    </div>
  );
};
