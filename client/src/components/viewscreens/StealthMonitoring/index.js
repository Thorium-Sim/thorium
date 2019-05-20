import React, { Component } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import StealthField from "./stealthField";
import "./style.scss";

const fragment = gql`
  fragment StealthViewscreenData on StealthField {
    id
    name
    displayName
    state
    charge
    activated
  }
`;

const QUERY = gql`
  query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
      ...StealthViewscreenData
    }
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      type
      stealthFactor
    }
  }
  ${fragment}
`;
const SYSTEMS_QUERY = gql`
  query Sytems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      type
      stealthFactor
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription StealthFieldUpdate($simulatorId: ID!) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      ...StealthViewscreenData
    }
  }
  ${fragment}
`;

class StealthFieldData extends Component {
  state = {};
  componentDidMount() {
    this.getSystems();
  }
  getSystems = () => {
    const { client } = this.props;
    client.query({
      query: SYSTEMS_QUERY,
      variables: { simulatorId: this.props.simulator.id }
    });
    this.timeout = setTimeout(this.getSystems, 1000);
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { stealthField, systems } = data;
          if (loading || !stealthField) return null;
          if (!stealthField[0]) return <div>No Stealth Field</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      stealthField: subscriptionData.data.stealthFieldUpdate
                    });
                  }
                })
              }
            >
              <StealthField
                {...this.props}
                {...stealthField[0]}
                systems={systems || []}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default withApollo(StealthFieldData);
