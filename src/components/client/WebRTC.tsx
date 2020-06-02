import React from "react";

import {
  useWebRtcCandidateMutation,
  useWebRtcClientsSubscription,
  WebRtcReinitiateDocument,
  useWebRtcSignalMutation,
  WebRtcSignalSubDocument,
  WebRtcSignalSubSubscriptionResult,
} from "generated/graphql";
import Peer from "simple-peer";
import {useApolloClient} from "@apollo/client";
import BrowserMCU from "./BrowserMCU";

let audioContext = new AudioContext();

let mcu: BrowserMCU | null = null;
const useBrowserMCU = () => {
  // Set up the MCU
  React.useEffect(() => {
    if (!mcu) {
      mcu = new BrowserMCU(BrowserMCU.AUDIO_MODE_MINUS_ONE, audioContext);
      mcu.startMix();
    }
  }, []);

  return mcu;
};

var WIDTH = 640;
var HEIGHT = 360;

// Interesting parameters to tweak!
var SMOOTHING = 0.8;
var FFT_SIZE = 1024;

function useAnalyser(canvas: React.RefObject<HTMLCanvasElement>) {
  const [analyser, freqs, times] = React.useMemo(() => {
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = -140;
    analyser.maxDecibels = 0;
    const freqs = new Uint8Array(analyser.frequencyBinCount);
    const times = new Uint8Array(analyser.frequencyBinCount);
    return [analyser, freqs, times];
  }, []);
  const frame = React.useRef<number>(0);

  const draw = () => {
    analyser.smoothingTimeConstant = SMOOTHING;
    analyser.fftSize = FFT_SIZE;

    // Get the frequency data from the currently playing music
    analyser.getByteFrequencyData(freqs);
    analyser.getByteTimeDomainData(times);

    var drawContext = canvas.current?.getContext("2d");
    if (!drawContext || !canvas.current) return;
    canvas.current.width = WIDTH;
    canvas.current.height = HEIGHT;
    // Draw the frequency domain chart.
    for (let i = 0; i < analyser.frequencyBinCount; i++) {
      let value = freqs[i];
      let percent = value / 256;
      let height = HEIGHT * percent;
      let offset = HEIGHT - height - 1;
      let barWidth = WIDTH / analyser.frequencyBinCount;
      let hue = (i / analyser.frequencyBinCount) * 360;
      drawContext.fillStyle = "hsl(" + hue + ", 100%, 50%)";
      drawContext.fillRect(i * barWidth, offset, barWidth, height);
    }

    // Draw the time domain chart.
    for (let i = 0; i < analyser.frequencyBinCount; i++) {
      let value = times[i];
      let percent = value / 256;
      let height = HEIGHT * percent;
      let offset = HEIGHT - height - 1;
      let barWidth = WIDTH / analyser.frequencyBinCount;
      drawContext.fillStyle = "white";
      drawContext.fillRect(i * barWidth, offset, 1, 2);
    }
    frame.current = requestAnimationFrame(draw);
  };

  React.useEffect(() => {
    return () => cancelAnimationFrame(frame.current);
  }, []);
  return {analyser, draw};
}

export const useWebRTCMCU = ({
  simulatorId,
  clientId,
  canvas,
}: {
  simulatorId: string;
  clientId: string;
  canvas: React.RefObject<HTMLCanvasElement>;
}) => {
  const [rtcCandidate] = useWebRtcCandidateMutation({variables: {clientId}});
  const [signal] = useWebRtcSignalMutation();
  const {data} = useWebRtcClientsSubscription({
    variables: {simulatorId},
  });
  const client = useApolloClient();

  const mcu = useBrowserMCU();

  const clients = data?.clientChanged;
  const isInitiator = Boolean(
    data?.clientChanged?.find(c => c?.id === clientId)?.webRTCInitiator,
  );

  // Claim Candidacy
  React.useEffect(() => {
    rtcCandidate();

    // Reinitiate candidacy if necessary
    const sub = client
      .subscribe({query: WebRtcReinitiateDocument, variables: {simulatorId}})
      .subscribe({
        next({data}) {
          rtcCandidate();
        },
        error() {},
      });
    return () => {
      sub?.unsubscribe();
    };
  }, [client, rtcCandidate, simulatorId]);

  // Create a peer and properly handle signaling
  const peers = React.useRef<{[clientId: string]: Peer.Instance}>({});
  const streams = React.useRef<{[steamId: string]: MediaStream}>({});

  const {analyser, draw} = useAnalyser(canvas);

  React.useEffect(() => {
    if (!isInitiator) return;
    function createPeer(peerId: string) {
      if (!peers.current[peerId] && peerId !== clientId) {
        peers.current[peerId] = new Peer({});

        peers.current[peerId].on("error", err => {
          peers.current[peerId].destroy();
          mcu?.removeRemoteAudioMinusOne(peerId);

          delete streams.current[peerId];
          delete peers.current[peerId];
        });

        peers.current[peerId].on("signal", data => {
          signal({variables: {clientId: peerId, signal: JSON.stringify(data)}});
        });

        peers.current[peerId].on("connect", () => {
          console.log("CONNECT");
          peers.current[peerId]?.send("whatever" + Math.random());
        });
        peers.current[peerId].on("data", data => {
          console.log(`data from ${peerId}: ${data}`);
        });

        peers.current[peerId].on("stream", (stream: MediaStream) => {
          new Audio().srcObject = stream;

          // Clean up
          delete streams.current[peerId];
          mcu?.removeRemoteAudioMinusOne(peerId);

          streams.current[peerId] = stream;
          mcu?.addRemoteAudioMinusOne(peerId, stream);
          const outputStream = mcu?.prepareMinusOneStream(peerId);
          outputStream && peers.current[peerId].addStream(outputStream);

          if (mcu && Object.keys(mcu.minusOneOutputNodes)[0] === peerId) {
            const node = mcu.minusOneStreams[peerId];
            audioContext.createMediaStreamSource(node).connect(analyser);
            draw();
          }
          // Here is where you can do any processing to stream before sending it out
        });
        return peers.current[peerId];
      }
      return peers.current[peerId];
    }

    function loadPeers() {
      clients?.forEach(c => {
        if (!c?.id) return;

        createPeer(c.id);
      });
    }

    if (Object.keys(peers).length === 0) {
      setTimeout(loadPeers, 2000);
    } else {
      loadPeers();
    }

    // Handle appending the signal when it comes through GraphQL Subscriptions
    const sub = client
      .subscribe({query: WebRtcSignalSubDocument, variables: {clientId}})
      .subscribe({
        next({data}: WebRtcSignalSubSubscriptionResult) {
          if (data?.webRTCSignal?.destinationClientId === clientId) {
            let peer = peers.current[data.webRTCSignal.senderClientId];
            if (!peer || peer.destroyed) {
              mcu?.removeRemoteAudioMinusOne(data.webRTCSignal.senderClientId);

              delete streams.current[data.webRTCSignal.senderClientId];
              delete peers.current[data.webRTCSignal.senderClientId];
              peer = createPeer(data.webRTCSignal.senderClientId);
            }
            peer?.signal(JSON.parse(data.webRTCSignal.signal));
          }
        },
        error() {},
      });
    return () => {
      sub.unsubscribe();
    };
  }, [client, clientId, clients, isInitiator, mcu, signal]);
};

