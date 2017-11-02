import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import "./style.css";

const PHASERS_SUB = gql`
  subscription PhasersUpdate($simulatorId: ID!) {
    phasersUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      beams {
        id
        state
        charge
      }
      arc
    }
  }
`;

class PhaserChargingCore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PHASERS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            phasers: subscriptionData.phasersUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  changeArc(value) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation PhaserArc($id: ID!, $arc: Float!) {
        phaserArc(id: $id, arc: $arc)
      }
    `;
    const variables = {
      id: phasers.id,
      arc: value / 90
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  changePhaser(beamId, value) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
      mutation SetBeamCharge($id: ID!, $beamId: ID!, $charge: Float!) {
        setPhaserBeamCharge(id: $id, beamId: $beamId, charge: $charge)
      }
    `;
    const variables = {
      id: phasers.id,
      beamId,
      charge: value / 100
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading) return null;
    const phasers = this.props.data.phasers[0];
    if (!phasers) return <p>No phasers</p>;
    return (
      <Container fluid className="phasers-core">
        <Row>
          <Col sm={4}>Arc:</Col>
          <Col sm={8}>
            <InputField
              prompt="What would you like to change the arc to?"
              onClick={this.changeArc.bind(this)}
            >
              {Math.round(phasers.arc * 90)}˚
            </InputField>
          </Col>
        </Row>
        {phasers.beams.map((b, i) => {
          return (
            <Row key={`${b.id}-${i}`}>
              <Col sm={4}>{i}:</Col>
              <Col sm={8}>
                <InputField
                  prompt="What would you like to change the charge to?"
                  onClick={this.changePhaser.bind(this, b.id)}
                  alert={b.state === "firing"}
                >
                  {Math.round(b.charge * 100)}%
                </InputField>
              </Col>
            </Row>
          );
        })}
      </Container>
    );
  }
}

const PHASERS_QUERY = gql`
  query Phasers($simulatorId: ID!) {
    phasers(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      beams {
        id
        state
        charge
      }
      arc
    }
  }
`;

export default graphql(PHASERS_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(PhaserChargingCore));
