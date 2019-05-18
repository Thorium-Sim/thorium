import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo, Mutation } from "react-apollo";
import { Container, Row, Col, Input, FormGroup, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const OBJECTIVE_SUB = gql`
  subscription ObjectivesUpdate($simulatorId: ID!) {
    objectiveUpdate(simulatorId: $simulatorId) {
      id
      title
      description
      station
      completed
      cancelled
      crewComplete
    }
  }
`;

const Objective = ({
  id,
  title,
  description,
  completed,
  cancelled,
  client,
  crewComplete
}) => {
  const complete = (e, cancel) => {
    const completed = e.target ? e.target.checked : e;
    const mutation = gql`
      mutation CompleteObjective($id: ID!, $state: Boolean, $cancel: Boolean) {
        completeObjective(id: $id, state: $state, cancel: $cancel)
      }
    `;
    const variables = {
      id,
      state: completed,
      cancel: cancel === true
    };
    client.mutate({
      mutation,
      variables
    });
  };
  return (
    <div className="objective">
      <div>
        <div>
          <label>
            <input type="checkbox" checked={completed} onClick={complete} />{" "}
            Complete
          </label>
        </div>
        <Button
          disabled={completed}
          size="sm"
          color="warning"
          onClick={() => complete(true, true)}
        >
          Cancel
        </Button>
        <div>
          <label>
            <Mutation
              mutation={gql`
                mutation SetObjectiveCrewComplete(
                  $id: ID!
                  $crewComplete: Boolean!
                ) {
                  objectiveSetCrewComplete(id: $id, crewComplete: $crewComplete)
                }
              `}
            >
              {action => (
                <input
                  type="checkbox"
                  checked={crewComplete}
                  onChange={e =>
                    action({
                      variables: { id, crewComplete: e.target.checked }
                    })
                  }
                />
              )}
            </Mutation>{" "}
            Allow Crew Check Off
          </label>
        </div>
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <strong style={{ textDecoration: cancelled ? "line-through" : "" }}>
          {title}
        </strong>
        <p>{description}</p>
      </div>
    </div>
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
              .map(o => (
                <Objective key={o.id} {...o} client={client} />
              ))}
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
      cancelled
      crewComplete
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
