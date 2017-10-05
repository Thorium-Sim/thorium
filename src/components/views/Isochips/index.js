import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col } from "reactstrap";
import { graphql, withApollo } from "react-apollo";

import "./style.scss";

const ISOCHIPS_SUB = gql`
  subscription IsochipsUpdate($simulatorId: ID) {
    isochipsUpdate(simulatorId: $simulatorId) {
      id
      label
      state
      slot
      system {
        id
        name
      }
    }
  }
`;

class Isochips extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: ISOCHIPS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            template: subscriptionData.data.templateUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    if (this.props.data.loading) return null;
    const { isochips } = this.props.data;
    return (
      <Container className="isochips">
        <Row>
          {isochips.map(i =>
            <Col key={i.id} sm={2}>
              <Isochip {...i} />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const Isochip = ({ state, system: { displayName }, label }) => {
  return (
    <div className="isochip-container">
      <label>
        {displayName}
      </label>
      <div className={`state ${state}`} />
      <label>
        {label}
      </label>
    </div>
  );
};

const ISOCHIPS_QUERY = gql`
  query Isochips($simulatorId: ID) {
    isochips(simulatorId: $simulatorId) {
      id
      label
      state
      slot
      system {
        id
        displayName
      }
    }
  }
`;
export default graphql(ISOCHIPS_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Isochips));
