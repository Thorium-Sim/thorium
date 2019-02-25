import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Table, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";

const queryData = `
id
state
completion
difficulty
destination {
  id
  displayName
}
logs {
  timestamp
  message
}
`;

const EXOCOMP_SUB = gql`
  subscription Exocomps($simulatorId: ID!) {
    exocompsUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class ExocompsCore extends Component {
  state = { showHistory: false };
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
    const { showHistory } = this.state;
    const {
      data: { loading, exocomps }
    } = this.props;
    if (loading || !exocomps) return null;
    if (exocomps.length === 0) return <p>No Exocomps</p>;
    return (
      <Container className="core-exocomps">
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
        <Row>
          <Col sm={showHistory ? 6 : 12}>
            <Table striped size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dest</th>
                  <th>State</th>
                  <th>Done</th>
                  {!showHistory && (
                    <th>
                      Speed{" "}
                      <Button
                        size="sm"
                        color="info"
                        onClick={() => this.setState({ showHistory: true })}
                      >
                        Show History
                      </Button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {exocomps.map((e, i) => (
                  <tr key={e.id}>
                    <td>{i + 1}</td>
                    <td>
                      {e.destination ? e.destination.displayName : "None"}
                    </td>
                    <td>{e.state}</td>
                    <td>{Math.round(e.completion * 1000) / 10}%</td>
                    {!showHistory && (
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
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          {showHistory && (
            <Col sm={6}>
              <Button
                size="sm"
                color="info"
                onClick={() => this.setState({ showHistory: false })}
              >
                Hide History
              </Button>
              {exocomps
                .reduce((prev, next, i) => {
                  return prev.concat(
                    next.logs.map(l => Object.assign({}, l, { number: i + 1 }))
                  );
                }, [])
                .sort((a, b) => {
                  if (a.timestamp > b.timestamp) return -1;
                  if (a.timestamp < b.timestamp) return 1;
                  return 0;
                })
                .map((l, i) => (
                  <p key={`log-${l.timestamp}-${i}`}>
                    {new Date(l.timestamp).toLocaleTimeString()} - Exocomp #
                    {l.number}: {l.message}
                  </p>
                ))}
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Exocomps($simulatorId: ID!) {
    exocomps(simulatorId: $simulatorId) {
${queryData}
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
