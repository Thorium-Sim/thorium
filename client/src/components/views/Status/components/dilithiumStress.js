import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Dots from "./dots";
import SubscriptionHelper from "helpers/subscriptionHelper";
const SUB = gql`
  subscription DilithiumStress($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      alphaLevel
      alphaTarget
      betaLevel
      betaTarget
      model
      heat
    }
  }
`;

class DilithiumStress extends Component {
  // This calculation came from client/src/components/views/DilithiumStress/dilithiumStress.js
  calcStressLevel = reactor => {
    const { alphaTarget, betaTarget } = reactor;
    const { alphaLevel, betaLevel } = reactor;
    const alphaDif = Math.abs(alphaTarget - alphaLevel);
    const betaDif = Math.abs(betaTarget - betaLevel);
    const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
    return stressLevel;
  };

  getDilithiumStressCard = stations => {
    if (!stations) return null;
    return stations
      .map(s => s.cards.find(card => card.component === "DilithiumStress"))
      .filter(Boolean)[0];
  };

  render() {
    if (this.props.data.loading || !this.props.data.reactors) return null;
    const dilithiumStressCard = this.getDilithiumStressCard(
      this.props.simulator.stations
    );
    if (!dilithiumStressCard) return null;
    const reactor = this.props.data.reactors && this.props.data.reactors[0];
    if (!reactor) return null;
    const stressLevel = this.calcStressLevel(reactor) / 100;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  reators: subscriptionData.data.reactors
                });
              }
            })
          }
        />
        <Label>{dilithiumStressCard.name}</Label>
        <Dots level={stressLevel} color="rgb(255,60,40)" />
      </div>
    );
  }
}
const QUERY = gql`
  query DilithiumStress($simulatorId: ID!) {
    reactors(simulatorId: $simulatorId) {
      id
      alphaLevel
      alphaTarget
      betaLevel
      betaTarget
      model
      heat
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(DilithiumStress);
