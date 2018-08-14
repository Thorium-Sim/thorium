import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

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
  state = {};
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
    if (this.props.data.loading || !this.props.data.phasers) return null;
    const phasers = this.props.data.phasers[0];
    if (!phasers) return <p>No phasers</p>;
    return (
      <Container fluid className="phasers-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: PHASERS_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  phasers: subscriptionData.data.phasersUpdate
                });
              }
            })
          }
        />
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
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(PhaserChargingCore));
