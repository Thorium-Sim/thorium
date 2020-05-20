class BrowserMCU {
  static AUDIO_MODE_NONE = 0;
  static AUDIO_MODE_MINUS_ONE = 1;
  static AUDIO_MODE_ALL = 2;
  audioContext: AudioContext;
  audioMode: number = BrowserMCU.AUDIO_MODE_ALL;
  inputNodes: {[key: string]: MediaStreamAudioSourceNode} = {};
  minusOneOutputNodes: {[key: string]: MediaStreamAudioDestinationNode} = {};
  minusOneStreams: {[key: string]: MediaStream} = {};
  mixAllOutputNode?: MediaStreamAudioDestinationNode;
  audioMixAllStream?: MediaStream;

  constructor(mode: number, audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.audioMode = mode;
  }

  // --- start/stop Mix ----
  startMix() {
    if (this.audioMode === BrowserMCU.AUDIO_MODE_ALL) {
      this.mixAllOutputNode = this.audioContext.createMediaStreamDestination();

      this.audioMixAllStream = this.mixAllOutputNode.stream;
      new Audio().srcObject = this.audioMixAllStream;
    }
  }

  stopMix() {
    if (this.mixAllOutputNode) {
      this.audioMixAllStream = undefined;
      this.mixAllOutputNode = undefined;
    }
  }

  isMixStarted() {
    if (this.audioMixAllStream) {
      return true;
    } else {
      return false;
    }
  }

  _stopStream(stream: MediaStream) {
    let tracks = stream.getTracks();
    if (!tracks) {
      console.warn("NO tracks");
      return;
    }

    for (let track of tracks) {
      track.stop();
    }
  }

  // --- handling remote audio ---
  addRemoteAudio(stream: MediaStream) {
    if (this.audioMode === BrowserMCU.AUDIO_MODE_NONE) {
      // AUDIO_MODE_NONE
      console.log("BrowserMCU.AUDIO_MODE_NONE: ignore remote audio");
      return;
    }

    // --- check for double add ---
    let existRemoteNode = this.inputNodes[stream.id];
    if (existRemoteNode) {
      console.warn("remote audio node ALREADY EXIST stream.id=" + stream.id);
      return;
    }
    new Audio().srcObject = stream;

    let remoteNode = this.audioContext.createMediaStreamSource(stream);
    this.inputNodes[stream.id] = remoteNode;

    if (this.audioMode === BrowserMCU.AUDIO_MODE_ALL && this.mixAllOutputNode) {
      console.log("BrowserMCU.AUDIO_MODE_ALL: mix all audio");
      remoteNode.connect(this.mixAllOutputNode);
    } else if (this.audioMode === BrowserMCU.AUDIO_MODE_MINUS_ONE) {
      console.warn(
        "DO NOT use addRemoteAudio() on BrowserMCU.AUDIO_MODE_MINUS_ONE",
      );
    } else if (this.audioMode === BrowserMCU.AUDIO_MODE_NONE) {
      // AUDIO_MODE_NONE
      console.log("BrowserMCU.AUDIO_MODE_NONE: ignore remote audio");
    } else {
      // WRONG audioMode
      console.error("BAD audioMode");
    }
  }

  removeRemoteAudio(stream: MediaStream) {
    let remoteNode = this.inputNodes[stream.id];
    if (remoteNode) {
      this.mixAllOutputNode && remoteNode.disconnect(this.mixAllOutputNode);
      delete this.inputNodes[stream.id];
    } else {
      console.warn("removeRemoteAudio() remoteStream NOT EXIST");
    }
  }

  removeAllRemoteAudio() {
    console.log("===== removeAllRemoteAudio ======");
    for (let key in this.inputNodes) {
      let remoteNode = this.inputNodes[key];
      this.mixAllOutputNode && remoteNode.disconnect(this.mixAllOutputNode);
    }
    this.inputNodes = {};
  }

  prepareMinusOneStream(peerId: string) {
    let stream = this.minusOneStreams[peerId];
    if (stream) {
      console.warn("minusOneStream ALREADY EXIST for peerId:" + peerId);
      return stream;
    }

    let newOutputNode = this.audioContext.createMediaStreamDestination();
    let newAudioMixStream = newOutputNode.stream;
    new Audio().srcObject = newAudioMixStream;

    this.minusOneOutputNodes[peerId] = newOutputNode;
    this.minusOneStreams[peerId] = newAudioMixStream;
    for (let key in this.inputNodes) {
      if (key === peerId) {
        console.log("skip input(id=" + key + ") because same id=" + peerId);
      } else {
        console.log("connect input(id=" + key + ") to this output");
        let otherMicNode = this.inputNodes[key];
        otherMicNode.connect(newOutputNode);
      }
    }
    return newAudioMixStream;
  }

  getMinusOneStream(peerId: string) {
    let stream = this.minusOneStreams[peerId];
    if (!stream) {
      console.warn("minusOneStream NOT EXIST for peerId:" + peerId);
    }
    return stream;
  }

  addRemoteAudioMinusOne(peerId: string, stream: MediaStream) {
    let audioTracks = stream.getAudioTracks();
    if (audioTracks && audioTracks.length > 0) {
      console.log(
        "stream has audioStream. audio track count = " + audioTracks.length,
      );
      console.log(
        " stream.id=" + stream.id + " , track.id=" + audioTracks[0].id,
      );

      new Audio().srcObject = stream;

      // --- prepare audio mic node ---
      let micNode = this.audioContext.createMediaStreamSource(stream);
      this.inputNodes[peerId] = micNode;

      // --- connect to other output ---
      for (let key in this.minusOneOutputNodes) {
        if (key === peerId) {
          console.log("skip output(id=" + key + ") because same id=" + peerId);
        } else {
          console.log("Connecting outputs, key");
          let otherOutputNode = this.minusOneOutputNodes[key];
          micNode.connect(otherOutputNode);
        }
      }
    } else {
      console.warn("NO Audio Tracks in stream");
    }
  }

  removeRemoteAudioMinusOne(peerId: string) {
    // -- remove from other outputs ----
    let thisMicNode: MediaStreamAudioSourceNode | null = this.inputNodes[
      peerId
    ];
    if (thisMicNode) {
      for (let key in this.minusOneOutputNodes) {
        if (key === peerId) {
          console.log("skip output(id=" + key + ") because same id=" + peerId);
        } else {
          let otherOutputNode = this.minusOneOutputNodes[key];
          thisMicNode.disconnect(otherOutputNode);
        }
      }

      thisMicNode = null;
      delete this.inputNodes[peerId];
    } else {
      console.warn("inputNode NOT EXIST for peerId:" + peerId);
    }

    // --- remove other mic/inputs ---
    let thisOutputNode: MediaStreamAudioDestinationNode | null = this
      .minusOneOutputNodes[peerId];
    if (thisOutputNode) {
      for (let key in this.inputNodes) {
        if (key === peerId) {
          console.log("skip disconnecting mic, because key=id (not connected)");
        } else {
          let micNode = this.inputNodes[key];
          micNode.disconnect(thisOutputNode);
        }
      }

      thisOutputNode = null;
      delete this.minusOneOutputNodes[peerId];
    } else {
      console.warn("minusOneOutputNode NOT EXIST for peerId:" + peerId);
    }

    let stream: MediaStream | null = this.minusOneStreams[peerId];
    if (stream) {
      stream = null;
      delete this.minusOneStreams[peerId];
    } else {
      console.warn("minusOneStream NOT EXIST for peerId:" + peerId);
    }
  }

  removeAllRemoteAudioMinusOne() {
    for (let key in this.minusOneStreams) {
      this.removeRemoteAudioMinusOne(key);
    }
  }
}

export default BrowserMCU;
