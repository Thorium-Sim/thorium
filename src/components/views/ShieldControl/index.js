import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import Shield1 from "./shield-1";
import Shield4 from "./shield-4";
import Shield6 from "./shield-6";
import "./style.scss";

const SHIELD_SUB = gql`
  subscription ShieldSub($simulatorId: ID) {
    shieldsUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      position
      frequency
      integrity
      simulatorId
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;
class ShieldControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: {},
      frequencyAdder: 0.1,
      frequencySpeed: 250
    };
    this.shieldSub = null;
    this.freqLoop = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.shieldSub && !nextProps.data.loading) {
      this.shieldSub = nextProps.data.subscribeToMore({
        document: SHIELD_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ shields: subscriptionData.data.shieldsUpdate })
            .toJS();
        }
      });
    }
    if (nextProps.data.shields) {
      if (nextProps.data.shields) {
        const freq = this.state.frequency;
        nextProps.data.shields.forEach(s => {
          freq[s.id] = s.frequency || 200;
        });
        this.setState({
          frequency: freq
        });
      }
    }
  }
  _toggleShields(shields) {
    let state;
    if (shields === "down") {
      state = true;
    }
    if (shields === "up") {
      state = false;
    }
    if (typeof shields === "object") {
      state = shields.state;
    }
    let mutation;
    if (state) {
      mutation = gql`
        mutation ToggleShields($id: ID!) {
          shieldLowered(id: $id)
        }
      `;
    } else {
      mutation = gql`
        mutation ToggleShields($id: ID!) {
          shieldRaised(id: $id)
        }
      `;
    }
    if (shields === "down" || shields === "up") {
      this.props.data.shields.forEach(s => {
        let variables = { id: s.id };
        this.props.client.mutate({
          mutation,
          variables
        });
      });
    } else {
      let variables = { id: shields.id };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  }
  _loop(which, shields) {
    let { frequency, frequencyAdder, frequencySpeed } = this.state;
    if (which === "down") {
      frequencyAdder *= -1;
    }
    if (frequencySpeed > 10) {
      frequencySpeed -= 5;
    }
    frequency[shields.id] += frequencyAdder;
    if (frequency[shields.id] <= 100) {
      frequency[shields.id] = 100;
    } else if (frequency >= 350) {
      frequency[shields.id] = 350;
    } else {
      this.freqLoop = setTimeout(
        this._loop.bind(this, which, shields),
        this.state.frequencySpeed
      );
    }
    this.setState({
      frequency,
      frequencySpeed
    });
  }
  startLoop(which, shields) {
    const frequency = this.state.frequency;
    frequency[shields.id] = shields.frequency;
    this.setState({
      frequency,
      frequencySpeed: 250
    });
    document.addEventListener("mouseup", this.stopLoop.bind(this, shields));
    this.freqLoop = setTimeout(
      this._loop.bind(this, which, shields),
      this.state.frequencySpeed
    );
  }
  stopLoop(shields) {
    clearTimeout(this.freqLoop);
    // Update the server with the shield frequency
    const mutation = gql`
      mutation SetShieldFrequency($id: ID!, $freq: Float) {
        shieldFrequencySet(id: $id, frequency: $freq)
      }
    `;
    const variables = {
      id: shields.id,
      freq: this.state.frequency[shields.id]
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.freqLoop = null;
  }
  render() {
    //Define the color
    if (this.props.data.loading) return null;
    const shields = this.props.data.shields;
    if (shields.length === 1) {
      return (
        <Shield1
          shields={shields}
          startLoop={this.startLoop.bind(this)}
          state={this.state}
          _toggleShields={this._toggleShields.bind(this)}
        />
      );
    }
    if (shields.length === 4) {
      return (
        <Shield4
          shields={shields}
          startLoop={this.startLoop.bind(this)}
          state={this.state}
          _toggleShields={this._toggleShields.bind(this)}
        />
      );
    }
    if (shields.length === 6) {
      return (
        <Shield6
          shields={shields}
          startLoop={this.startLoop.bind(this)}
          state={this.state}
          _toggleShields={this._toggleShields.bind(this)}
        />
      );
    }
    return "Invalid Shield Configuration";
  }
}

const SHIELD_QUERY = gql`
  query Shields($simulatorId: ID!) {
    shields(simulatorId: $simulatorId) {
      id
      name
      state
      position
      frequency
      integrity
      simulatorId
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;
export default graphql(SHIELD_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ShieldControl));