const useGainNode = (
  audioContext: AudioContext,
): [GainNode, number, React.Dispatch<React.SetStateAction<number>>] => {
  const [gain, setGain] = React.useState(1);
  const [gainNode] = React.useState(audioContext.createGain());
  React.useEffect(() => {
    gainNode.gain.value = gain;
  }, [gain, gainNode]);
  return [gainNode, gain, setGain];
};

const useWebRTCPlayer = (
  clientId: string,
  canvas: React.RefObject<HTMLCanvasElement>,
) => {
  const [activated, setActivated] = React.useState(false);

  const [gainNode, gain, setGain] = useGainNode(audioContext);

  const client = useApolloClient();
  const [signal] = useWebRtcSignalMutation();

  const localPeer = React.useRef<Peer.Instance>();

  const {analyser, draw} = useAnalyser(canvas);

  React.useEffect(() => {
    if (!activated) return;
    console.log("Activating");
    let mySource: MediaStreamAudioSourceNode;
    localPeer.current = new Peer({
      initiator: true,
    });

    localPeer.current.on("error", err => {
      console.log("Peer error", err);
      localPeer.current?.destroy();
      localPeer.current = undefined;
      try {
        mySource?.disconnect(gainNode);
        gainNode?.disconnect(audioContext.destination);
      } catch {
        // Do nothing
      }
      setActivated(false);
    });

    localPeer.current.on("signal", data => {
      console.log("SENDING SIGNAL");
      signal({variables: {clientId: clientId, signal: JSON.stringify(data)}});
    });

    localPeer.current.on("connect", () => {
      console.log("CONNECT");
      localPeer.current?.send("whatever" + Math.random());
    });
    localPeer.current.on("data", data => {
      console.log(`data from initiator: ${data}`);
    });
    localPeer.current.on("stream", (stream: MediaStream) => {
      new Audio().srcObject = stream;

      console.log("got stream");

      mySource = audioContext.createMediaStreamSource(stream);

      mySource.connect(gainNode);
      gainNode.connect(audioContext.destination);
      gainNode.connect(analyser);
      draw();
    });

    addStream();

    // Handle appending the signal when it comes through GraphQL Subscriptions
    const sub = client
      .subscribe({query: WebRtcSignalSubDocument, variables: {clientId}})
      .subscribe({
        next({data}: WebRtcSignalSubSubscriptionResult) {
          if (
            data?.webRTCSignal?.destinationClientId === clientId &&
            data?.webRTCSignal?.signal
          ) {
            console.log("GOT SIGNAL");
            localPeer.current?.signal(JSON.parse(data.webRTCSignal.signal));
          }
        },
        error() {},
      });
    return () => {
      sub.unsubscribe();
    };
  }, [client, clientId, gainNode, activated, signal]);

  function addStream() {
    // const oscNode = audioContext.createOscillator();
    // oscNode.frequency.setValueAtTime(500, 0);
    // const gain = audioContext.createGain();
    // gain.gain.setValueAtTime(0.1, 0);
    // oscNode.start();
    // oscNode.connect(gain);
    // const stream = audioContext.createMediaStreamDestination();
    // gain.connect(stream);

    // localPeer.current?.addStream(stream.stream);
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(res => localPeer.current?.addStream(res))
      .catch(() => {});
  }

  const output = React.useMemo(() => {
    return {
      activate: () => setActivated(true),
      outputStream: gainNode,
      activated,
      gain,
      setGain,
    };
  }, [gainNode, activated, gain, setGain]);
  return output;
};

const WebRTCContext = React.createContext({
  activate: () => {},
  outputStream: audioContext.createGain(),
  setGain: (value: number) => {},
  gain: 1,
  activated: false,
});

export const WebRTCContextProvider: React.FC<{clientId: string}> = ({
  children,
  clientId,
}) => {
  const canvas = React.useRef(null);
  const value = useWebRTCPlayer(clientId, canvas);
  return (
    <WebRTCContext.Provider value={value}>
      <canvas ref={canvas}></canvas>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTCContext = () => {
  const value = React.useContext(WebRTCContext);
  return value;
};
