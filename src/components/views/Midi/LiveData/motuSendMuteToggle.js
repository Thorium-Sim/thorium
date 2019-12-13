import React from "react";
import {FormGroup, Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {useQuery, useMutation} from "react-apollo";
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

const MOTU_SEND_QUERY = gql`
  query MotuQuery($id: ID!, $inputId: ID!, $outputId: ID!) {
    motuSend(id: $id, inputId: $inputId, outputId: $outputId) {
      mute
    }
  }
`;
const MOTU_SEND_SUB = gql`
  subscription MotuSub($id: ID!, $inputId: ID!, $outputId: ID!) {
    motuSend(id: $id, inputId: $inputId, outputId: $outputId) {
      mute
    }
  }
`;

const SET_MOTU = gql`
  mutation SetMotuSend(
    $id: ID!
    $inputId: ID!
    $outputId: ID!
    $mute: Boolean!
  ) {
    motuSetSendMute(
      id: $id
      inputId: $inputId
      outputId: $outputId
      mute: $mute
    )
  }
`;
const MotuSendMuteToggle = ({value, setValue, config}) => {
  const valueSet = React.useRef(false);
  const {data} = useQueryAndSubscription(
    {
      query: MOTU_SEND_QUERY,
      variables: {
        id: config.id,
        inputId: config.inputId,
        outputId: config.outputId,
      },
    },
    {
      query: MOTU_SEND_SUB,
      variables: {
        id: config.id,
        inputId: config.inputId,
        outputId: config.outputId,
      },
    },
  );
  const mute = data?.motuSend?.mute;

  const [updateMute] = useMutation(SET_MOTU, {
    variables: {
      id: config.id,
      inputId: config.inputId,
      outputId: config.outputId,
      mute: parseInt(value, 10) === 0 ? false : true,
    },
  });
  // Update the parent component
  React.useEffect(() => {
    valueSet.current = true;
    setTimeout(() => {
      valueSet.current = false;
    }, 1000 / 10);
    setValue(mute ? 1 : 0);
  }, [mute, setValue]);

  // Send updates when the value changes.
  React.useEffect(() => {
    if (valueSet.current === false) {
      updateMute();
    }
  }, [mute, updateMute, value]);
  return null;
};

MotuSendMuteToggle.actionModes = ["toggle"];
MotuSendMuteToggle.config = function ConfigMotuFader({
  setComponentConfig,
  config,
}) {
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
          Input Channel
          <div>
            <select
              value={config.inputId || "nothing"}
              onChange={e =>
                setComponentConfig({...config, inputId: e.target.value})
              }
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
              value={config.outputId || "nothing"}
              onChange={e =>
                setComponentConfig({...config, outputId: e.target.value})
              }
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
    </FormGroup>
  );
};

export default MotuSendMuteToggle;
