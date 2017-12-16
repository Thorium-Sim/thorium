import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import { Input } from "reactstrap";
import gql from "graphql-tag";

export default class Nudge extends Component {
  state = {
    nudge: localStorage.getItem("thorium-core-sensors-nudge") || 5
  };
  nudgeContacts = ({ x = 0, y = 0, yaw = 0 }) => {
    const { nudge } = this.state;
    const { speed, client, sensor } = this.props;
    const mutation = gql`
      mutation NudgeContacts(
        $id: ID!
        $amount: CoordinatesInput!
        $speed: Float!
        $yaw: Float
      ) {
        nudgeSensorContacts(id: $id, amount: $amount, speed: $speed, yaw: $yaw)
      }
    `;
    const amount = yaw
      ? {}
      : {
          x: x * 0.01 * nudge,
          y: y * 0.01 * nudge,
          z: 0
        };
    const variables = {
      id: sensor,
      amount,
      speed,
      yaw: yaw * nudge
    };
    client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { nudge } = this.state;

    return (
      <div className="nudge">
        <Input
          type="select"
          onChange={evt => {
            this.setState({
              nudge: evt.target.value
            });
            localStorage.setItem(
              "thorium-core-sensors-nudge",
              evt.target.value
            );
          }}
          defaultValue={nudge}
        >
          {[100, 90, 75, 60, 50, 45, 30, 20, 15, 10, 5, 2, 1].map(n => (
            <option key={`nudge-${n}`} value={n}>
              {n}
            </option>
          ))}
        </Input>
        <div className="buttons">
          <FontAwesome
            onClick={() => this.nudgeContacts({ yaw: -1 })}
            name="rotate-left"
          />
          <FontAwesome
            onClick={() => this.nudgeContacts({ x: 0, y: -1 })}
            name="arrow-up"
          />
          <FontAwesome
            onClick={() => this.nudgeContacts({ yaw: 1 })}
            name="rotate-right"
          />
          <FontAwesome
            onClick={() => this.nudgeContacts({ x: -1, y: 0 })}
            name="arrow-left"
          />
          <FontAwesome
            onClick={() => this.nudgeContacts({ x: 0, y: 1 })}
            name="arrow-down"
          />
          <FontAwesome
            onClick={() => this.nudgeContacts({ x: 1, y: 0 })}
            name="arrow-right"
          />
        </div>
      </div>
    );
  }
}
