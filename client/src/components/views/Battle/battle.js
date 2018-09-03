import React, { Component } from "react";
import { Button, Input, Label } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { publish } from "../helpers/pubsub";

import "./style.scss";

const speeds = [
  { value: "1000", label: "Instant" },
  { value: "5", label: "Warp" },
  { value: "1", label: "Very Fast" },
  { value: "0.6", label: "Fast" },
  { value: "0.4", label: "Moderate" },
  { value: "0.2", label: "Slow" },
  { value: "0.05", label: "Very Slow" }
];

class BattleCore extends Component {
  updateSpeed = action => e => {
    const { sensors } = this.props;
    action({
      variables: {
        id: sensors.id,
        speed: e.target.value
      }
    });
  };
  updateHitpoints = action => e => {
    const { sensors } = this.props;
    action({
      variables: {
        id: sensors.id,
        hitpoints: e.target.value
      }
    });
  };
  render() {
    const { contacts, simulator, sensors } = this.props;
    if (!sensors) return <p>No Sensors</p>;
    return (
      <div className="battle-core">
        <div className="flex-row flex-start">
          Speed:
          <Mutation
            mutation={gql`
              mutation UpdateSpeed($id: ID!, $speed: Float!) {
                setSensorsDefaultSpeed(id: $id, speed: $speed)
              }
            `}
          >
            {action => (
              <Input
                type="select"
                name="select"
                onChange={this.updateSpeed(action)}
                defaultValue={sensors.defaultSpeed}
              >
                {speeds.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Input>
            )}
          </Mutation>
        </div>
        <div className="flex-row ">
          <span>Default</span>
          <span> Hitpoints:</span>
          <span>({sensors.defaultHitpoints})</span>
          <Mutation
            mutation={gql`
              mutation UpdateHP($id: ID!, $hitpoints: Int!) {
                setSensorsDefaultHitpoints(id: $id, hp: $hitpoints)
              }
            `}
          >
            {action => (
              <Input
                type="range"
                min="1"
                max="10"
                defaultValue={sensors.defaultHitpoints}
                onChange={this.updateHitpoints(action)}
              />
            )}
          </Mutation>
        </div>
        <div className="flex-max">
          {contacts.map(c => (
            <div key={c.id} className="flex-row">
              <img
                onMouseEnter={() =>
                  publish("battle-contact-hover", { id: c.id })
                }
                onMouseLeave={() =>
                  publish("battle-contact-leave", { id: c.id })
                }
                src={`/assets${c.icon}`}
                draggable="false"
                alt="Hostile Contact"
              />
              <span>{c.name}</span>
              <Mutation
                mutation={gql`
                  mutation FireProjectile(
                    $simulatorId: ID!
                    $contactId: ID!
                    $speed: Float!
                    $hitpoints: Int!
                  ) {
                    sensorsFireProjectile(
                      simulatorId: $simulatorId
                      contactId: $contactId
                      speed: $speed
                      hitpoints: $hitpoints
                    )
                  }
                `}
              >
                {action => (
                  <Button
                    size="sm"
                    color="warning"
                    onClick={() => {
                      action({
                        variables: {
                          simulatorId: simulator.id,
                          contactId: c.id,
                          speed: sensors.defaultSpeed,
                          hitpoints: sensors.defaultHitpoints
                        }
                      });
                    }}
                  >
                    Fire
                  </Button>
                )}
              </Mutation>
              <Label check>
                Auto-fire
                <Mutation
                  mutation={gql`
                    mutation SensorContact(
                      $simulatorId: ID!
                      $id: ID!
                      $autoFire: Boolean!
                    ) {
                      updateSensorContact(
                        simulatorId: $simulatorId
                        contact: { id: $id, autoFire: $autoFire }
                      )
                    }
                  `}
                  variables={{
                    simulatorId: simulator.id,
                    id: c.id,
                    autoFire: !c.autoFire
                  }}
                >
                  {action => (
                    <Input
                      checked={c.autoFire}
                      onChange={action}
                      style={{ margin: "0 2px" }}
                      type="checkbox"
                    />
                  )}
                </Mutation>
              </Label>
            </div>
          ))}
          <small>Hover icon to hilite sensor contact</small>
        </div>
      </div>
    );
  }
}
export default BattleCore;
