import React from "react";
import uuid from "uuid";

const sounds = {};

if (!window.audioContext) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (AudioContext) window.audioContext = new AudioContext();
}

function copyToChannel(destination, source, channelNumber) {
  try {
    const nowBuffering = destination.getChannelData(channelNumber);
    for (let i = 0; i < source.length; i++) {
      nowBuffering[i] = source[i];
    }
  } catch (error) {
    console.error(error);
  }
  return destination;
}

function downMixBuffer(buffer, channel) {
  let buff;
  if (buffer.numberOfChannels === 1) {
    buff = window.audioContext.createBuffer(
      window.audioContext.destination.channelCount,
      buffer.duration * window.audioContext.sampleRate,
      window.audioContext.sampleRate
    );
    for (let c = 0; c < channel.length; c++) {
      if (typeof channel[c] === "object") {
        //If there is an array within the channel array, then it is
        //assumed that the values of the array correspond to LR channels
        buff = copyToChannel(buff, buffer.getChannelData(0), channel[c][0]);
        buff = copyToChannel(buff, buffer.getChannelData(0), channel[c][1]);
      } else {
        buff = copyToChannel(buff, buffer.getChannelData(0), channel[c]);
      }
    }
  } else {
    //Do some downmixing to stereo
    buff = window.audioContext.createBuffer(
      window.audioContext.destination.channelCount,
      buffer.duration * window.audioContext.sampleRate,
      window.audioContext.sampleRate
    );

    for (let c = 0; c < channel.length; c++) {
      if (typeof channel[c] === "object") {
        //If there is an array within the channel array, then it is
        //assumed that the values of the array correspond to LR channels
        buff = copyToChannel(buff, buffer.getChannelData(0), channel[c][0]);
        buff = copyToChannel(buff, buffer.getChannelData(1), channel[c][1]);
      } else {
        //Combine the two buffer channels into one.
        buff = copyToChannel(buff, buffer.getChannelData(0), channel[c]);
      }
    }
  }
  return buff;
}

function playSound(opts) {
  removeSound(opts.id, true);
  opts.id = opts.id || uuid.v4();
  const volume = opts.muted ? 0 : opts.volume || 1;
  const playbackRate = opts.paused ? 0 : opts.playbackRate || 1;
  const channel = opts.channel || [0, 1];
  const asset = opts.url || `/assets${opts.asset}`;
  if (!asset) return;
  try {
    fetch(asset)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => {
        window.audioContext.destination.channelCount =
          window.audioContext.destination.maxChannelCount;
        // Connect the sound source to the volume control.
        // Create a buffer from the response ArrayBuffer.
        window.audioContext.decodeAudioData(
          arrayBuffer,
          buffer => {
            const sound = { ...opts } || {};
            //Create a new buffer and set it to the specified channel.
            sound.source = window.audioContext.createBufferSource();
            sound.source.buffer = downMixBuffer(buffer, channel);
            sound.source.loop = opts.looping || false;
            sound.source.playbackRate.setValueAtTime(playbackRate, 0);
            sound.gain = window.audioContext.createGain();
            // Use an x * x curve, since linear isn't super great with volume.
            sound.gain.gain.setValueAtTime(volume * volume, 0);
            sound.source.connect(sound.gain);

            sound.source.onended = () => {
              removeSound(opts.id);
              opts.onFinishedPlaying && opts.onFinishedPlaying();
            };
            sound.gain.connect(window.audioContext.destination);
            sound.source.start();
            sounds[opts.id] = sound;
          },
          function onFailure() {
            console.error(new Error("Decoding the audio buffer failed"));
          }
        );
      })
      .catch(err => {
        console.log("There was an error");
      });
  } catch (err) {
    console.log("There was an error");
  }
}

function removeSound(id, force, ambiance) {
  const sound = sounds[id];
  if (sound) {
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

function removeAllSounds(ambiance) {
  Object.keys(sounds).forEach(key => {
    removeSound(key, true, ambiance);
  });
}

function stopLooping(ambiance) {
  console.log("Stopping looping", ambiance);
  Object.keys(sounds).forEach(id => {
    const sound = sounds[id];
    if (sound) {
      if (sound.ambiance && !ambiance) return;
      // sound.looping = false;
      sound.source.loop = false;
      sound.source.onended = () => removeSound(id, true);
    }
  });
}
const withSound = Comp => {
  return props => (
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
