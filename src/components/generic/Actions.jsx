import React, {useEffect, useState, useRef} from "react";
import uuid from "uuid";
import gql from "graphql-tag.macro";
import Spark from "components/views/Actions/spark";
import {useApolloClient} from "@apollo/client";
const synth = window.speechSynthesis;

const ACTIONS_SUB = gql`
  subscription ActionsSub($simulatorId: ID!, $stationId: ID) {
    actionsUpdate(simulatorId: $simulatorId, stationId: $stationId) {
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
  const doFlash = React.useCallback(duration => {
    clearTimeout(timeoutRef.current);
    duration = duration || duration === 0 ? duration : 10;
    if (duration <= 0) {
      return setFlash(false);
    }
    setFlash(oldFlash => !oldFlash);
    timeoutRef.current = setTimeout(() => doFlash(duration - 1), 150);
  }, []);
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  return {flash, doFlash};
};

const useSpark = () => {
  const [sparks, setSparks] = useState([]);
  const timeoutRef = useRef([]);
  const doSpark = React.useCallback(duration => {
    duration = duration || 5000;
    const id = uuid.v4();
    setSparks(sparks => [...sparks, id]);
    const timeout = setTimeout(() => {
      setSparks(sparks => sparks.filter(s => s !== id));
    }, duration);
    timeoutRef.current.push(timeout);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
    return () => timeoutRef.current.forEach(ref => clearTimeout(ref));
  }, []);
  return {
    doSpark,
    Sparks: () => sparks.map(s => <Spark key={s} />),
  };
};

const ActionsMixin = ({simulator, station, changeCard}) => {
  const {flash, doFlash} = useFlash();
  const {doSpark, Sparks} = useSpark();
  const client = useApolloClient();
  const {id: simulatorId} = simulator;
  const {name: stationName} = station;
  useEffect(() => {
    const subscription = client
      .subscribe({
        query: ACTIONS_SUB,
        variables: {
          simulatorId: simulatorId,
          stationId: stationName,
        },
      })
      .subscribe({
        next({
          data: {
            actionsUpdate: {action, message, voice, duration},
          },
        }) {
          switch (action) {
            case "flash":
              return doFlash(duration);
            case "spark":
              return doSpark(duration);
            case "reload":
              return window.location.reload();
            case "speak": {
              const voices = synth.getVoices();
              const words = new SpeechSynthesisUtterance(message);
              if (voice) words.voice = voices.find(v => v.name === voice);
              return synth.speak(words);
            }
            case "shutdown":
            case "restart":
            case "sleep":
            case "quit":
            case "beep":
              return window.thorium.sendMessage({action});
            default:
              return;
          }
        },
        error(err) {
          console.error("err", err);
        },
      });
    return () => subscription.unsubscribe();
  }, [client, doFlash, doSpark, simulatorId, stationName]);
  return (
    <div className={`actionsContainer ${flash ? "flash" : ""}`}>
      <Sparks />
    </div>
  );
};

export default ActionsMixin;
