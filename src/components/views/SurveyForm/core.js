import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input } from "reactstrap";
import "./style.css";

const SUB = gql`
  subscription SurveyFormsUpdate($simulatorId: ID) {
    surveyformUpdate(simulatorId: $simulatorId, active: true) {
      id
      form {
        id
        type
        title
        value
        options {
          id
          label
        }
        description
        min
        max
      }
      title
      results {
        client
      }
    }
  }
`;

class SurveyCore extends Component {
  state = {};
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            surveyform: subscriptionData.data.surveyformUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  startSurvey = e => {
    const mutation = gql`
      mutation TriggerSurvey($simulatorId: ID!, $id: ID!) {
        triggerSurvey(simulatorId: $simulatorId, id: $id)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      id: e.target.value
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { data: { loading, surveyform, allForms } } = this.props;
    if (loading || !surveyform || !allForms) return null;
    console.log(surveyform);
    return (
      <Container className="surveyForm-card">
        <Row>
          <Col sm={12}>
            <Input type="select" value="nothing" onChange={this.startSurvey}>
              <option value="nothing" disabled>
                Start a new survey
              </option>
              {allForms.map(f => (
                <option key={`${f.id}-all`} value={f.id}>
                  {f.title}
                </option>
              ))}
            </Input>
            <p>
              <strong>Running Surveys:</strong>
            </p>
            {surveyform.map(s => <p key={`${s.id}-running`}>{s.title}</p>)}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query SurveyForms($simulatorId: ID!) {
    allForms: surveyform {
      id
      title
    }
    surveyform(simulatorId: $simulatorId, active: true) {
      id
      title
      results {
        client
      }
    }
  }
`;
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(SurveyCore));
