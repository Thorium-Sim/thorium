import React from "react";
import uuid from "uuid";

const sounds: {[id: string]: Sound} = {};
let audioContext: AudioContext | undefined = undefined;

declare global {
  interface Window {
    webkitAudioContext: AudioContext;
  }
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
if (AudioContext) audioContext = new AudioContext();

let resumed = false;

document.body.onmousemove = () => {
  if (!resumed) {
    audioContext?.resume();
    resumed = true;
  }
};
function copyToChannel(
  destination: AudioBuffer,
  source: Float32Array,
  channelNumber: number,
) {
  try {
    const nowBuffering = destination.getChannelData(channelNumber);
    for (let i = 0; i < source.length; i++) {
      nowBuffering[i] += source[i];
    }
  } catch (error) {
    console.error(error);
  }
  return destination;
}

function downMixBuffer(buffer: AudioBuffer, channel: number[] | number[][]) {
  if (!audioContext) return buffer;
  let buff: AudioBuffer;
  if (buffer.numberOfChannels === 1) {
    buff = audioContext.createBuffer(
      audioContext.destination.channelCount,
      buffer.duration * audioContext.sampleRate,
      audioContext.sampleRate,
    );
    for (let c = 0; c < channel.length; c++) {
      const channelObj = channel[c];
      if (Array.isArray(channelObj)) {
        //If there is an array within the channel array, then it is
        //assumed that the values of the array correspond to LR channels
        buff = copyToChannel(buff, buffer.getChannelData(0), channelObj[0]);
        buff = copyToChannel(buff, buffer.getChannelData(0), channelObj[1]);
      } else {
        buff = copyToChannel(buff, buffer.getChannelData(0), channelObj);
      }
    }
  } else {
    //Do some downmixing to stereo
    buff = audioContext.createBuffer(
      audioContext.destination.channelCount,
      buffer.duration * audioContext.sampleRate,
      audioContext.sampleRate,
    );

    for (let c = 0; c < channel.length; c++) {
      const channelObj = channel[c];
      if (Array.isArray(channelObj)) {
        //If there is an array within the channel array, then it is
        //assumed that the values of the array correspond to LR channels
        // We're not going to do anything fancy with multi-channels
        buff = copyToChannel(buff, buffer.getChannelData(0), channelObj[0]);
        buff = copyToChannel(buff, buffer.getChannelData(1), channelObj[1]);
      } else {
        //Combine the two buffer channels into one.
        for (let i = 0; i < buffer.numberOfChannels; i++) {
          buff = copyToChannel(buff, buffer.getChannelData(i), channelObj);
        }
      }
    }
  }
  return buff;
}

interface Sound {
  asset?: string;
  url?: string;
  id?: string;
  muted?: boolean;
  volume?: number;
  paused?: boolean;
  looping?: boolean;
  playbackRate?: number;
  ambiance?: boolean;
  channel?: number | number[];
  source?: AudioBufferSourceNode;
  gain?: GainNode;
  preserveChannels?: boolean;
  onFinishedPlaying?: () => void;
}
export function playSound(opts: Sound) {
  if (!opts.asset && !opts.url) return;
  if (opts.id) {
    removeSound(opts.id, true);
  }
  opts.id = opts.id || uuid.v4();
  const volume = opts.muted ? 0 : opts.volume || 1;
  const playbackRate = opts.paused ? 0 : opts.playbackRate || 1;
  const channel = opts.channel
    ? Array.isArray(opts.channel)
      ? opts.channel
      : [opts.channel]
    : [0, 1];
  const asset = opts.url || `/assets${opts.asset}`;
  if (!asset || asset === "/assetsundefined") return;
  try {
    fetch(asset)
      .then(res => {
        if (!res.ok) return;
        return res.arrayBuffer();
      })
      .then(arrayBuffer => {
        if (!audioContext) return;
        if (!arrayBuffer) return;
        audioContext.destination.channelCount =
          audioContext.destination.maxChannelCount;
        // Connect the sound source to the volume control.
        // Create a buffer from the response ArrayBuffer.
        audioContext.decodeAudioData(
          arrayBuffer,
          buffer => {
            if (!audioContext) return;

            const sound = {...opts};
            //Create a new buffer and set it to the specified channel.
            sound.source = audioContext.createBufferSource();
            if (sound.preserveChannels) {
              sound.source.buffer = buffer;
            } else {
              sound.source.buffer = downMixBuffer(buffer, channel);
            }
            console.log(channel, sound.source.buffer, buffer);
            sound.source.loop = opts.looping || false;
            sound.source.playbackRate.setValueAtTime(playbackRate, 0);
            sound.gain = audioContext.createGain();
            // Use an x * x curve, since linear isn't super great with volume.
            sound.gain.gain.setValueAtTime(volume * volume, 0);
            sound.source.connect(sound.gain);

            sound.source.onended = () => {
              opts.id && removeSound(opts?.id);
              opts.onFinishedPlaying && opts.onFinishedPlaying();
            };
            sound.gain.connect(audioContext.destination);
            sound.source.start();
            sounds[opts.id || ""] = sound;
          },
          function onFailure() {
            // console.error(new Error("Decoding the audio buffer failed"));
          },
        );
      })
      .catch(err => {
        console.error("There was an error");
      });
  } catch (err) {
    console.error("There was an error");
  }
}

function removeSound(id: string, force?: boolean, ambiance?: boolean) {
  const sound = sounds[id];
  if (sound?.source) {
    if (sound.ambiance && !ambiance) return;
    if (!sound.looping || force) {
      sound.source.stop();
      delete sounds[id];
    } else {
      // sound.looping = false;
      sound.source.loop = false;
      sound.source.onended = () => removeSound(id, true);
    }
  }
}

function removeAllSounds(ambiance?: boolean) {
  Object.keys(sounds).forEach(key => {
    removeSound(key, true, ambiance);
  });
}

function stopLooping(ambiance?: boolean) {
  Object.keys(sounds).forEach(id => {
    const sound = sounds[id];
    if (sound?.source) {
      if (sound.ambiance && !ambiance) return;
      // sound.looping = false;
      sound.source.loop = false;
      sound.source.onended = () => removeSound(id, true);
    }
  });
}
export const useSounds = () => {
  return React.useMemo(
    () => ({
      playSound,
      removeSound,
      removeAllSounds,
      stopLooping,
      sounds,
    }),
    [],
  );
};
const withSound = (Comp: React.ElementType) => {
  return (props: any) => (
    <Comp
      {...props}
      playSound={playSound}
      removeSound={removeSound}
      removeAllSounds={removeAllSounds}
      stopLooping={stopLooping}
      sounds={sounds}
    />
  );
};

export default withSound;
