import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

import TorpedoFire from "./torpedoFire";
import TorpedoLoader from "./loader";

const trainingSteps = [
  {
    selector: ".torpedo-loading",
    content:
      "Torpedos are explosive projectile weapons. You can use this screen to load torpedos into your launchers."
  },
  {
    selector: ".torpedoButton",
    content: "Click the load button to see the available torpedos."
  },
  {
    selector: ".torpedoPickScroll",
    content:
      "Click on one of the torpedos to load it into your launcher. Recognize that some torpedos have different properties. For example, photon torpedos travel quickly but carry a smaller payload, thus causing less damage. Quantum torpedos do not travel as quickly, but are many times more explosive than photon torpedos."
  }
];

const TORPEDO_SUB = gql`
  subscription TorpedosUpdate($simulatorId: ID!) {
    torpedosUpdate(simulatorId: $simulatorId) {
      id
      loaded
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

class TorpedoLoading extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.torpedos) return null;
    const torpedos = this.props.data.torpedos;
    if (!torpedos) return null;
    return (
      <div className="torpedo-loading">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TORPEDO_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  torpedos: subscriptionData.data.torpedosUpdate
                });
              }
            })
          }
        />
        {torpedos.map(t => {
          if (torpedos.length > (this.props.maxLaunchers || Infinity)) {
            return (
              <TorpedoFire key={t.id} torpedo={t} client={this.props.client} />
            );
          }
          return (
            <TorpedoLoader
              key={t.id}
              torpedo={t}
              targeting={this.props.targeting}
              client={this.props.client}
            />
          );
        })}
        {this.props.clientObj && (
          <Tour steps={trainingSteps} client={this.props.clientObj} />
        )}
      </div>
    );
  }
}

const TORPEDO_QUERY = gql`
  query Torpedos($simulatorId: ID!) {
    torpedos(simulatorId: $simulatorId) {
      id
      loaded
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

export default graphql(TORPEDO_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(TorpedoLoading));
