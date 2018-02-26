import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Form from "./form";
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

class SurveyForm extends Component {
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
  renderSurvey = surveyform => {
    const { selectedForm } = this.state;
    if (surveyform.length === 0) {
      return (
        <div className="center-all">
          <h1>No survey in progress.</h1>
        </div>
      );
    }
    if (surveyform.length > 1 && !selectedForm) {
      return (
        <div className="center-all">
          <h2>Select a survey.</h2>
          <ListGroup>
            {surveyform.map(s => (
              <ListGroupItem
                key={s.id}
                active={selectedForm === s.id}
                tag="button"
                action
                onClick={() => this.setState({ selectedForm: s.id })}
              >
                {s.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      );
    }
    return (
      <Form
        form={surveyform.find(s => s.id === selectedForm) || surveyform[0]}
        clientId={this.props.clientObj.id}
        client={this.props.client}
      />
    );
  };
  render() {
    const { data: { loading, surveyform }, clientObj } = this.props;
    if (loading || !surveyform) return null;
    return (
      <Container className="surveyForm-card">
        <Row>
          <Col sm={12}>
            {this.renderSurvey(
              surveyform.filter(s => {
                return !s.results.find(r => r.client === clientObj.id);
              })
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query SurveyForms($simulatorId: ID!) {
    surveyform(simulatorId: $simulatorId, active: true) {
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
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(SurveyForm));
