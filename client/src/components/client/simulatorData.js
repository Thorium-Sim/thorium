import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Client from "./client";
import playSound from "../generic/SoundPlayer";

const fragments = {
  simulatorData: gql`
    fragment SimulatorData on Simulator {
      id
      name
      caps
      alertlevel
      layout
      bridgeOfficerMessaging
      training
      hasPrinter
      panels
      assets {
        mesh
        texture
        side
        top
        logo
        bridge
      }
      stations {
        name
        login
        training
        ambiance
        executive
        layout
        messageGroups
        widgets
        cards {
          name
          component
        }
      }
    }
  `
};

const QUERY = gql`
  query Simulator($simulatorId: String!) {
    simulators(id: $simulatorId) {
      ...SimulatorData
    }
  }
  ${fragments.simulatorData}
`;
const SUBSCRIPTION = gql`
  subscription SimulatorUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...SimulatorData
    }
  }
  ${fragments.simulatorData}
`;

class SimulatorData extends Component {
  state = {};
  render() {
    const {
      station: { name },
      simulator
    } = this.props;
    return (
      <Query query={QUERY} variables={{ simulatorId: simulator.id }}>
        {({ loading, data = {}, subscribeToMore }) => {
          const { simulators } = data;
          if (loading || !simulators) return null;
          if (!simulators[0]) return <div>No Simulator</div>;
          const station = simulators[0].stations.find(s => s.name === name);
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
              {
                <Client
                  {...this.props}
                  simulator={simulators[0]}
                  station={station || this.props.station}
                />
              }
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default playSound(SimulatorData);
