import React from "react";
import { FormGroup, Label, Input, Button, Popover, PopoverHeader, PopoverBody } from "helpers/reactstrap";
import SoundPicker from "helpers/soundPicker";
import playSoundHOC from "components/generic/SoundPlayer";

function PlaySound({ updateArgs, args, stations, clients, playSound }) {
  let [showChannelPopover, setShowChannelPopover] = React.useState(false);
  let [showOverridesPopover, setShowOverridesPopover] = React.useState(false);
  const toggleChannelPopover = () => setShowChannelPopover(!showChannelPopover);
  const toggleOverridesPopover = () => setShowOverridesPopover(!showOverridesPopover);

  const sound = args.sound || {};
  const updateSound = (which, val) => {
    updateArgs("sound", { ...sound, [which]: val });
  };
  React.useEffect(() => {
    if (!args.station) {
      updateArgs("station", "Sound");
    }
  }, [args, updateArgs]);
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
        <div style={{ display: "flex", gap: '1rem', padding: '20px', alignItems: 'center' }}>
          <Label style={{ marginBottom: '0px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              Preserve Surround Channels <small>Advanced</small>
              <div>
                <Button id="preserve-surround-channels" onClick={toggleChannelPopover} size="sm" color={'link'}>
                  <small>Help</small>
                </Button>
                <Popover placement={'right'} isOpen={showChannelPopover} target={'preserve-surround-channels'} toggle={toggleChannelPopover}>
                  <PopoverHeader>Preserve Surround Channels</PopoverHeader>
                  <PopoverBody>
                    With this option selected, the audio files will play all channels that they have been built with.
                    This allows you to use audio files coded for 5.1 and beyond to be played through the sound player. This is the default functionality of the sound player.
                    <div style={{ marginTop: '0.75rem' }}>
                      <i>
                        Note: If this is not selected, Thorium will mix your audio file into a stereo format by using the data from the first 2 channels in your file.
                        If you are using 5.1 or above files, audio information will be lost.
                      </i>
                    </div>
                  </PopoverBody>
                </Popover>
              </div>
            </div>
          </Label>
          <Input
            style={{ marginBottom: '4px' }}
            type="checkbox"
            checked={sound.preserveChannels}
            onChange={e => updateSound("preserveChannels", e.target.checked)}
          />
        </div>
        <Label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            Channel Mapping Overrides <small>Advanced</small>
            <div>
              <Button id="channel-mapping-overrides" onClick={toggleOverridesPopover} size="sm" color={'link'}>
                <small>Help</small>
              </Button>
              <Popover placement={'right'} isOpen={showOverridesPopover} target={'channel-mapping-overrides'} toggle={toggleOverridesPopover}>
                <PopoverHeader>Channel Mapping Overrides</PopoverHeader>
                <PopoverBody>
                  If you choose not to preserve the surround channels, you can use this option to fix to the stereo format, and then map the audio channels to different speakers in your sim.
                  This can be useful if you have a sound that you want to play through a specific speaker, but the audio file is not coded for that speaker.
                  Example: If you have a different room for an engineering bay, and you want to play a sound just to that area. You can use this field to specify it.
                </PopoverBody>
              </Popover>
            </div>
          </div>

        </Label>
        <Input
          type="text"
          disabled={sound.preserveChannels}
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

export default playSoundHOC(PlaySound);
