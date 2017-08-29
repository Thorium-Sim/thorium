import React from "react";
import { Button } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Input, FormGroup, Label } from "reactstrap";

const ops = {
  addSignal: gql`
    mutation AddCommSignal($id: ID!, $signal: CommSignalInput!) {
      commAddSignal(id: $id, commSignalInput: $signal)
    }
  `,
  removeSignal: gql`
    mutation RemoveCommSignal($id: ID!, $signalId: ID!) {
      commRemoveSignal(id: $id, signalId: $signalId)
    }
  `,
  updateSignal: gql`
    mutation CommSignalUpdate($id: ID!, $signal: CommSignalInput!) {
      commUpdateSignal(id: $id, commSignalInput: $signal)
    }
  `
};

const ShortRangeComm = ({ data, client, simulatorId, type }) => {
  const defaultSignals = (which, { id, signals }) => {
    // Remove all of the signals first
    signals.forEach(s => removeSignal(id, s.id));
    // Add the new signals
    const defaultSignals = {
      trek: [
        {
          image: "Romulan",
          name: "Romulan",
          color: "#00ff00",
          range: { upper: 1, lower: 0.85 }
        },
        {
          image: "Cardassian",
          name: "Cardassian",
          color: "#ffaa00",
          range: { upper: 0.85, lower: 0.75 }
        },
        {
          image: "General Use",
          name: "General Use",
          color: "#ffffff",
          range: { upper: 0.75, lower: 0.58 }
        },
        {
          image: "Starfleet",
          name: "Starfleet",
          color: "#0088ff",
          range: { upper: 0.58, lower: 0.4 }
        },
        {
          image: "Klingon",
          name: "Klingon",
          color: "#ff0000",
          range: { upper: 0.4, lower: 0.3 }
        },
        {
          image: "Orion",
          name: "Orion",
          color: "#888888",
          range: { upper: 0.3, lower: 0.22 }
        },
        {
          image: "Ferengi",
          name: "Ferengi",
          color: "#ffff00",
          range: { upper: 0.22, lower: 0 }
        }
      ]
    };
    defaultSignals[which].forEach(s => addSignal({ id }, s));
  };
  const addSignal = ({ id }, signal = {}) => {
    const variables = {
      id,
      signal
    };
    client.mutate({
      mutation: ops.addSignal,
      variables,
      refetchQueries: ["ShortRangeComm"]
    });
  };
  const removeSignal = (id, signalId) => {
    const variables = {
      id,
      signalId
    };
    client.mutate({
      mutation: ops.removeSignal,
      variables,
      refetchQueries: ["ShortRangeComm"]
    });
  };
  const signalUpdate = (which, { id: signalId, range }, { id }, value) => {
    const signal = { id: signalId };
    if (which === "range-lower") {
      signal.range = { lower: parseFloat(value), upper: range.upper };
    } else if (which === "range-upper") {
      signal.range = { lower: range.lower, upper: parseFloat(value) };
    } else {
      signal[which] = value;
    }
    const variables = {
      id,
      signal
    };
    client.mutate({
      mutation: ops.updateSignal,
      variables,
      refetchQueries: ["ShortRangeComm"]
    });
  };
  if (data.loading) return null;
  const { shortRangeComm, assetFolders } = data;
  const [folders] = assetFolders;
  const { containers } = folders;
  return (
    <div className="shortRangeComm scroll">
      {shortRangeComm.map(e =>
        <div key={e.id}>
          <GenericSystemConfig
            client={client}
            simulatorId={simulatorId}
            type={type}
            data={{ systems: [e] }}
          >
            <Button
              size="sm"
              color="info"
              onClick={() => defaultSignals("trek", e)}
            >
              Default Star Trek
            </Button>
            {e.signals.map(s =>
              <div key={s.id} style={{ border: "solid 1px rgba(0,0,0,0.25)" }}>
                <FormGroup>
                  <Label
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    Name
                    <Input
                      type="text"
                      value={s.name}
                      onChange={evt => {
                        signalUpdate("name", s, e, evt.target.value);
                      }}
                    />
                  </Label>
                  <Label
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    Color
                    <Input
                      style={{
                        height: "30px",
                        paddingTop: "0px",
                        paddingBottom: "0px"
                      }}
                      type="color"
                      value={s.color}
                      onChange={evt => {
                        signalUpdate("color", s, e, evt.target.value);
                      }}
                    />
                  </Label>
                  <Label
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    Image
                    <Input
                      type="select"
                      value={s.image}
                      onChange={evt =>
                        signalUpdate("image", s, e, evt.target.value)}
                    >
                      {containers.map(i =>
                        <option key={i.id} value={i.name}>
                          {i.name}
                        </option>
                      )}
                    </Input>
                  </Label>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => removeSignal(e.id, s.id)}
                  >
                    Remove Signal
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    Range Lower
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={s.range.lower * 100}
                      onChange={evt => {
                        signalUpdate(
                          "range-lower",
                          s,
                          e,
                          evt.target.value / 100
                        );
                      }}
                    />
                    {s.range.lower}
                  </Label>
                  <Label
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    Range Upper
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={s.range.upper * 100}
                      onChange={evt => {
                        signalUpdate(
                          "range-upper",
                          s,
                          e,
                          evt.target.value / 100
                        );
                      }}
                    />
                    {s.range.upper}
                  </Label>
                </FormGroup>
              </div>
            )}
            <Button size="sm" color="success" onClick={() => addSignal(e)}>
              Add Signal
            </Button>
          </GenericSystemConfig>
        </div>
      )}
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query ShortRangeComm($id: ID!) {
    shortRangeComm(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      signals {
        id
        name
        image
        range {
          lower
          upper
        }
        color
      }
    }
    assetFolders(names: ["Comm Images"]) {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulatorId
    }
  })
})(ShortRangeComm);
