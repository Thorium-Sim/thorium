import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Transwarp from "./transwarp";
import "./style.scss";

const fragments = {
  coreData: gql`
    fragment CoreData on TranswarpQuad {
      core {
        required
        value
      }
      warp {
        required
        value
      }
      field {
        required
        value
      }
    }
  `,
  transwarpFragment: gql`
    fragment TranswarpData on Transwarp {
      id
      name
      displayName
      quad1 {
        ...CoreData
      }
      quad2 {
        ...CoreData
      }
      quad3 {
        ...CoreData
      }
      quad4 {
        ...CoreData
      }
      active
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
      heat
      coolant
    }
  `
};

const HEATCHANGE_SUB = gql`
  subscription HeatChanged($simulatorId: ID) {
    heatChange(simulatorId: $simulatorId) {
      id
      heat
      coolant
    }
  }
`;

const QUERY = gql`
  query Transwarp($simulatorId: ID!) {
    transwarp(simulatorId: $simulatorId) {
      ...TranswarpData
    }
  }
  ${fragments.coreData}
  ${fragments.transwarpFragment}
`;
const SUBSCRIPTION = gql`
  subscription TranswarpUpdate($simulatorId: ID!) {
    transwarpUpdate(simulatorId: $simulatorId) {
      ...TranswarpData
    }
  }
  ${fragments.coreData}
  ${fragments.transwarpFragment}
`;

class TranswarpData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { transwarp } = data;
          if (loading || !transwarp) return null;
          if (!transwarp[0]) return <div>No Transwarp</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      transwarp: subscriptionData.data.transwarpUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: HEATCHANGE_SUB,
                    variables: { simulatorId: this.props.simulator.id },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      const { transwarp } = previousResult;
                      const { heatChange } = subscriptionData.data;
                      return {
                        ...previousResult,
                        transwarp: transwarp.map(t =>
                          t.id === heatChange.id ? { ...t, ...heatChange } : t
                        )
                      };
                    }
                  })
                }
              />
              <Transwarp {...this.props} {...transwarp[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default TranswarpData;
