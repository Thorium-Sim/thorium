import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {useQuery} from "react-apollo";

const MOTU_CHANNELS = gql`
  query MotuQuery {
    motus {
      id
      address
      offline
      inputs {
        id
        name
      }
      outputs {
        id
        name
      }
    }
  }
`;
const MotuUpdateChannel = ({updateArgs, args}) => {
  const {loading, data} = useQuery(MOTU_CHANNELS);
  if (loading || !data) return <p>Loading...</p>;
  const motu = data.motus.find(m => m.id === args.id);
  return (
    <FormGroup className="macro-template">
      <div>
        <Label>
          MOTU Device
          <div>
            <select
              value={args.id || "nothing"}
              onChange={e => updateArgs("id", e.target.value)}
            >
              <option value="nothing" disabled>
                Choose a MOTU Device
              </option>
              {data.motus.map(m => (
                <option key={m.id} value={m.id}>
                  {m.id}
                </option>
              ))}
            </select>
          </div>
        </Label>
      </div>
      <div>
        <Label>
          Channel
          <div>
            <select
              value={args.channelId || "nothing"}
              onChange={e => updateArgs("channelId", e.target.value)}
            >
              <option value="nothing" disabled>
                Choose a Channel
              </option>
              <optgroup label="Inputs">
                {motu?.inputs.map(({id, name}) => (
                  <option value={id}>{name}</option>
                ))}
              </optgroup>
              <optgroup label="Outputs">
                {motu?.outputs.map(({id, name}) => (
                  <option value={id}>{name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </Label>
      </div>
      <div>
        <Label>
          Fader: {args.channel?.fader}{" "}
          <Input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={args.channel?.fader}
            onChange={e =>
              updateArgs("channel", {
                ...args.channel,
                fader: parseFloat(e.target.value),
              })
            }
          ></Input>
        </Label>
      </div>
      <div>
        <small>
          Fader values are logarithmic. On the soundboard, 4 is max, 1 is 0,
          less than 1 is negative values.
        </small>
      </div>
      <div>
        <Label>
          Mute:{" "}
          <Input
            type="checkbox"
            checked={args.channel?.mute}
            onChange={e =>
              updateArgs("channel", {
                ...args.channel,
                mute: e.target.checked ? 1 : 0,
              })
            }
          ></Input>
        </Label>
      </div>
    </FormGroup>
  );
};
export const MotuSetSendMute = ({updateArgs, args}) => {
  const {loading, data} = useQuery(MOTU_CHANNELS);
  if (loading || !data) return <p>Loading...</p>;
  const motu = data.motus.find(m => m.id === args.id);

  return (
    <FormGroup className="macro-template">
      <div>
        <Label>
          MOTU Device
          <div>
            <select
              value={args.id || "nothing"}
              onChange={e => updateArgs("id", e.target.value)}
            >
              <option value="nothing" disabled>
                Choose a MOTU Device
              </option>
              {data.motus.map(m => (
                <option key={m.id} value={m.id}>
                  {m.id}
                </option>
              ))}
            </select>
          </div>
        </Label>
      </div>
      <div>
        <Label>
          Input Channel
          <div>
            <select
              value={args.inputId || "nothing"}
              onChange={e => updateArgs("inputId", e.target.value)}
            >
              <option value="nothing" disabled>
                Choose an Input Channel
              </option>
              {motu?.inputs.map(({id, name}) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </div>
        </Label>
      </div>
      <div>
        <Label>
          Output Channel
          <div>
            <select
              value={args.outputId || "nothing"}
              onChange={e => updateArgs("outputId", e.target.value)}
            >
              <option value="nothing" disabled>
                Choose an Output Channel
              </option>
              {motu?.outputs.map(({id, name}) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </div>
        </Label>
      </div>
      <div>
        <Label>
          Mute:{" "}
          <Input
            type="checkbox"
            checked={args.channel?.mute}
            onChange={e => updateArgs("mute", e.target.checked)}
          ></Input>
        </Label>
      </div>
    </FormGroup>
  );
};

export const motuUpdateChannel = MotuUpdateChannel;
export const motuSetSendMute = MotuSetSendMute;
