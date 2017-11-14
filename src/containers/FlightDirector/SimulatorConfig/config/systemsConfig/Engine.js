import React from "react";
import { Button } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Input, FormGroup, Label } from "reactstrap";

// Write out the warp equation in km/s
function warpSpeed(n) {
  return Math.round(
    (Math.pow(Math.E, n) / (10 - n) + Math.pow(1, 4) * Math.log(10 - n)) *
      299800
  ); //c;
}
function impulseSpeed(n) {
  // Assume full impulse is 75,000 km/s
  return 75000 * n;
}
const ops = {
  addSystem: gql`
    mutation AddSystemToSimulator($id: ID!) {
      addSystemToSimulator(simulatorId: $id, className: "Engine", params: "{}")
    }
  `,
  removeSystem: gql`
    mutation RemoveSystem($id: ID) {
      removeSystemFromSimulator(systemId: $id)
    }
  `,
  updateSpeeds: gql`
    mutation SetSpeeds($id: ID!, $speeds: [SpeedInput]!) {
      setEngineSpeeds(id: $id, speeds: $speeds)
    }
  `,
  updateSpeedFactor: gql`
    mutation UpdateSpeedFactor($id: ID!, $speedFactor: Float!) {
      setEngineSpeedFactor(id: $id, speedFactor: $speedFactor)
    }
  `,
  updateUseAccelerate: gql`
    mutation UpdateUseAccelerate($id: ID!, $useAccelerate: Boolean!) {
      setEngineUseAcceleration(id: $id, useAcceleration: $useAccelerate)
    }
  `
};

const Engine = ({ data, client, simulatorId, type }) => {
  const performSpeedUpdate = (id, speeds) => {
    const mutation = ops.updateSpeeds;
    const variables = {
      id,
      speeds
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Engines"]
    });
  };
  const addEngine = () => {
    const mutation = ops.addSystem;
    const variables = {
      id: simulatorId
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Engines"]
    });
  };
  const removeEngine = id => {
    const mutation = ops.removeSystem;
    const variables = {
      id
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Engines"]
    });
  };
  const removeSpeed = ({ id, speeds }, index) => {
    const newSpeeds = speeds
      .map(({ text, number }) => ({ text, number }))
      .filter((s, i) => i !== index);
    performSpeedUpdate(id, newSpeeds);
  };
  const addSpeed = ({ id, speeds }) => {
    const newSpeeds = speeds
      .map(({ text, number }) => ({ text, number }))
      .concat({ text: "", number: 1 });
    performSpeedUpdate(id, newSpeeds);
  };
  const updateSpeed = ({ id, speeds }, i, which, value) => {
    const newSpeeds = speeds.map(({ text, number }, index) => {
      const obj = { text, number };
      if (index === i) obj[which] = value;
      return obj;
    });
    performSpeedUpdate(id, newSpeeds);
  };
  const defaultSpeeds = (which, { id }) => {
    const deSpeeds = {
      warp: [
        { text: "Warp 1", number: 1, velocity: warpSpeed(1) },
        { text: "Warp 2", number: 2, velocity: warpSpeed(2) },
        { text: "Warp 3", number: 3, velocity: warpSpeed(3) },
        { text: "Warp 4", number: 4, velocity: warpSpeed(4) },
        { text: "Warp 5", number: 5, velocity: warpSpeed(5) },
        { text: "Warp 6", number: 6, velocity: warpSpeed(6) },
        { text: "Warp 7", number: 7, velocity: warpSpeed(7) },
        { text: "Warp 8", number: 8, velocity: warpSpeed(8) },
        { text: "Warp 9", number: 9, velocity: warpSpeed(9) },
        { text: "Destructive Warp", number: 9.54, velocity: warpSpeed(9.54) }
      ],
      impulse: [
        { text: "1/4 Impulse", number: 0.25, velocity: impulseSpeed(0.25) },
        { text: "1/2 Impulse", number: 0.5, velocity: impulseSpeed(0.5) },
        { text: "3/4 Impulse", number: 0.75, velocity: impulseSpeed(0.75) },
        { text: "Full Impulse", number: 1, velocity: impulseSpeed(1) },
        {
          text: "Destructive Impulse",
          number: 1.25,
          velocity: impulseSpeed(1.25)
        }
      ]
    };
    performSpeedUpdate(id, deSpeeds[which]);
  };
  const updateSpeedFactor = (evt, engine) => {
    const mutation = ops.updateSpeedFactor;
    const variables = {
      id: engine.id,
      speedFactor: evt.target.value
    };
    client.mutate({ mutation, variables, refetchQueries: ["Engines"] });
  };
  const updateUseAccelerate = (evt, engine) => {
    const mutation = ops.updateUseAccelerate;
    const variables = {
      id: engine.id,
      useAccelerate: evt.target.checked
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Engines"]
    });
  };
  if (data.loading) return null;
  const { engines } = data;
  return (
    <div className="engine scroll">
      {engines.map(e => (
        <div key={e.id}>
          <GenericSystemConfig
            client={client}
            simulatorId={simulatorId}
            type={type}
            data={{ systems: [e] }}
          >
            <FormGroup>
              <Label style={{ display: "inline-block" }}>
                Speed Factor
                <Input
                  type="text"
                  value={e.speedFactor || ""}
                  onChange={evt => updateSpeedFactor(evt, e)}
                />
              </Label>
              <Label style={{ display: "block" }}>
                Use Acceleration
                <Input
                  style={{ position: "relative" }}
                  type="checkbox"
                  checked={e.useAcceleration}
                  onChange={evt => updateUseAccelerate(evt, e)}
                />
              </Label>
            </FormGroup>
            <Button
              size="sm"
              color="info"
              onClick={() => defaultSpeeds("warp", e)}
            >
              Default Warp
            </Button>
            <Button
              size="sm"
              color="info"
              onClick={() => defaultSpeeds("impulse", e)}
            >
              Default Impulse
            </Button>
            {e.speeds.map((speed, index) => {
              return (
                <div key={`${e.id}-speed-${index}`}>
                  <FormGroup className="speed">
                    <Label style={{ display: "inline-block" }}>
                      Speed Text
                      <Input
                        type="text"
                        value={speed.text}
                        onChange={evt => {
                          updateSpeed(e, index, "text", evt.target.value);
                        }}
                      />
                    </Label>
                    <Label style={{ display: "inline-block" }}>
                      Speed Number
                      <Input
                        type="number"
                        value={speed.number}
                        onChange={evt => {
                          updateSpeed(e, index, "number", evt.target.value);
                        }}
                      />
                    </Label>
                    <Label style={{ display: "inline-block" }}>
                      Velocity (km/s)
                      <Input
                        type="number"
                        value={speed.velocity}
                        onChange={evt => {
                          updateSpeed(e, index, "velocity", evt.target.value);
                        }}
                      />
                    </Label>
                  </FormGroup>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => removeSpeed(e, index)}
                  >
                    Remove Speed
                  </Button>
                </div>
              );
            })}
            <Button color="info" size="sm" onClick={() => addSpeed(e)}>
              Add Speed
            </Button>
            <div>
              <Button
                color="danger"
                onClick={() => {
                  removeEngine(e.id);
                }}
              >
                Remove Engine
              </Button>
            </div>
          </GenericSystemConfig>
        </div>
      ))}
      <Button color="success" onClick={addEngine}>
        Add Engine
      </Button>
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query Engines($id: ID) {
    engines(simulatorId: $id) {
      id
      name
      displayName
      type
      useAcceleration
      speedFactor
      power {
        power
        powerLevels
      }
      speeds {
        text
        number
        velocity
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
})(Engine);
