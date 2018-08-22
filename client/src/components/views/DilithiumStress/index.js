import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import DilithiumStress from "./dilithiumStress";
import "./style.scss";

const queryData = `
id
alphaLevel
betaLevel
alphaTarget
betaTarget
`;

const QUERY = gql`
  query Template($simulatorId: ID!) {
    reactors(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class DilithiumStressData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { reactors } = data;
          if (loading || !reactors) return null;
          if (!reactors[0]) return <div>No Reactor</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      reactors: subscriptionData.data.reactorUpdate
                    });
                  }
                })
              }
            >
              <DilithiumStress {...this.props} {...reactors[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DilithiumStressData;
