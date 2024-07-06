import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import {FormGroup, Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";

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

const MOTU_CHANNEL_QUERY = gql`
  query MotuQuery($id: ID!, $channelId: ID!) {
    motuChannel(id: $id, channelId: $channelId) {
      id
      name
      fader
    }
  }
`;
const MOTU_CHANNEL_SUB = gql`
  subscription MotuSub($id: ID!, $channelId: ID!) {
    motuChannel(id: $id, channelId: $channelId) {
      id
      name
      fader
    }
  }
`;

const SET_MOTU = gql`
  mutation SetMotu($id: ID!, $channelId: ID!, $fader: Float!) {
    motuUpdateChannel(id: $id, channelId: $channelId, channel: {fader: $fader})
  }
`;
const MotuFader = ({value, setValue, config}) => {
  const valueSet = React.useRef(false);
  const {data} = useQueryAndSubscription(
    {
      query: MOTU_CHANNEL_QUERY,
      variables: {id: config.id, channelId: config.channelId},
    },
    {
      query: MOTU_CHANNEL_SUB,
      variables: {id: config.id, channelId: config.channelId},
    },
  );
  const fader = data?.motuChannel?.fader;

  const [updateFader] = useMutation(SET_MOTU, {
    variables: {id: config.id, channelId: config.channelId, fader: value},
  });
  // Update the parent component
  React.useEffect(() => {
    valueSet.current = true;
    setTimeout(() => {
      valueSet.current = false;
    }, 1000 / 10);
    setValue(fader);
  }, [fader, setValue]);

  // Send updates when the value changes.
  React.useEffect(() => {
    if (value !== fader && valueSet.current === false) {
      updateFader();
    }
  }, [fader, updateFader, value]);
  return null;
};

MotuFader.actionModes = ["valueAssignment"];
MotuFader.config = function ConfigMotuFader({setComponentConfig, config}) {
  const {loading, data} = useQuery(MOTU_CHANNELS);
  if (loading || !data) return "Loading...";
  const motu = data.motus.find(m => m.id === config.id);
  return (
    <FormGroup className="macro-template">
      <div>
        <Label>
          MOTU Device
          <div>
            <select
              value={config.id || "nothing"}
              onChange={e =>
                setComponentConfig({...config, id: e.target.value})
              }
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
              value={config.channelId || "nothing"}
              onChange={e =>
                setComponentConfig({...config, channelId: e.target.value})
              }
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
    </FormGroup>
  );
};

export default MotuFader;
