import React from "react";
import uuid from "uuid";
import MIDIMessage from "midimessage";

function getMidiAccess(sysex = false) {
  return typeof window !== "undefined" &&
    window.navigator &&
    typeof window.navigator.requestMIDIAccess === "function"
    ? window.navigator.requestMIDIAccess({sysex}).then(access => access)
    : new Promise((resolve, reject) => reject(new Error("MIDI Not Available")));
}

const throttle = (func, limit) => {
  let inThrottle;
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const MidiContext = React.createContext();

// Message Types
const messageTypeValues = {
  noteoff: 0x80,
  noteon: 0x90,
  keypressure: 0xa0, // Polyphonic Key Pressure (Aftertouch)
  controlchange: 0xb0,
  programchange: 0xc0,
  channelpressure: 0xd0, // Channel Pressure (After-touch)
  pitchbendchange: 0xe0,
};

// Channel mode message values
// [
//   'allsoundoff', // All Sound Off.
//   'resetallcontrollers', // Reset All Controllers.
//   'localcontroloff', // Local Control Off.
//   'localcontrolon', // Local Control On.
//   'allnotesoff', // All Notes Off.
//   'omnimodeoff', // Omni Mode Off.
//   'omnimodeon', // Omni Mode On.
//   'monomodeon', // Mono Mode On (Poly Off).
//   'polymodeon' // Poly Mode On (Mono Off)
//   ]

// Relevant values from message
// channel: Number (0-127) - MIDI Channel Number.
// messageType: String - Type of message. Possible values defined below.
// key: Number (0-127) - The key (note) number. Defined on -noteon,noteoff,keypressure messages.
// velocity: Number (0-127) - Velocity. Defined on noteon,noteoff messages.
// controllerNumber: Number (0-127) - Controller Number. Controller numbers 120-127 are reserved as "Channel Mode Messages".
// controllerValue: Number (0-127) Controller Value. Has various meanings based on controllerNumber.
// channelModeMessage: String - Channel Mode Message. Specific messages for Channel Modes based on controllerNumber. Possible values defined below.
// pressure: Number (0-127) - Pressure value.
// pitchBend: Number (0-16383) - Pitch Bend value. Center (no pitch change) is 8192.

function transformMidiMessage(message) {
  const {messageType, velocity, pitchBend, controllerValue} = message;
  switch (messageType) {
    case "controlchange":
      return {
        ...message,
        value: controllerValue,
      };
    case "pitchbendchange":
      return {...message, value: pitchBend / 32512};
    case "noteon":
      return {...message, value: Math.min(1, velocity)};
    default:
      return message;
  }
}

let deviceNames = [];
export const MidiProvider = ({
  sysex = true,
  name,
  inputName = name,
  outputName = name,
  debug,
  ...props
}) => {
  const [midiIO, setMidiIO] = React.useState({inputs: [], outputs: []});
  const subscribers = React.useRef({});

  const sysexRef = React.useRef(sysex);
  React.useEffect(() => {
    function handleMidiMessage(e) {
      const message = MIDIMessage(e);
      const {name: targetName} = e.target;
      if (debug) {
        const {
          channel,
          messageType,
          key,
          velocity,
          controllerNumber,
          controllerValue,
          channelModeMessage,
          pressure,
          pitchBend,
        } = message;
        console.info({
          targetName,
          channel,
          messageType,
          key,
          velocity,
          controllerNumber,
          controllerValue,
          channelModeMessage,
          pressure,
          pitchBend,
        });
      }
      Object.values(subscribers.current).forEach(({address, sub}) => {
        if (
          address.all ||
          ((targetName === inputName || targetName === address.name) &&
            address.channel === message.channel &&
            address.messageType === message.messageType &&
            address.key === message.key &&
            address.controllerNumber === message.controllerNumber)
        ) {
          sub(transformMidiMessage(message));
        }
      });
    }

    function mapDevices(io, which) {
      const devices = [];
      io.forEach(i => {
        if (!deviceNames.includes(i.name)) {
          console.info("Found device", i.name, which);
          deviceNames.push(i.name);
        }
        i.onmidimessage = throttle(handleMidiMessage, 1000 / 10);
        devices.push(i);
      });
      return devices;
    }

    function mapMidiIO(access) {
      const outputs = mapDevices(access.outputs, "output");
      window.output = outputs[0];
      return {
        inputs: mapDevices(access.inputs, "input"),
        outputs: mapDevices(access.outputs, "output"),
      };
    }

    getMidiAccess(sysexRef.current).then(access => {
      setMidiIO(mapMidiIO(access));
      access.onstatechange = () => {
        setMidiIO(mapMidiIO(access));
      };
    });
  }, [inputName, debug]);

  const value = React.useMemo(() => {
    const addSubscriber = (
      {all, channel, messageType, key, controllerNumber, name},
      sub,
    ) => {
      const id = uuid.v4();
      subscribers.current[id] = {
        address: {all, channel, messageType, key, controllerNumber, name},
        sub,
      };
      return () => {
        delete subscribers.current[id];
      };
    };
    const sendOutput = ({
      channel,
      messageType,
      key,
      controllerNumber,
      name: propName,
      value,
    }) => {
      const output = midiIO.outputs.find(
        o => o.name === propName || o.name === outputName,
      );
      if (!output) return;
      const command = messageTypeValues[messageType];
      const note = key || controllerNumber;
      if (!command || !note) return;
      if (!value && value !== 0) return;
      if (value > 127) return;
      output.send([command, note, value]);
    };
    return {...midiIO, addSubscriber, sendOutput};
  }, [midiIO, outputName]);
  return <MidiContext.Provider {...props} value={value} />;
};

export const useMidi = () => {
  return React.useContext(MidiContext);
};
