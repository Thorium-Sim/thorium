import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Tour from "reactour";

import "./style.css";

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
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TORPEDO_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            torpedos: subscriptionData.data.torpedosUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  render() {
    if (this.props.data.loading || !this.props.data.torpedos) return null;
    const torpedos = this.props.data.torpedos;
    if (!torpedos) return null;
    console.log(
      torpedos.length,
      this.props.maxLaunchers,
      torpedos.length > (this.props.maxLaunchers || Infinity)
    );
    return (
      <div className="torpedo-loading">
        {torpedos.map(t => {
          if (torpedos.length > (this.props.maxLaunchers || Infinity)) {
            console.log("Firign");
            return (
              <TorpedoFire key={t.id} torpedo={t} client={this.props.client} />
            );
          } else {
            console.log("Loading");
            return (
              <TorpedoLoader
                key={t.id}
                torpedo={t}
                targeting={this.props.targeting}
                client={this.props.client}
              />
            );
          }
        })}
        {this.props.clientObj && (
          <Tour
            steps={trainingSteps}
            isOpen={this.props.clientObj.training}
            onRequestClose={this.props.stopTraining}
          />
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
