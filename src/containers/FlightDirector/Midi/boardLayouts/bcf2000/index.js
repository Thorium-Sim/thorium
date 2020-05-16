import React from "react";
import {ReactComponent as Bcf} from "./bcf2000.svg";
import {useMidi} from "helpers/midi";
import styled from "styled-components";

// const MessageTester = ({setSelectedComponent, selectedComponent}) => {
//   const [messageValues, setMessageValues] = React.useState({});

//   const midi = useMidi();
//   React.useEffect(() => {
//     return midi.addSubscriber(
//       {all: true},
//       ({
//         channel,
//         messageType,
//         key,
//         velocity,
//         controllerNumber,
//         controllerValue,
//         channelModeMessage,
//         pressure,
//         pitchBend,
//         program,
//         ...message
//       }) => {
//         setMessageValues({
//           channel,
//           messageType,
//           key,
//           velocity,
//           controllerNumber,
//           controllerValue,
//           channelModeMessage,
//           pressure,
//           pitchBend,
//           program,
//         });
//       },
//     );
//   }, [midi]);
//   return (
//     <div>
//       {Object.entries(messageValues).map(([key, value]) => {
//         if (value || value === 0)
//           return (
//             <div>
//               <label>{capitalCase(key)}</label>
//               <Input value={value} readOnly />
//             </div>
//           );
//         return null;
//       })}
//     </div>
//   );
// };

const BCFWrapper = styled.div`
  #${({selected}) => selected} {
    fill: tomato;
    stroke: red;
  }
`;
export const bcf2000Controls = {
  rotor1: [
    {encoder: 1, channel: 0, controllerNumber: 1, messageType: "controlchange"},
    {encoder: 2, channel: 0, controllerNumber: 9, messageType: "controlchange"},
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 17,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 25,
      messageType: "controlchange",
    },
  ],
  rotor2: [
    {encoder: 1, channel: 0, controllerNumber: 2, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 10,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 18,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 26,
      messageType: "controlchange",
    },
  ],
  rotor3: [
    {encoder: 1, channel: 0, controllerNumber: 3, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 11,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 19,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 27,
      messageType: "controlchange",
    },
  ],
  rotor4: [
    {encoder: 1, channel: 0, controllerNumber: 4, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 12,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 20,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 28,
      messageType: "controlchange",
    },
  ],
  rotor5: [
    {encoder: 1, channel: 0, controllerNumber: 5, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 13,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 21,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 29,
      messageType: "controlchange",
    },
  ],
  rotor6: [
    {encoder: 1, channel: 0, controllerNumber: 6, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 14,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 22,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 30,
      messageType: "controlchange",
    },
  ],
  rotor7: [
    {encoder: 1, channel: 0, controllerNumber: 7, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 15,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 23,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 31,
      messageType: "controlchange",
    },
  ],
  rotor8: [
    {encoder: 1, channel: 0, controllerNumber: 8, messageType: "controlchange"},
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 16,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 24,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 32,
      messageType: "controlchange",
    },
  ],
  button21: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 33,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 41,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 49,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 57,
      messageType: "controlchange",
    },
  ],
  button22: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 34,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 42,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 50,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 58,
      messageType: "controlchange",
    },
  ],
  button23: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 35,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 43,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 51,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 59,
      messageType: "controlchange",
    },
  ],
  button24: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 36,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 44,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 52,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 60,
      messageType: "controlchange",
    },
  ],
  button25: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 37,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 45,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 53,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 61,
      messageType: "controlchange",
    },
  ],
  button26: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 38,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 46,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 54,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 62,
      messageType: "controlchange",
    },
  ],
  button27: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 39,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 47,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 55,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 63,
      messageType: "controlchange",
    },
  ],
  button28: [
    {
      encoder: 1,
      channel: 0,
      controllerNumber: 40,
      messageType: "controlchange",
    },
    {
      encoder: 2,
      channel: 0,
      controllerNumber: 48,
      messageType: "controlchange",
    },
    {
      encoder: 3,
      channel: 0,
      controllerNumber: 56,
      messageType: "controlchange",
    },
    {
      encoder: 4,
      channel: 0,
      controllerNumber: 64,
      messageType: "controlchange",
    },
  ],

  button1: {channel: 0, controllerNumber: 65, messageType: "controlchange"},
  button2: {channel: 0, controllerNumber: 66, messageType: "controlchange"},
  button3: {channel: 0, controllerNumber: 67, messageType: "controlchange"},
  button4: {channel: 0, controllerNumber: 68, messageType: "controlchange"},
  button5: {channel: 0, controllerNumber: 69, messageType: "controlchange"},
  button6: {channel: 0, controllerNumber: 70, messageType: "controlchange"},
  button7: {channel: 0, controllerNumber: 71, messageType: "controlchange"},
  button8: {channel: 0, controllerNumber: 72, messageType: "controlchange"},
  button9: {channel: 0, controllerNumber: 73, messageType: "controlchange"},
  button10: {channel: 0, controllerNumber: 74, messageType: "controlchange"},
  button11: {channel: 0, controllerNumber: 75, messageType: "controlchange"},
  button12: {channel: 0, controllerNumber: 76, messageType: "controlchange"},
  button13: {channel: 0, controllerNumber: 77, messageType: "controlchange"},
  button14: {channel: 0, controllerNumber: 78, messageType: "controlchange"},
  button15: {channel: 0, controllerNumber: 79, messageType: "controlchange"},
  button16: {channel: 0, controllerNumber: 80, messageType: "controlchange"},
  button17: {channel: 0, controllerNumber: 89, messageType: "controlchange"},
  button18: {channel: 0, controllerNumber: 90, messageType: "controlchange"},
  button19: {channel: 0, controllerNumber: 91, messageType: "controlchange"},
  button20: {channel: 0, controllerNumber: 92, messageType: "controlchange"},

  slider1: {channel: 0, controllerNumber: 81, messageType: "controlchange"},
  slider2: {channel: 0, controllerNumber: 82, messageType: "controlchange"},
  slider3: {channel: 0, controllerNumber: 83, messageType: "controlchange"},
  slider4: {channel: 0, controllerNumber: 84, messageType: "controlchange"},
  slider5: {channel: 0, controllerNumber: 85, messageType: "controlchange"},
  slider6: {channel: 0, controllerNumber: 86, messageType: "controlchange"},
  slider7: {channel: 0, controllerNumber: 87, messageType: "controlchange"},
  slider8: {channel: 0, controllerNumber: 88, messageType: "controlchange"},
};

