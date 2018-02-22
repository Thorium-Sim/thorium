import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, FormGroup } from "reactstrap";
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

const Objective = ({ id, title, description, completed, client }) => {
  const complete = () => {
    const mutation = gql`
      mutation CompleteObjective($id: ID!) {
        completeObjective(id: $id)
      }
    `;
    const variables = {
      id
    };
    client.mutate({
      mutation,
      variables
    });
  };
  return (
    <Row className="objective">
      <Col sm={2}>
        <FormGroup check>
          <Input
            type="checkbox"
            checked={completed}
            disabled={completed}
            onClick={complete}
          />
        </FormGroup>
      </Col>
      <Col sm={10}>
        <strong>{title}</strong>
        <p>{description}</p>
      </Col>
    </Row>
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
    const { data: { loading, objective }, client } = this.props;
    if (loading || !objective) return null;
    return (
      <Container className="objective-core">
        <Row>
          <Col sm={12}>
            {objective
              .concat()
              .reverse()
              .map(o => <Objective key={o.id} {...o} client={client} />)}
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
