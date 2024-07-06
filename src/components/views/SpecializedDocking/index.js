import { Query } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import SpecializedDocking from "./specializedDocking";
import "./style.scss";

const fragment = gql`
  fragment SpecializedDockingData on DockingPort {
    id
    name
    clamps
    compress
    doors
    image
    docked
    damage {
      damaged
    }
    direction
    deck {
      id
      number
    }
    inventory {
      id
      name
      count
    }
  }
`;

export const SPECIALIZED_DOCKING_QUERY = gql`
  query Docking($simulatorId: ID!) {
    docking(simulatorId: $simulatorId, type: specialized) {
      ...SpecializedDockingData
    }
  }
  ${fragment}
`;
export const SPECIALIZED_DOCKING_SUB = gql`
  subscription DockingUpdate($simulatorId: ID!) {
    dockingUpdate(simulatorId: $simulatorId, type: specialized) {
      ...SpecializedDockingData
    }
  }
  ${fragment}
`;

class SpecializedSpecializedDockingData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={SPECIALIZED_DOCKING_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {docking} = data;
          if (!docking[0]) return <div>No Specialized Docking Ports</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SPECIALIZED_DOCKING_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      docking: subscriptionData.data.dockingUpdate,
                    });
                  },
                })
              }
            >
              <SpecializedDocking {...this.props} docking={docking} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default SpecializedSpecializedDockingData;
