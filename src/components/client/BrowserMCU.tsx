class BrowserMCU {
  audioContext: AudioContext;
  inputNodes: {[key: string]: MediaStreamAudioSourceNode} = {};
  minusOneOutputNodes: {[key: string]: MediaStreamAudioDestinationNode} = {};
  minusOneStreams: {[key: string]: MediaStream} = {};
  mixAllOutputNode: MediaStreamAudioDestinationNode;
  audioMixAllStream: MediaStream;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.mixAllOutputNode = this.audioContext.createMediaStreamDestination();

    this.audioMixAllStream = this.mixAllOutputNode.stream;
    new Audio().srcObject = this.audioMixAllStream;
  }

  // --- handling remote audio ---
  addRemoteAudio(peerId: string, stream: MediaStream) {
    // --- check for double add ---
    let existRemoteNode = this.inputNodes[peerId];
    if (existRemoteNode) {
      console.warn("remote audio node ALREADY EXIST stream.id=" + peerId);
      return;
    }
    new Audio().srcObject = stream;

    let remoteNode = this.audioContext.createMediaStreamSource(stream);
    this.inputNodes[peerId] = remoteNode;

    remoteNode.connect(this.mixAllOutputNode);

    // --- connect to other output ---
    for (let key in this.minusOneOutputNodes) {
      if (key === peerId) {
        console.log("skip output(id=" + key + ") because same id=" + peerId);
      } else {
        console.log("Connecting outputs", key);
        let otherOutputNode = this.minusOneOutputNodes[key];
        remoteNode.connect(otherOutputNode);
      }
    }
  }

  removeRemoteAudio(peerId: string) {
    let remoteNode = this.inputNodes[peerId];
    if (remoteNode) {
      this.mixAllOutputNode && remoteNode.disconnect(this.mixAllOutputNode);
      Object.values(this.minusOneOutputNodes).forEach(node => {
        try {
          remoteNode.disconnect(node);
        } catch (e) {
          // Do nothing
        }
      });
      delete this.inputNodes[peerId];
    } else {
      console.warn("removeRemoteAudio() remoteStream NOT EXIST");
    }

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

    let minusOneStream: MediaStream | null = this.minusOneStreams[peerId];
    if (minusOneStream) {
      minusOneStream = null;
      delete this.minusOneStreams[peerId];
    } else {
      console.warn("minusOneStream NOT EXIST for peerId:" + peerId);
    }
  }

  removeAllRemoteAudio() {
    console.log("===== removeAllRemoteAudio ======");
    for (let key in this.inputNodes) {
      let remoteNode = this.inputNodes[key];
      this.mixAllOutputNode && remoteNode.disconnect(this.mixAllOutputNode);
    }

    for (let key in this.minusOneStreams) {
      this.removeRemoteAudio(key);
    }
    this.inputNodes = {};
  }

  getMinusOneStream(peerId: string) {
    let stream = this.minusOneStreams[peerId];
    if (stream) {
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
}

export default BrowserMCU;