const BCF = ({setSelectedComponent, selectedComponent}) => {
  const [encoder, setEncoder] = React.useState(1);

  const midi = useMidi();
  React.useEffect(() => {
    return midi.addSubscriber(
      {all: true},
      ({channel, controllerNumber, messageType}) => {
        Object.entries(bcf2000Controls).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            const foundValue = value.find(
              v =>
                v.channel === channel &&
                v.controllerNumber === controllerNumber &&
                v.messageType === messageType,
            );
            if (foundValue) {
              setEncoder(foundValue.encoder);
              setSelectedComponent({id: key, ...foundValue});
            }
          } else {
            if (
              value.channel === channel &&
              value.controllerNumber === controllerNumber &&
              value.messageType === messageType
            ) {
              setSelectedComponent({id: key, ...value});
            }
          }
        });
      },
    );
  }, [midi, selectedComponent, setSelectedComponent]);
  return (
    <BCFWrapper selected={`encoder${encoder}`}>
      <Bcf
        onClick={e => {
          if (e.target.id.includes("encoder")) {
            setEncoder(+e.target.id.replace("encoder", ""));
            return;
          }
          let component = bcf2000Controls[e.target.id];
          if (Array.isArray(component)) {
            component = component.find(e => e.encoder === encoder);
          }
          setSelectedComponent({id: e.target.id, ...component});
        }}
      />
      <small>Only use the BCF2000 in Preset 1.</small>
    </BCFWrapper>
  );
};

export default BCF;
