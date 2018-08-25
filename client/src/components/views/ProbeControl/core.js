import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button } from "reactstrap";
import { OutputField, TypingField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      types {
        id
        name
      }
      torpedo
      probes {
        id
        type
        name
        query
        querying
        response
        launched
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
  destroyProbe = () => {
    const probes = this.props.data.probes[0];
    const { selectedProbe } = this.state;
    const probeObj = probes.probes.find(p => p.id === selectedProbe);
    if (
      window.confirm(
        `Are you sure you want to destroy this probe: ${probeObj.name}`
      )
    ) {
      this.setState({ selectedProbe: null });
      const mutation = gql`
        mutation DestroyProbe($id: ID!, $probeId: ID!) {
          destroyProbe(id: $id, probeId: $probeId)
        }
      `;
      if (probeObj) {
        const variables = {
          id: this.props.data.probes[0].id,
          probeId: probeObj.id
        };
        this.props.client.mutate({
          mutation,
          variables
        });
      }
    }
  };
  response = () => {
    const variables = {
      id: this.props.data.probes[0].id,
      probeId: this.state.selectedProbe,
      response: this.state.responseString
    };
    const mutation = gql`
      mutation ProbeQueryResponse($id: ID!, $probeId: ID!, $response: String) {
        probeQueryResponse(id: $id, probeId: $probeId, response: $response)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  renderEquipment = () => {
    if (this.props.data.loading || !this.props.data.probes) return null;
    const probes = this.props.data.probes[0];
    const { selectedProbe } = this.state;
    const probe = probes.probes.find(p => p.id === selectedProbe);
    if (!probe) return null;
    return probe.equipment.map(e => (
      <p key={e.id}>
        ({e.count}) {e.name}
      </p>
    ));
  };
  render() {
    if (this.props.data.loading || !this.props.data.probes) return null;
    const probes = this.props.data.probes[0];
    const { selectedProbe } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return (
      <Container fluid className="probe-control-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: PROBES_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  probes: subscriptionData.data.probesUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={3}>
            <div className="scroll probelist">
              {probes.probes.map(p => (
                <p
                  key={p.id}
                  className={`probe ${p.querying ? "querying" : ""}
                  ${p.id === selectedProbe ? "selected" : ""} ${
                    !p.launched ? "text-danger" : ""
                  }`}
                  onClick={() => this.setState({ selectedProbe: p.id })}
                >
                  {p.name}
                  {!p.launched && " - Loaded"}
                </p>
              ))}
            </div>
          </Col>
          {selectedProbe && <Col sm={3}>{this.renderEquipment()}</Col>}
          {selectedProbe && (
            <Col sm={6}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <OutputField
                  style={{ flex: 1, whiteSpace: "pre-wrap" }}
                  alert={
                    probes.probes.find(p => p.id === selectedProbe).querying
                  }
                >
                  {probes.probes.find(p => p.id === selectedProbe).query}
                </OutputField>
                <TypingField
                  style={{ flex: 3, textAlign: "left" }}
                  controlled
                  value={this.state.responseString}
                  onChange={evt =>
                    this.setState({ responseString: evt.target.value })
                  }
                />
                <div>
                  <Button size="sm" onClick={this.response}>
                    Send Response
                  </Button>
                  <Button size="sm" color="danger" onClick={this.destroyProbe}>
                    Destroy
                  </Button>
                </div>
              </div>
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
      torpedo
      probes {
        id
        type
        name
        query
        querying
        response
        launched
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
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(ProbeControl));
