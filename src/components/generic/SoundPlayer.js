import React, { Component } from "react";
import uuid from "uuid";
import T from "prop-types";
import { Asset } from "../../helpers/assets.js";

function copyToChannel(destination, source, channelNumber) {
  var nowBuffering = destination.getChannelData(channelNumber);
  for (var i = 0; i < source.length; i++) {
    nowBuffering[i] = source[i];
  }
  return destination;
}

function downMixBuffer(buffer, channel) {
  let buff;
  if (buffer.numberOfChannels === 1) {
    buff = this.audioContext.createBuffer(
      this.audioContext.destination.channelCount,
      buffer.duration * this.audioContext.sampleRate,
      this.audioContext.sampleRate
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
    buff = this.audioContext.createBuffer(
      this.audioContext.destination.channelCount,
      buffer.duration * this.audioContext.sampleRate,
      this.audioContext.sampleRate
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

function noop() {}

const playStatuses = {
  PLAYING: "PLAYING",
  STOPPED: "STOPPED",
  PAUSED: "PAUSED"
};

class Sound extends Component {
  static status = playStatuses;

  static propTypes = {
    url: T.string.isRequired,
    playStatus: T.oneOf(Object.keys(playStatuses)).isRequired,
    volume: T.number,
    onLoading: T.func,
    onLoad: T.func,
    onPlaying: T.func,
    onPause: T.func,
    onResume: T.func,
    onStop: T.func,
    onFinishedPlaying: T.func,
    looping: T.bool
  };

  static defaultProps = {
    volume: 1,
    onLoading: noop,
    onPlaying: noop,
    onLoad: noop,
    onPause: noop,
    onResume: noop,
    onStop: noop,
    onFinishedPlaying: noop,
    looping: false
  };

  constructor(props) {
    super(props);
    if (!window.audioContext) {
      window.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    this.audioContext = window.audioContext;
  }
  componentDidMount() {
    this.playSound(this.props);
  }

  componentWillUnmount() {
    this.removeSound();
  }

  componentDidUpdate(prevProps) {
    const withSound = sound => {
      if (!sound) {
        return;
      }

      if (this.props.playStatus === playStatuses.PLAYING) {
        sound.start();
      } else if (this.props.playStatus === playStatuses.STOPPED) {
        sound.stop();
      }

      /* if (this.props.volume !== prevProps.volume) {
        sound.setVolume(this.props.volume);
      }*/
      if (this.props.looping !== prevProps.looping) {
        sound.loop = this.props.looping;
      }
      if (this.props.playrate !== prevProps.playrate) {
        sound.playrate.value = this.props.playrate;
      }
    };

    if (this.props.url !== prevProps.url) {
      this.createSound(this.props);
    } else {
      withSound(this.sound);
    }
  }

  playSound(opts) {
    this.removeSound();

    const volume = opts.muted ? 0 : opts.volume || 1;
    const playbackRate = opts.paused ? 0 : opts.playbackRate || 1;
    const channel = opts.channel || [0, 1];
    const asset = opts.url;
    if (!asset) return;
    fetch(asset).then(res => res.arrayBuffer()).then(arrayBuffer => {
      opts._id = opts._id || uuid.v4();

      this.audioContext.destination.channelCount = this.audioContext.destination.maxChannelCount;

      this.sound.source = this.audioContext.createBufferSource();
      this.sound.volume = this.audioContext.createGain();
      this.sound.volume.gain.value = volume;

      // Connect the sound source to the volume control.
      this.sound.source.connect(this.sound.volume);
      // Create a buffer from the response ArrayBuffer.
      this.audioContext.decodeAudioData(
        arrayBuffer,
        buffer => {
          //Create a new buffer and set it to the specified channel.
          this.sound = this.audioContext.createBufferSource();
          this.sound.buffer = downMixBuffer(buffer, channel);
          this.sound.loop = opts.looping || false;
          this.sound.playbackRate.value = playbackRate;
          this.sound.onended = function() {};
          this.sound.connect(this.audioContext.destination);
          if (opts.playStatus === "PLAYING") this.sound.play();
        },
        function onFailure() {
          console.error("Decoding the audio buffer failed");
        }
      );
    });
  }

  removeSound() {
    if (this.sound) {
      this.sound.stop();
      delete this.sound;
    }
  }

  render() {
    return null;
  }
}

export default props =>
  <Asset asset={props.asset}>
    {({ src }) => <Sound {...props} url={src} />}
  </Asset>;
