import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import SubspaceField from "./subspaceField";
import "./style.scss";

const fragment = gql`
  fragment SubspaceFieldData on SubspaceField {
    id
    name
    displayName
    totalPower
    fore {
      required
      value
    }
    aft {
      required
      value
    }
    port {
      required
      value
    }
    starboard {
      required
      value
    }
    ventral {
      required
      value
    }
    dorsal {
      required
      value
    }
  }
`;

const QUERY = gql`
  query SubspaceField($simulatorId: ID!) {
    subspaceField(simulatorId: $simulatorId) {
      ...SubspaceFieldData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription SubspaceFieldUpdate($simulatorId: ID!) {
    subspaceFieldUpdate(simulatorId: $simulatorId) {
      ...SubspaceFieldData
    }
  }
  ${fragment}
`;

class SubspaceFieldData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { subspaceField } = data;
          if (loading || !subspaceField) return null;
          if (!subspaceField[0]) return <div>No Subspace Field</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      subspaceField: subscriptionData.data.subspaceFieldUpdate
                    });
                  }
                })
              }
            >
              <SubspaceField {...this.props} {...subspaceField[0]} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default SubspaceFieldData;
