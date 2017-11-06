import React from "react";
import uuid from "uuid";

const sounds = {};

if (!window.audioContext) {
  window.audioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
}

function copyToChannel(destination, source, channelNumber) {
  var nowBuffering = destination.getChannelData(channelNumber);
  for (let i = 0; i < source.length; i++) {
    nowBuffering[i] = source[i];
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
  removeSound(opts.id);
  opts.id = uuid.v4();
  const volume = opts.muted ? 0 : opts.volume || 1;
  const playbackRate = opts.paused ? 0 : opts.playbackRate || 1;
  const channel = opts.channel || [0, 1];
  const asset = opts.url;
  if (!asset) return;
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
          const sound = opts || {};
          //Create a new buffer and set it to the specified channel.
          sound.source = window.audioContext.createBufferSource();
          sound.source.buffer = downMixBuffer(buffer, channel);
          sound.source.loop = opts.looping || false;
          sound.source.playbackRate.value = playbackRate;
          sound.volume = window.audioContext.createGain();
          sound.volume.gain.value = volume;
          sound.source.connect(sound.volume);

          sound.source.onended = () => {
            removeSound(opts.id);
            opts.onFinishedPlaying && opts.onFinishedPlaying();
          };
          sound.source.connect(window.audioContext.destination);
          sound.source.start();
          sounds[opts.id] = sound;
        },
        function onFailure() {
          console.error("Decoding the audio buffer failed");
        }
      );
    });
}

function removeSound(id) {
  const sound = sounds[id];
  if (sound) {
    sound.source.stop();
    delete sounds[id];
  }
}

/*componentDidUpdate(prevProps) {
    const withSound = sound => {
      if (!sound) {
        return;
      }

      if (this.props.playStatus === playStatuses.PLAYING) {
        sound.start();
      } else if (this.props.playStatus === playStatuses.STOPPED) {
        sound.stop();
      }

      if (this.props.volume !== prevProps.volume) {
        sound.setVolume(this.props.volume);
      }
      if (this.props.looping !== prevProps.looping) {
        sound.loop = this.props.looping;
      }
      if (this.props.playrate !== prevProps.playrate) {
        sound.playrate.value = this.props.playrate;
      }
    };
    if (this.props.url !== prevProps.url) {
      this.playSound(this.props);
    } else {
      withSound(this.sound);
    }
  }*/

const withSound = Comp => {
  return props => <Comp {...props} playSound={playSound} />;
};

export default withSound;
