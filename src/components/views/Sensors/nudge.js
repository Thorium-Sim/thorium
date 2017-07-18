import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Input } from 'reactstrap';
import gql from 'graphql-tag';

export default class Nudge extends Component {
  state = {
    nudge: localStorage.getItem('thorium-core-sensors-nudge')
  };
  nudgeContacts = ({ x, y }) => {
    const { nudge } = this.state;
    const { speed, client, sensor } = this.props;
    const mutation = gql`
      mutation NudgeContacts(
        $id: ID!
        $amount: CoordinatesInput!
        $speed: Float!
      ) {
        nudgeSensorContacts(id: $id, amount: $amount, speed: $speed)
      }
    `;
    const variables = {
      id: sensor,
      amount: {
        x: x * 0.01 * nudge,
        y: y * 0.01 * nudge,
        z: 0
      },
      speed
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
              'thorium-core-sensors-nudge',
              evt.target.value
            );
          }}
          defaultValue={nudge}>
          <option value="100">100</option>
          <option value="85">85</option>
          <option value="75">75</option>
          <option value="60">60</option>
          <option value="50">50</option>
          <option value="40">40</option>
          <option value="30">30</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </Input>
        <div className="buttons">
          <FontAwesome
            onClick={() => this.nudgeContacts({ x: 0, y: -1 })}
            className="up"
            name="arrow-up"
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
