import React, { useEffect, useState, useRef } from "react";
import uuid from "uuid";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import Spark from "components/views/Actions/spark";
const synth = window.speechSynthesis;

const ACTIONS_SUB = gql`
  subscription ActionsSub($simulatorId: ID!, $stationId: ID, $clientId: ID) {
    actionsUpdate(
      simulatorId: $simulatorId
      stationId: $stationId
      clientId: $clientId
    ) {
      action
      duration
      message
      voice
    }
  }
`;

const useFlash = () => {
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef(null);
  const doFlash = duration => {
    duration = duration || duration === 0 ? duration : 10;
    if (duration <= 0) {
      return setFlash(false);
    }
    setFlash(oldFlash => !oldFlash);
    timeoutRef.current = setTimeout(() => doFlash(duration - 1), 100);
  };
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  return { flash, doFlash };
};

const useSpark = () => {
  const [sparks, setSparks] = useState([]);
  const timeoutRef = useRef([]);
  const doSpark = duration => {
    duration = duration || 5000;
    const id = uuid.v4();
    setSparks([...sparks, id]);
    timeoutRef.current.push(
      setTimeout(() => {
        setSparks(sparks.filter(s => s !== id));
      }, duration)
    );
  };
  useEffect(
    () => () => timeoutRef.current.forEach(ref => clearTimeout(ref)),
    []
  );
  return {
    doSpark,
    Sparks: () => sparks.map(s => <Spark key={s} />)
  };
};

const ActionsMixin = ({ simulator, station, changeCard, children, client }) => {
  const { flash, doFlash } = useFlash();
  const { doSpark, Sparks } = useSpark();
  useEffect(() => {
    const subscription = client
      .subscribe({
        query: ACTIONS_SUB,
        variables: {
          simulatorId: simulator.id,
          stationId: station.name
        }
      })
      .subscribe({
        next({
          data: {
            actionsUpdate: { action, message, voice, duration }
          }
        }) {
          switch (action) {
            case "flash":
              return doFlash(duration);
            case "spark":
              return doSpark(duration);
            case "reload":
              return window.location.reload();
            case "speak":
              const voices = synth.getVoices();
              const words = new SpeechSynthesisUtterance(message);
              if (voice) words.voice = voices.find(v => v.name === voice);
              return synth.speak(words);
            case "shutdown":
            case "restart":
            case "sleep":
            case "quit":
            case "beep":
            case "freak":
              return window.thorium.sendMessage({ action });
            case "changeCard":
              return changeCard(message);
            default:
              return;
          }
        },
        error(err) {
          console.error("err", err);
        }
      });
    return () => subscription.unsubscribe();
  }, [simulator, station]);
  return (
    <div className={`actionsContainer ${flash ? "flash" : ""}`}>
      {children}
      <Sparks />
    </div>
  );
};

export default withApollo(ActionsMixin);
