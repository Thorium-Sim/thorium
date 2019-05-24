import React, { Fragment } from "react";
import { Button } from "reactstrap";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import { Input, FormGroup, Label } from "reactstrap";

const ENGINE_QUERY = gql`
  query Engine($id: ID!) {
    engine(id: $id) {
      id
      speeds {
        text
        number
        velocity
        optimal
      }
      useAcceleration
      speedFactor
    }
  }
`;

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
const defaultSpeeds = {
  warp: [
    { text: "Warp 1", number: 1, velocity: warpSpeed(1) },
    { text: "Warp 2", number: 2, velocity: warpSpeed(2) },
    { text: "Warp 3", number: 3, velocity: warpSpeed(3) },
    { text: "Warp 4", number: 4, velocity: warpSpeed(4) },
    { text: "Warp 5", number: 5, velocity: warpSpeed(5) },
    { text: "Warp 6", number: 6, velocity: warpSpeed(6), optimal: true },
    { text: "Warp 7", number: 7, velocity: warpSpeed(7) },
    { text: "Warp 8", number: 8, velocity: warpSpeed(8) },
    { text: "Warp 9", number: 9, velocity: warpSpeed(9) },
    { text: "Destructive Warp", number: 9.54, velocity: warpSpeed(9.54) }
  ],
  impulse: [
    { text: "1/4 Impulse", number: 0.25, velocity: impulseSpeed(0.25) },
    { text: "1/2 Impulse", number: 0.5, velocity: impulseSpeed(0.5) },
    { text: "3/4 Impulse", number: 0.75, velocity: impulseSpeed(0.75) },
    {
      text: "Full Impulse",
      number: 1,
      velocity: impulseSpeed(1),
      optimal: true
    },
    {
      text: "Destructive Impulse",
      number: 1.25,
      velocity: impulseSpeed(1.25)
    }
  ]
};

