import React from "react";
import {FormattedMessage} from "react-intl";
import {useSounds} from "../generic/SoundPlayer";
import Reset from "./reset";
import {useApolloClient} from "@apollo/client";
import {
  AmbianceDocument,
  Ambiance,
  Simulator,
  useWebRtcCandidateMutation,
  useWebRtcClientsSubscription,
  WebRtcReinitiateDocument,
  useWebRtcSignalMutation,
  WebRtcSignalSubDocument,
  WebRtcSignalSubSubscriptionResult,
} from "generated/graphql";
import {ClientLighting} from "./lighting";
import Peer from "simple-peer";

let audioContext = new AudioContext();

const WebRTC: React.FC<{simulatorId: string; clientId: string}> = ({
  simulatorId,
  clientId,
}) => {
  const [rtcCandidate] = useWebRtcCandidateMutation({variables: {clientId}});
  const [signal] = useWebRtcSignalMutation();
  const {data} = useWebRtcClientsSubscription({
    variables: {simulatorId},
  });
  const client = useApolloClient();

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

  React.useEffect(() => {
    function loadPeers() {
      clients?.forEach(c => {
        if (!c?.id) return;
        if (!peers.current[c.id] && c.id !== clientId) {
          peers.current[c.id] = new Peer({
            initiator: isInitiator,
          });

          peers.current[c.id].on("error", err =>
            console.log("Peer error", err),
          );

          peers.current[c.id].on("signal", data => {
            signal({variables: {clientId: c.id, signal: JSON.stringify(data)}});
          });

          peers.current[c.id].on("connect", () => {
            console.log("CONNECT");
            peers.current[c.id]?.send("whatever" + Math.random());
          });
          peers.current[c.id].on("data", data => {
            console.log(`data from ${c.id}: ${data}`);
          });

          peers.current[c.id].on("stream", (stream: MediaStream) => {
            new Audio().srcObject = stream;

            console.log("got stream");

            let mySource = audioContext.createMediaStreamSource(stream);
            let gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(2, 0.1);
            mySource.connect(gainNode);
            gainNode.connect(audioContext.destination);
          });
        }
      });
    }

    if (isInitiator) {
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
              peers.current[data.webRTCSignal.senderClientId]?.signal(
                JSON.parse(data.webRTCSignal.signal),
              );
            }
          },
          error() {},
        });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [client, clientId, clients, isInitiator, signal]);

  const localPeer = React.useRef<Peer.Instance>();

  React.useEffect(() => {
    if (!isInitiator) {
      localPeer.current = new Peer({});

      localPeer.current.on("error", err => console.log("Peer error", err));

      localPeer.current.on("signal", data => {
        signal({variables: {clientId: clientId, signal: JSON.stringify(data)}});
      });

      localPeer.current.on("connect", () => {
        console.log("CONNECT");
        localPeer.current?.send("whatever" + Math.random());
      });
      localPeer.current.on("data", data => {
        console.log(`data from initiator: ${data}`);
      });

      // Handle appending the signal when it comes through GraphQL Subscriptions
      const sub = client
        .subscribe({query: WebRtcSignalSubDocument, variables: {clientId}})
        .subscribe({
          next({data}: WebRtcSignalSubSubscriptionResult) {
            if (data?.webRTCSignal?.destinationClientId === clientId) {
              localPeer.current?.signal(JSON.parse(data.webRTCSignal.signal));
            }
          },
          error() {},
        });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [client, clientId, isInitiator, signal]);

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

  return (
    <div>
      <h2>WebRTC</h2>
      {!isInitiator && <button onClick={addStream}>Add Stream</button>}
    </div>
  );
};
const SoundPlayer: React.FC<{
  simulator: Simulator;
  clientId: string;
  invisible?: boolean;
}> = ({simulator, invisible, clientId}) => {
  const {removeAllSounds, playSound} = useSounds();
  const client = useApolloClient();
  React.useEffect(() => {
    client
      .query({
        query: AmbianceDocument,
        variables: {id: simulator.id},
      })
      .then(({data: {simulators}}) => {
        const {ambiance} = simulators[0];
        ambiance.forEach((a: Ambiance) => {
          playSound({
            ...a,
            looping: true,
            ambiance: true,
          });
        });
      });
    return () => {
      removeAllSounds(true);
    };
  }, [client, playSound, removeAllSounds, simulator.id]);

  const station = React.useMemo(() => ({name: "Sound", cards: []}), []);
  if (invisible) return <Reset clientId={clientId} station={station} />;
  return (
    <div className="keyboard-holder">
      <Reset clientId={clientId} station={station} />
      <FormattedMessage id="sound-player" defaultMessage="Sound Player" />
      {/* <WebRTC simulatorId={simulator.id} clientId={clientId} /> */}
      <ClientLighting simulator={simulator} clientId={clientId} />
    </div>
  );
};

export default SoundPlayer;
