import { Query } from "@apollo/client";
import React, {Component} from "react";
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

export const DOCKING_PORT_QUERY = gql`
  query Docking($simulatorId: ID!) {
    docking(simulatorId: $simulatorId, type: dockingport) {
      ...DockingPortData
    }
  }
  ${fragment}
`;
export const DOCKING_PORT_SUB = gql`
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
      <Query
        query={DOCKING_PORT_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {docking} = data;
          if (docking.length === 0) return <div>No Docking Ports</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: DOCKING_PORT_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      docking: subscriptionData.data.dockingUpdate,
                    });
                  },
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
