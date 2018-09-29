import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FormattedMessage } from "react-intl";

import SubscriptionHelper from "helpers/subscriptionHelper";
import Tour from "helpers/tourHelper";

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
    }
  }
`;

const Objective = ({ title, description, completed, cancelled }) => {
  return (
    <div className="objective">
      <div>
        <div className="completed">{completed && <div />}</div>
      </div>
      <div>
        <h3 style={{ textDecoration: cancelled ? "line-through" : "" }}>
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const trainingSteps = [
  {
    selector: ".objective-card",
    content: (
      <FormattedMessage
        id="objectives-training-1"
        defaultMessage="During your mission you will have different objectives or goals you need to complete.  Objectives will appear with a title, and a description."
      />
    )
  },
  {
    selector: ".objective-card",
    content: (
      <FormattedMessage
        id="objectives-training-2"
        defaultMessage="When an objective is completed, the circle next to it will be filled. When an objective is changed, a line will strike through the title of the objective. Check back often to remember your objectives so you can work toward their completion."
      />
    )
  }
];

class Objectives extends Component {
  render() {
    const {
      data: { loading, objective }
    } = this.props;
    if (loading || !objective) return null;
    return (
      <Container className="objective-card">
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
            <h1>
              <FormattedMessage
                id="mission-objectives"
                defaultMessage="Mission Objectives"
              />
            </h1>
            <Card>
              <CardBody>
                {objective
                  .concat()
                  .reverse()
                  .map(o => (
                    <Objective key={o.id} {...o} />
                  ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
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
