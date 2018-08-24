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
  state = { speed: "0.4", hp: 5 };
  render() {
    const { contacts, simulator } = this.props;
    const { speed, hp } = this.state;
    return (
      <div className="battle-core">
        <div className="flex-row flex-start">
          Speed:
          <Input
            type="select"
            name="select"
            onChange={e => this.setState({ speed: e.target.value })}
            defaultValue={speed}
          >
            {speeds.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Input>
        </div>
        <div className="flex-row ">
          <span>Default</span>
          <span> Hitpoints:</span>
          <span>({hp})</span>
          <Input
            type="range"
            min="1"
            max="10"
            value={hp}
            onChange={e => this.setState({ hp: e.target.value })}
          />
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
                          speed,
                          hitpoints: hp
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
                <Input style={{ margin: "0 2px" }} type="checkbox" />
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
