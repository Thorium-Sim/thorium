import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, FormGroup, Button } from "reactstrap";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

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
  addObjective = () => {
    const title = window.prompt("What is the title of the objective?");
    if (!title) return;
    const description = window.prompt(
      "What is the description of the objective? (May be blank)"
    );
    const mutation = gql`
      mutation CreateObjective(
        $simulatorId: ID!
        $title: String!
        $description: String
      ) {
        addObjective(
          objective: {
            title: $title
            description: $description
            simulatorId: $simulatorId
          }
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      title,
      description
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      data: { loading, objective },
      client
    } = this.props;
    if (loading || !objective) return null;
    return (
      <Container className="objective-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: OBJECTIVE_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  objective: subscriptionData.data.objectiveUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={12}>
            <Button color="success" size="sm" block onClick={this.addObjective}>
              Add New Objective
            </Button>
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
