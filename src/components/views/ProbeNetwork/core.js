import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import "./style.css";

const PROBES_SUB = gql`
  subscription ProbesSub($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      processedData
      probes(network: true) {
        id
        name
        launched
      }
    }
  }
`;

class ProbeNetworkCore extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
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
  destroyProbe = probe => {
    if (
      window.confirm(`Are you sure you want to destroy this probe: ${probe}`)
    ) {
      const mutation = gql`
        mutation DestroyProbe($id: ID!, $probeId: ID!) {
          destroyProbe(id: $id, probeId: $probeId)
        }
      `;
      if (probe === "all") {
        Array(8)
          .fill(1)
          .forEach((_, probeNum) => {
            const probeObj = this.props.data.probes[0].probes.find(
              p => p.name === (probeNum + 1).toString()
            );
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
          });
      } else {
        const probeObj = this.props.data.probes[0].probes.find(
          p => p.name === probe.toString()
        );
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
    }
  };
  render() {
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0].probes;
    const network = {};
    probes.forEach(p => (network[p.name] = p.launched));
    return (
      <Container className="probe-network-core">
        <Row>
          <Col sm={{ size: 2, offset: 5 }}>
            <p
              onClick={() => this.destroyProbe(1)}
              className={network[1] ? "on" : ""}
            >
              1
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 2 }}>
            <p
              onClick={() => this.destroyProbe(8)}
              className={network[8] ? "on" : ""}
            >
              8
            </p>
          </Col>
          <Col sm={{ size: 2, offset: 4 }}>
            <p
              onClick={() => this.destroyProbe(2)}
              className={network[2] ? "on" : ""}
            >
              2
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p
              onClick={() => this.destroyProbe(7)}
              className={network[7] ? "on" : ""}
            >
              7
            </p>
          </Col>
          <Col sm={{ size: 6, offset: 1 }}>
            <Button
              block
              color="danger"
              size="sm"
              onClick={() => this.destroyProbe("all")}
            >
              Destroy
            </Button>
          </Col>
          <Col sm={{ size: 2, offset: 1 }}>
            <p
              onClick={() => this.destroyProbe(3)}
              className={network[3] ? "on" : ""}
            >
              3
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 2 }}>
            <p
              onClick={() => this.destroyProbe(6)}
              className={network[6] ? "on" : ""}
            >
              6
            </p>
          </Col>
          <Col sm={{ size: 2, offset: 4 }}>
            <p
              onClick={() => this.destroyProbe(4)}
              className={network[4] ? "on" : ""}
            >
              4
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 5 }}>
            <p
              onClick={() => this.destroyProbe(5)}
              className={network[5] ? "on" : ""}
            >
              5
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const PROBE_NETWORK_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      processedData
      probes(network: true) {
        id
        name
        launched
      }
    }
  }
`;

export default graphql(PROBE_NETWORK_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ProbeNetworkCore));
