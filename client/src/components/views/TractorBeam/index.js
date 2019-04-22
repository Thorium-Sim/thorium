import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

import { Asset } from "helpers/assets";
import Beam from "./beam";
import Target from "./target";
import Bars from "./bars";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "helpers/tourHelper";

import "./style.scss";

const TRACTORBEAM_SUB = gql`
  subscription TractorBeamUpdate($simulatorId: ID!) {
    tractorBeamUpdate(simulatorId: $simulatorId) {
      id
      name
      displayName
      state
      target
      targetLabel
      strength
      stress
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

class TractorBeam extends Component {
  toggleBeam = () => {
    const tractorBeam = this.props.data.tractorBeam[0];
    const mutation = gql`
      mutation TractorBeamState($id: ID!, $state: Boolean!) {
        setTractorBeamState(id: $id, state: $state)
      }
    `;
    const variables = {
      id: tractorBeam.id,
      state: !tractorBeam.state
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  trainingSteps = tractorBeam => [
    {
      selector: ".activate",
      content: `The ${tractorBeam.displayName ||
        tractorBeam.name} pulls objects to you with zero-point energy. Once a target it in sight, it will appear below the ship. Press this button to activate the ${tractorBeam.displayName ||
        tractorBeam.name}.`
    },
    {
      selector: ".strengthBar",
      content: `The size and speed of the object will impact the stress on the ${tractorBeam.displayName ||
        tractorBeam.name}. If the object is large, fast, or dense, it will put more stress on our ship, and we will need to strengthen the ${tractorBeam.displayName ||
        tractorBeam.name} in order to pull in the object. If we pull it in too fast, the object may collide with our ship and cause damage. Use this tool to match the strength of the ${tractorBeam.displayName ||
        tractorBeam.name} to the stress being put on it.`
    }
  ];
  render() {
    if (this.props.data.loading || !this.props.data.tractorBeam) return null;
    const tractorBeam =
      this.props.data.tractorBeam && this.props.data.tractorBeam[0];
    if (!tractorBeam) return <p>No Tractor Beam</p>;
    const maxPower = tractorBeam.power.powerLevels.length
      ? (tractorBeam.power.power + 1 - tractorBeam.power.powerLevels[0]) /
        (tractorBeam.power.powerLevels[
          tractorBeam.power.powerLevels.length - 1
        ] -
          tractorBeam.power.powerLevels[0] +
          1)
      : 1;
    const { assets } = this.props.simulator;
    return (
      <Container className="tractor-beam">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TRACTORBEAM_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  tractorBeam: subscriptionData.data.tractorBeamUpdate
                });
              }
            })
          }
        />
        <DamageOverlay
          system={tractorBeam}
          message={`${tractorBeam.displayName || tractorBeam.name} Offline`}
        />
        <Beam shown={tractorBeam.state} />
        <Asset asset={assets.side}>
          {({ src }) => (
            <div
              alt="ship"
              style={{
                height: "30vh",
                backgroundImage: `url("${src}")`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              className="ship-side"
              draggable="false"
            />
          )}
        </Asset>
        <Target shown={tractorBeam.target} label={tractorBeam.targetLabel} />
        <Bars
          className="stressBar"
          flop
          label="Stress"
          active={tractorBeam.state}
          simulator={this.props.simulator}
          level={Math.abs(tractorBeam.stress - 1)}
        />
        <Bars
          className="strengthBar"
          label="Strength"
          arrow
          color={"blue"}
          active={tractorBeam.state}
          simulator={this.props.simulator}
          max={Math.abs(maxPower - 1)}
          level={Math.abs(Math.min(tractorBeam.strength, maxPower) - 1)}
          id={tractorBeam.id}
          mouseUp={level =>
            this.props.client.mutate({
              mutation: gql`
                mutation TractorBeamStrength($id: ID!, $strength: Float!) {
                  setTractorBeamStrength(id: $id, strength: $strength)
                }
              `,
              variables: {
                id: tractorBeam.id,
                strength: Math.abs(level - 1)
              }
            })
          }
        />
        <Button
          size="lg"
          onClick={this.toggleBeam}
          className="activate"
          disabled={!tractorBeam.target}
        >
          {tractorBeam.state ? "Deactivate" : "Activate"}{" "}
          {tractorBeam.displayName || tractorBeam.name}
        </Button>
        <Tour
          steps={this.trainingSteps(tractorBeam)}
          client={this.props.clientObj}
        />
      </Container>
    );
  }
}

const TRACTORBEAM_QUERY = gql`
  query TractorBeamInfo($simulatorId: ID!) {
    tractorBeam(simulatorId: $simulatorId) {
      id
      name
      displayName
      state
      target
      targetLabel
      strength
      stress
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
export default graphql(TRACTORBEAM_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TractorBeam));
