import React, {Component} from "react";
import {Query, withApollo} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import StealthField from "./stealthField";
import "./style.scss";

const fragment = gql`
  fragment StealthData on StealthField {
    id
    name
    state
    charge
    activated
    quadrants {
      fore
      aft
      port
      starboard
    }
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
`;

export const STEALTH_QUERY = gql`
  query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
      ...StealthData
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
export const STEALTH_SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      type
      stealthFactor
    }
  }
`;
export const STEALTH_SUB = gql`
  subscription StealthFieldUpdate($simulatorId: ID!) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      ...StealthData
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
    const {client, test} = this.props;
    if (!test) {
      client.query({
        query: STEALTH_SYSTEMS_QUERY,
        variables: {simulatorId: this.props.simulator.id},
      });
      this.timeout = setTimeout(this.getSystems, 1000);
    }
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <Query
        query={STEALTH_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {stealthField, systems} = data;
          if (!stealthField[0]) return <div>No Stealth Field</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: STEALTH_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      stealthField: subscriptionData.data.stealthFieldUpdate,
                    });
                  },
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