const Speed = ({ index, speed, speeds, action, id }) => {
  return (
    <div>
      <FormGroup className="speed">
        <Label style={{ display: "inline-block" }}>
          Speed Text
          <Input
            type="text"
            value={speed.text}
            onChange={evt => {
              const newSpeeds = speeds.map(
                ({ text, number, velocity, optimal }, i) => {
                  const obj = { text, number, velocity, optimal };
                  if (index === i) obj.text = evt.target.value;
                  return obj;
                }
              );
              action({
                variables: { id, speeds: newSpeeds }
              });
            }}
          />
        </Label>
        <Label style={{ display: "inline-block" }}>
          Speed Number
          <Input
            type="number"
            value={speed.number}
            onChange={evt => {
              const newSpeeds = speeds.map(
                ({ text, number, velocity, optimal }, i) => {
                  const obj = { text, number, velocity, optimal };
                  if (index === i) obj.number = evt.target.value;
                  return obj;
                }
              );
              action({
                variables: { id, speeds: newSpeeds }
              });
            }}
          />
        </Label>
        <Label style={{ display: "inline-block" }}>
          Velocity (km/s)
          <Input
            type="number"
            value={speed.velocity}
            onChange={evt => {
              const newSpeeds = speeds.map(
                ({ text, number, velocity, optimal }, i) => {
                  const obj = { text, number, velocity, optimal };
                  if (index === i) obj.velocity = evt.target.value;
                  return obj;
                }
              );
              action({
                variables: { id, speeds: newSpeeds }
              });
            }}
          />
        </Label>

        <Label style={{ display: "inline-block" }}>
          Optimal Speed <small>(for Stealth)</small>
          <Input
            type="checkbox"
            style={{ marginLeft: "20px", position: "relative" }}
            checked={speed.optimal}
            onChange={evt => {
              const newSpeeds = speeds.map(
                ({ text, number, velocity, optimal }, i) => {
                  const obj = { text, number, velocity, optimal };
                  if (index === i) {
                    obj.optimal = evt.target.checked;
                  } else {
                    obj.optimal = false;
                  }
                  return obj;
                }
              );
              action({
                variables: { id, speeds: newSpeeds }
              });
            }}
          />
        </Label>
      </FormGroup>
      <Button
        color="warning"
        size="sm"
        onClick={() => {
          const newSpeeds = speeds
            .map(({ text, number }) => ({ text, number }))
            .filter((s, i) => i !== index);
          action({ variables: { id, speeds: newSpeeds } });
        }}
      >
        Remove Speed
      </Button>
    </div>
  );
};
const Engine = props => {
  const { id } = props;
  return (
    <Query query={ENGINE_QUERY} variables={{ id }}>
      {({ loading, data }) => {
        if (loading) return null;
        const { engine } = data;
        const { speedFactor, useAcceleration, speeds } = engine;
        return (
          <GenericSystemConfig
            {...props}
            powerRender={() => (
              <p>
                <strong>
                  <em>
                    Engines must have as many power levels as they have speeds.
                  </em>
                </strong>
              </p>
            )}
          >
            <FormGroup>
              <Label style={{ display: "inline-block" }}>
                Speed Factor
                <Mutation
                  mutation={gql`
                    mutation UpdateSpeedFactor($id: ID!, $speedFactor: Float!) {
                      setEngineSpeedFactor(id: $id, speedFactor: $speedFactor)
                    }
                  `}
                  refetchQueries={[{ query: ENGINE_QUERY, variables: { id } }]}
                >
                  {action => (
                    <Input
                      type="text"
                      value={speedFactor || ""}
                      onChange={evt =>
                        action({
                          variables: { id, speedFactor: evt.target.value }
                        })
                      }
                    />
                  )}
                </Mutation>
              </Label>
              <Label style={{ display: "block" }}>
                Use Acceleration
                <Mutation
                  mutation={gql`
                    mutation UpdateUseAccelerate(
                      $id: ID!
                      $useAccelerate: Boolean!
                    ) {
                      setEngineUseAcceleration(
                        id: $id
                        useAcceleration: $useAccelerate
                      )
                    }
                  `}
                  refetchQueries={[{ query: ENGINE_QUERY, variables: { id } }]}
                >
                  {action => (
                    <Input
                      style={{ position: "relative" }}
                      type="checkbox"
                      checked={useAcceleration}
                      onChange={evt =>
                        action({
                          variables: { id, useAccelerate: evt.target.checked }
                        })
                      }
                    />
                  )}
                </Mutation>
              </Label>
            </FormGroup>
            <Mutation
              mutation={gql`
                mutation SetSpeeds($id: ID!, $speeds: [SpeedInput]!) {
                  setEngineSpeeds(id: $id, speeds: $speeds)
                }
              `}
              refetchQueries={[{ query: ENGINE_QUERY, variables: { id } }]}
            >
              {action => (
                <Fragment>
                  <Button
                    size="sm"
                    color="info"
                    onClick={() =>
                      action({ variables: { id, speeds: defaultSpeeds.warp } })
                    }
                  >
                    Default Warp
                  </Button>
                  <Button
                    size="sm"
                    color="info"
                    onClick={() =>
                      action({
                        variables: { id, speeds: defaultSpeeds.impulse }
                      })
                    }
                  >
                    Default Impulse
                  </Button>
                  {speeds.map((speed, index) => {
                    return (
                      <Speed
                        key={`speed-${index}`}
                        index={index}
                        speed={speed}
                        speeds={speeds}
                        action={action}
                        id={id}
                      />
                    );
                  })}
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => {
                      const newSpeeds = speeds
                        .map(({ text, number }) => ({ text, number }))
                        .concat({ text: "", number: 1 });
                      action({ variables: { id, speeds: newSpeeds } });
                    }}
                  >
                    Add Speed
                  </Button>
                </Fragment>
              )}
            </Mutation>
          </GenericSystemConfig>
        );
      }}
    </Query>
  );
};

export default Engine;
