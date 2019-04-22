import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DockingPorts from "./dockingPorts";
import "./style.scss";

const fragment = gql`
  fragment DockingPortData on DockingPort {
    id
    name
    shipName
    clamps
    compress
    doors
    image
    docked
    damage {
      damaged
    }
    position {
      x
      y
    }
  }
`;

const QUERY = gql`
  query Docking($simulatorId: ID!) {
    docking(simulatorId: $simulatorId, type: dockingport) {
      ...DockingPortData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription DockingUpdate($simulatorId: ID!) {
    dockingUpdate(simulatorId: $simulatorId, type: dockingport) {
      ...DockingPortData
    }
  }
  ${fragment}
`;

class DockingPortData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { docking } = data;
          if (loading || !docking) return null;
          if (docking.length === 0) return <div>No Docking Ports</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      docking: subscriptionData.data.dockingUpdate
                    });
                  }
                })
              }
            >
              <DockingPorts {...this.props} dockingPorts={docking} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DockingPortData;
