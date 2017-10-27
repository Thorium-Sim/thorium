import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button } from "reactstrap";

const TARGETING_SUB = gql`
  subscription TargetingUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
      id
      type
      name
      quadrants
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      contacts {
        id
        quadrant
        icon
        size
        name
        speed
        system
        iconUrl
        picture
        targeted
        pictureUrl
      }
    }
  }
`;

class Targeting extends Component {
  targetingSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.targetingSubscription && !nextProps.data.loading) {
      this.targetingSubscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            targeting: subscriptionData.data.targetingUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.targetingSubscription && this.targetingSubscription();
  }
  render() {
    if (this.props.data.loading) return null;
    const targeting = this.props.data.targeting[0];
    if (!targeting) return <p>No Targeting</p>;

    return (
      <Container className="targeting-coord">
        <Row>
          <Col sm={5}>
            <h4>Coordinates</h4>
          </Col>
          <Col sm={3}>
            <h4>Targeted</h4>
          </Col>
          <Col sm={4}>
            <h4>Fire Control</h4>
          </Col>
        </Row>
      </Container>
    );
  }
}

const TARGETING_QUERY = gql`
  query Targeting($simulatorId: ID) {
    targeting(simulatorId: $simulatorId) {
      id
      type
      name
      quadrants
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      contacts {
        id
        quadrant
        icon
        size
        name
        speed
        system
        iconUrl
        picture
        targeted
        pictureUrl
      }
    }
  }
`;

export default graphql(TARGETING_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(Targeting));
