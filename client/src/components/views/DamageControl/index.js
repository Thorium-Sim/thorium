import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DamageControl from "./damageControl";
import "./style.scss";

const queryData = `
id
name
damage {
  damaged
  destroyed
  report
  requested
  reactivationCode
  neededReactivationCode
  currentStep
  validate
  which
}
simulatorId
type
`;

const QUERY = gql`
  query Systems($simulatorId: ID!, $simId: String, $which:String) {
    simulators(id: $simId) {
      id
      stepDamage
      verifyStep
    }
    systems(simulatorId: $simulatorId, extra:true, damageWhich:$which) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SystemsUpdate($simulatorId: ID!, $which: String) {
    systemsUpdate(simulatorId: $simulatorId, extra: true, damageWhich: $which) {
${queryData}
    }
  }
`;

class DamageControlData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          simId: this.props.simulator.id,
          which: this.props.which || "default"
        }}
      >
        {({ loading, data, subscribeToMore }) => {
          const { systems, simulators } = data;
          if (loading || !systems || !simulators) return null;
          const [simulator] = simulators;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    which: this.props.which || "default"
                  },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      systems: subscriptionData.data.systemsUpdate
                    });
                  }
                })
              }
            >
              <DamageControl {...this.props} systems={systems} {...simulator} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DamageControlData;
