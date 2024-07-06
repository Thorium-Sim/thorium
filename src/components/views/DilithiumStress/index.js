import { Query } from "@apollo/client";
import React, {Component} from "react";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import DilithiumStress from "./dilithiumStress";
import "./style.scss";
import "../TractorBeam/style.scss";
const fragment = gql`
  fragment DilithiumData on Reactor {
    id
    model
    alphaLevel
    betaLevel
    alphaTarget
    betaTarget
  }
`;

export const DILITHIUM_QUERY = gql`
  query Template($simulatorId: ID!) {
    reactors(simulatorId: $simulatorId) {
      ...DilithiumData
    }
  }
  ${fragment}
`;
export const DILITHIUM_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      ...DilithiumData
    }
  }
  ${fragment}
`;

class DilithiumStressData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={DILITHIUM_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {reactors} = data;
          if (!reactors[0]) return <div>No Reactor</div>;
          const Reactor = reactors.find(r => r.model === "reactor");
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: DILITHIUM_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      reactors: subscriptionData.data.reactorUpdate,
                    });
                  },
                })
              }
            >
              <DilithiumStress {...this.props} {...Reactor} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default DilithiumStressData;
