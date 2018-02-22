import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import "./style.css";

const OBJECTIVE_SUB = gql`
  subscription ObjectivesUpdate($simulatorId: ID!) {
    objectiveUpdate(simulatorId: $simulatorId) {
      id
      title
      description
      station
      completed
    }
  }
`;

const Objective = ({ title, description, completed }) => {
  return (
    <div className="objective">
      <div>
        <div className="completed">{completed && <div />}</div>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

class Objectives extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: OBJECTIVE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            objective: subscriptionData.data.objectiveUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  render() {
    const { data: { loading, objective } } = this.props;
    if (loading || !objective) return null;
    return (
      <Container className="objective-card">
        <Row>
          <Col sm={12}>
            <h1>Mission Objectives</h1>
            <Card>
              <CardBody>
                {objective
                  .concat()
                  .reverse()
                  .map(o => <Objective key={o.id} {...o} />)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const OBJECTIVE_QUERY = gql`
  query Objectives($simulatorId: ID!) {
    objective(simulatorId: $simulatorId) {
      id
      title
      description
      station
      completed
    }
  }
`;
export default graphql(OBJECTIVE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Objectives));
