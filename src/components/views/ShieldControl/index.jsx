import React, {Fragment, Component} from "react";
import gql from "graphql-tag.macro";
import {graphql, withApollo} from "react-apollo";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import Shield1 from "./shield-1";
import Shield4 from "./shield-4";
import Shield6 from "./shield-6";
import "./style.scss";

const trainingSteps = [
  {
    selector: ".number-pad",
    content:
      "Shields use energy fields to protect your ship from outside dangers, including asteroids, radiation, and enemy weapons. Shields also block transporter signals and can disrupt communications, so there may be times when you need to lower the shields.",
  },
  {
    selector: ".integrity",
    content:
      "As your shields protect you, they slowly lose integrity. Keep track of your integrity to know where your weak points are.",
  },
  {
    selector: ".frequency",
    content:
      "The shield frequency controls how often the shields recalibrate. Your shields will protect you regardless of the frequency, but in some circumstances you may need to change it. Click and hold on the arrows to change the frequency. The longer you hold, the faster the frequency changes.",
  },
  {
    selector: ".shield-activate",
    content:
      "These controls allow you to raise and lower the shields. When the shields are raised, your ship is protected.",
  },
];

export const SHIELD_SUB = gql`
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
      disabledButton: {},
    };
    this.shieldSub = null;
    this.freqLoop = null;
  }
  componentWillUnmount() {
    this.shieldSub && this.shieldSub();
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
      let variables = {id: this.props.simulator.id};
      this.props.client.mutate({
        mutation,
        variables,
      });
    } else {
      let variables = {id: shields.id};
      this.props.client.mutate({
        mutation,
        variables,
      });
    }
    // Disable the buttons temporarily
    this.setState({
      disabledButton: Object.assign({}, this.state.disabledButton, {
        [shields.id ? shields.id : shields]: true,
      }),
    });
    setTimeout(() => {
      this.setState({
        disabledButton: Object.assign({}, this.state.disabledButton, {
          [shields.id ? shields.id : shields]: false,
        }),
      });
    }, 3000);
  }
  render() {
    //Define the color
    if (this.props.data.loading || !this.props.data.shields) return null;
    const shields = this.props.data.shields;
    if (!shields) return null;
    return (
      <Fragment>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SHIELD_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
              },
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  shields: subscriptionData.data.shieldsUpdate,
                });
              },
            })
          }
        />
        {(() => {
          if (shields.length === 1) {
            return (
              <Shield1
                shields={shields}
                state={this.state}
                _toggleShields={this._toggleShields.bind(this)}
                simulator={this.props.simulator}
              />
            );
          }
          if (shields.length === 4) {
            return (
              <Shield4
                shields={shields}
                state={this.state}
                _toggleShields={this._toggleShields.bind(this)}
                simulator={this.props.simulator}
              />
            );
          }
          if (shields.length === 6) {
            return (
              <Shield6
                shields={shields}
                state={this.state}
                _toggleShields={this._toggleShields.bind(this)}
                simulator={this.props.simulator}
              />
            );
          }
          return "Invalid Shield Configuration";
        })()}
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Fragment>
    );
  }
}

export const SHIELD_QUERY = gql`
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
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(withApollo(ShieldControl));
