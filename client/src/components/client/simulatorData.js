import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../helpers/subscriptionHelper";
import Client from "./client";
import playSound from "../generic/SoundPlayer";

const queryData = `
id
name
alertlevel
layout
bridgeOfficerMessaging
assets {
  mesh
  texture
  side
  top
  logo
}
`;

const QUERY = gql`
  query Simulator($simulatorId: String!) {
    simulators(id: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SimulatorUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const excludedStations = ["Sound", "Blackout", "Viewscreen", "Keyboard"];
class SimulatorData extends Component {
  state = {};
  componentDidMount() {
    if (
      excludedStations.indexOf(this.props.station.name) > -1 ||
      this.props.station.cards.find(
        c => excludedStations.indexOf(c.component) > -1
      )
    )
      return;
    this.props.playSound({ url: "/sciences.ogg" });
  }
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { simulators } = data;
          if (loading || !simulators) return null;
          if (!simulators[0]) return <div>No Simulator</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      simulators: subscriptionData.data.simulatorsUpdate
                    });
                  }
                })
              }
            >
              <Client {...this.props} simulator={simulators[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default playSound(SimulatorData);
