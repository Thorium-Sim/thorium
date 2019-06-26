import React from "react";
import { FormGroup, Label, Input, Button } from "helpers/reactstrap";
import SoundPicker from "helpers/soundPicker";
import playSoundHOC from "components/generic/SoundPlayer";

function playSound({ updateArgs, args, stations, clients, playSound }) {
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
          {stations && stations.length > 0 && (
            <optgroup label="Stations">
              {stations.map(c => (
                <option value={c.name} key={c.name}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          )}
          {clients && clients.length > 0 && (
            <optgroup label="Clients">
              {clients.map(c => (
                <option value={c.id} key={c.id}>
                  {c.id}
                </option>
              ))}
            </optgroup>
          )}
        </Input>

        <Label>Volume</Label>
        <div style={{ display: "flex" }}>
          <Input
            style={{ flex: 1 }}
            type="range"
            min={0}
            step={0.01}
            max={1}
            value={sound.volume || sound.volume === 0 ? sound.volume : 1}
            onChange={e => updateSound("volume", e.target.value)}
          />
          <span>{sound.volume || sound.volume === 0 ? sound.volume : 1}</span>
        </div>

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
        <div>
          <Button
            color="info"
            size="sm"
            onClick={() => {
              playSound(sound);
            }}
          >
            Test Sound
          </Button>
        </div>
      </FormGroup>
    </div>
  );
}

export default playSoundHOC(playSound);
