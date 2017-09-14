import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const POP_SUB = gql`
  subscription Population($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId) {
      id
    }
  }
`;

class Population extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: POP_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            crew: subscriptionData.data.crewUpdate
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
    const crew = this.props.data.crew;
    if (!crew || crew.length === 0) return null;
    return (
      <div>
        <Label>Crew Population</Label>
        <div className="status-field">
          {crew.length}
        </div>
      </div>
    );
  }
}

const POP_QUERY = gql`
  query Population($simulatorId: ID) {
    crew(simulatorId: $simulatorId) {
      id
    }
  }
`;

export default graphql(POP_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(Population);
