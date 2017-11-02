import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button } from "reactstrap";
import { OutputField, TypingField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      types {
        id
        name
      }
      probes {
        id
        type
        name
        query
        querying
        response
        equipment {
          id
          name
          count
        }
      }
    }
  }
`;

class ProbeControl extends Component {
  subscription = null;
  state = {
    selectedProbe: null
  };
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: { simulatorId: this.props.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            probes: subscriptionData.probesUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  response = () => {
    const variables = {
      id: this.props.data.probes[0].id,
      probeId: this.state.selectedProbe,
      response: this.state.responseString
    };
    const mutation = gql`
      mutation ProbeQueryResponse($id: ID!, $probeId: ID!, $response: String!) {
        probeQueryResponse(id: $id, probeId: $probeId, response: $response)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const { selectedProbe } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return (
      <Container fluid className="probe-control-core">
        <Row style={{ height: "100%" }}>
          <Col sm={3} style={{ height: "100%" }}>
            <div className="scroll probelist">
              {probes.probes.map(p => (
                <p
                  key={p.id}
                  className={`probe ${p.querying ? "querying" : ""}
                  ${p.id === selectedProbe ? "selected" : ""}`}
                  onClick={() => this.setState({ selectedProbe: p.id })}
                >
                  {p.name}
                </p>
              ))}
            </div>
          </Col>
          {selectedProbe && (
            <Col sm={9} style={{ height: "100%" }}>
              <Row>
                <Col sm={12}>
                  <OutputField
                    alert={
                      probes.probes.find(p => p.id === selectedProbe).querying
                    }
                  >
                    {probes.probes.find(p => p.id === selectedProbe).query}
                  </OutputField>
                </Col>
              </Row>
              <Row style={{ height: "100%" }}>
                <Col sm={12} style={{ height: "100%" }}>
                  <TypingField
                    style={{ height: "calc(100% - 60px)", textAlign: "left" }}
                    controlled
                    value={this.state.responseString}
                    onChange={evt =>
                      this.setState({ responseString: evt.target.value })}
                  />
                  <Button size="sm" onClick={this.response}>
                    Send Response
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      types {
        id
        name
      }
      probes {
        id
        type
        name
        query
        querying
        response
        equipment {
          id
          name
          count
        }
      }
    }
  }
`;

export default graphql(PROBES_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ProbeControl));
