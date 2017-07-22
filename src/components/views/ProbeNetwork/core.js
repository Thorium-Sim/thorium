import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import './style.scss';

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
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ probes: subscriptionData.data.probesUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    return (
      <Container className="probe-network-core">
        <Row>
          <Col sm={{ size: 2, offset: 5 }}>
            <p>1</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 2 }}>
            <p>8</p>
          </Col>
          <Col sm={{ size: 2, offset: 4 }}>
            <p>2</p>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p>7</p>
          </Col>
          <Col sm={{ size: 6, offset: 1 }}>
            <Button block color="danger" size="sm">
              Destroy
            </Button>
          </Col>
          <Col sm={{ size: 2, offset: 1 }}>
            <p>3</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 2 }}>
            <p>6</p>
          </Col>
          <Col sm={{ size: 2, offset: 4 }}>
            <p>4</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 2, offset: 5 }}>
            <p>5</p>
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
