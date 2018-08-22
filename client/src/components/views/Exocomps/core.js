import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Table } from "reactstrap";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
const EXOCOMP_SUB = gql`
  subscription Exocomps($simulatorId: ID!) {
    exocompsUpdate(simulatorId: $simulatorId) {
      id
      state
      completion
      difficulty
      destination {
        id
        displayName
      }
    }
  }
`;

class ExocompsCore extends Component {
  updateDifficulty = (id, diff) => {
    const mutation = gql`
      mutation ExocompDiff($id: ID!, $diff: Float!) {
        updateExocompDifficulty(exocomp: $id, difficulty: $diff)
      }
    `;
    const variables = {
      id,
      diff
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      data: { loading, exocomps }
    } = this.props;
    if (loading || !exocomps) return null;
    if (exocomps.length === 0) return <p>No Exocomps</p>;
    return (
      <div className="core-exocomps">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: EXOCOMP_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  exocomps: subscriptionData.data.exocompsUpdate
                });
              }
            })
          }
        />
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Dest</th>
              <th>State</th>
              <th>Done</th>
              <th>Speed</th>
            </tr>
          </thead>
          <tbody>
            {exocomps.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.destination ? e.destination.displayName : "None"}</td>
                <td>{e.state}</td>
                <td>{Math.round(e.completion * 1000) / 10}%</td>
                <td>
                  <input
                    type="range"
                    defaultValue={e.difficulty}
                    onChange={evt =>
                      this.updateDifficulty(e.id, evt.target.value)
                    }
                    min={0.001}
                    max={0.5}
                    step={0.005}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const QUERY = gql`
  query Exocomps($simulatorId: ID!) {
    exocomps(simulatorId: $simulatorId) {
      id
      state
      completion
      difficulty
      destination {
        id
        displayName
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ExocompsCore));
