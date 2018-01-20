import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";

const REMOTE_ACCESS_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        remoteAccessCodes {
          id
          code
          state
          station
          timestamp
        }
      }
    }
  }
`;

const mutation = gql`
  mutation RemoteRespond($simulatorId: ID!, $codeId: ID!, $state: String!) {
    remoteAccessUpdateCode(
      simulatorId: $simulatorId
      codeId: $codeId
      state: $state
    )
  }
`;

class RemoteAccessCore extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: REMOTE_ACCESS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  respond(codeId, state) {
    const variables = {
      simulatorId: this.props.simulator.id,
      codeId,
      state
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const { ship } = this.props.data.simulators[0];
    return (
      <Container className="remote-access-core">
        <div style={{ overflowY: "scroll", height: "calc(100% - 16px)" }}>
          {ship.remoteAccessCodes
            .slice()
            .reverse()
            .map(c => (
              <div
                key={`${c.state}-${c.code}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p
                  style={{
                    backgroundColor: "lightgray",
                    margin: "1px",
                    flex: "6 0 0"
                  }}
                  title={`${c.station} - ${c.timestamp}`}
                >
                  {c.code}
                </p>
                {c.state === "sent" ? (
                  <div>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={this.respond.bind(this, c.id, "Denied")}
                    >
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      color="success"
                      onClick={this.respond.bind(this, c.id, "Accepted")}
                    >
                      Accept
                    </Button>
                  </div>
                ) : (
                  <p
                    style={{ flex: "1 0 0" }}
                    className={
                      c.state === "Accepted" ? "text-success" : "text-danger"
                    }
                  >
                    {c.state}
                  </p>
                )}
              </div>
            ))}
        </div>
      </Container>
    );
  }
}

const REMOTE_ACCESS_QUERY = gql`
  query Simulator($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        remoteAccessCodes {
          id
          code
          state
          station
          timestamp
        }
      }
    }
  }
`;

export default graphql(REMOTE_ACCESS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(RemoteAccessCore));
