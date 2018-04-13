import React from "react";
import { Query } from "react-apollo";
import { FormGroup, Label, Input } from "reactstrap";
import gql from "graphql-tag";

const SOUNDS_QUERY = gql`
  query Sounds {
    assetFolders(name: "Sounds") {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

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
        <Label>Sound</Label>
        <Query query={SOUNDS_QUERY}>
          {({ loading, data: { assetFolders } }) =>
            loading ? (
              <p>Loading</p>
            ) : (
              <Input
                type="select"
                value={sound.asset || "nothing"}
                onChange={e => updateSound("asset", e.target.value)}
              >
                <option value="nothing" disabled>
                  Select a Sound
                </option>
                {assetFolders[0].containers
                  .concat()
                  .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  })
                  .map(c => (
                    <option key={c.id} value={c.fullPath}>
                      {c.name}
                    </option>
                  ))}
              </Input>
            )
          }
        </Query>
        <Label>Sound Player</Label>
        <Input
          type="select"
          value={args.station}
          onChange={e => updateArgs("station", e.target.value)}
        >
          <option value="Sound">Sound Player</option>
          <option value="all">All Stations</option>
          <option value="random">Random Station</option>
          <option value="ECS">ECS</option>
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
          disabled
          checked={sound.looping}
          onChange={e => updateSound("looping", e.target.checked)}
        />
      </FormGroup>
    </div>
  );
};
