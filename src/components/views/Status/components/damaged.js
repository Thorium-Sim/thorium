import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SUB = gql`
  subscription DamagedSub($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId) {
      id
      name
      damage {
        damaged
      }
      displayName
    }
  }
`;

class Damage extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    // Cancel the subscription
    this.sub();
  }
  render() {
    if (this.props.data.loading) return null;
    const { systems } = this.props.data;
    return (
      <div>
        <Label>Damaged Systems</Label>
        <div className="status-field damage-list">
          {systems.filter(s => s.damage.damaged).map(s =>
            <p key={s.id}>
              {s.displayName || s.name}
            </p>
          )}
        </div>
      </div>
    );
  }
}

const QUERY = gql`
  query Damaged($simulatorId: ID) {
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      damage {
        damaged
      }
      displayName
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(Damage);
