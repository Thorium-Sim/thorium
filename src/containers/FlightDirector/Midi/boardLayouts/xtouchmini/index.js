import React from "react";

import {ReactComponent as Xtouchmini} from "./xtouchmini.svg";
import {useMidi} from "helpers/midi";

const controls = {
  rotor1: {channel: 0, controllerNumber: 16, messageType: "controlchange"},
  rotor2: {channel: 0, controllerNumber: 17, messageType: "controlchange"},
  rotor3: {channel: 0, controllerNumber: 18, messageType: "controlchange"},
  rotor4: {channel: 0, controllerNumber: 19, messageType: "controlchange"},
  rotor5: {channel: 0, controllerNumber: 20, messageType: "controlchange"},
  rotor6: {channel: 0, controllerNumber: 21, messageType: "controlchange"},
  rotor7: {channel: 0, controllerNumber: 22, messageType: "controlchange"},
  rotor8: {channel: 0, controllerNumber: 23, messageType: "controlchange"},
  button1: {channel: 0, messageType: "noteon", key: 89},
  button2: {channel: 0, messageType: "noteon", key: 87},
  button3: {channel: 0, messageType: "noteon", key: 90},
  button4: {channel: 0, messageType: "noteon", key: 88},
  button5: {channel: 0, messageType: "noteon", key: 40},
  button6: {channel: 0, messageType: "noteon", key: 91},
  button7: {channel: 0, messageType: "noteon", key: 41},
  button8: {channel: 0, messageType: "noteon", key: 92},
  button9: {channel: 0, messageType: "noteon", key: 42},
  button10: {channel: 0, messageType: "noteon", key: 86},
  button11: {channel: 0, messageType: "noteon", key: 43},
  button12: {channel: 0, messageType: "noteon", key: 93},
  button13: {channel: 0, messageType: "noteon", key: 44},
  button14: {channel: 0, messageType: "noteon", key: 94},
  button15: {channel: 0, messageType: "noteon", key: 45},
  button16: {channel: 0, messageType: "noteon", key: 95},
  button17: {channel: 0, messageType: "noteon", key: 32},
  button18: {channel: 0, messageType: "noteon", key: 33},
  button19: {channel: 0, messageType: "noteon", key: 34},
  button20: {channel: 0, messageType: "noteon", key: 35},
  button21: {channel: 0, messageType: "noteon", key: 36},
  button22: {channel: 0, messageType: "noteon", key: 37},
  button23: {channel: 0, messageType: "noteon", key: 38},
  button24: {channel: 0, messageType: "noteon", key: 39},
  button100: {channel: 0, messageType: "noteon", key: 84},
  button200: {channel: 0, messageType: "noteon", key: 85},
  slider: {channel: 8, messageType: "pitchbendchange"},
};

const XTouchMini = ({setSelectedComponent, selectedComponent}) => {
  const midi = useMidi();
  React.useEffect(() => {
    return midi.addSubscriber(
      {all: true},
      ({channel, controllerNumber, messageType, key}) => {
        Object.entries(controls).forEach(([id, value]) => {
          if (
            value.channel === channel &&
            value.controllerNumber === controllerNumber &&
            value.messageType === messageType &&
            value.key === key
          ) {
            setSelectedComponent({id, ...value});
          }
        });
      },
    );
  }, [midi, selectedComponent, setSelectedComponent]);

  return (
    <>
      <Xtouchmini
        onClick={e =>
          setSelectedComponent({id: e.target.id, ...controls[e.target.id]})
        }
      />
      <small>Be sure to enable MC mode</small>
    </>
  );
};

export default XTouchMini;
