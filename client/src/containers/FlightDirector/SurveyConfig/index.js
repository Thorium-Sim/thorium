import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Form from "./form";
import "./style.scss";

const SUB = gql`
  subscription SurveyFormsUpdate {
    surveyformUpdate(simulatorId: null, active: false) {
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
      simulatorId
    }
  }
`;

class Surveys extends Component {
  state = {};
  createForm = () => {
    const name = window.prompt("What is the title of the form?");
    if (!name) return;
    const mutation = gql`
      mutation CreateForm($name: String!) {
        createSurveyForm(name: $name)
      }
    `;
    const variables = {
      name
    };
    this.props.client
      .mutate({
        mutation,
        variables
      })
      .then(({ data }) => {
        this.setState({ selectedForm: data && data.createSurveyForm });
      });
  };
  removeForm = () => {
    if (!window.confirm("Are you sure you want to delete this survey?")) return;
    const { selectedForm: id } = this.state;
    const mutation = gql`
      mutation RemoveForm($id: ID!) {
        removeSurveyForm(id: $id)
      }
    `;
    const variables = {
      id
    };
    this.setState({
      selectedForm: null
    });
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  saveForm = form => {
    const { selectedForm: id } = this.state;
    const mutation = gql`
      mutation SaveForm($id: ID!, $form: [FormFieldsInput]!) {
        updateSurveyForm(id: $id, form: $form)
      }
    `;
    const variables = {
      id,
      form: form.map(
        ({
          id: formId,
          description,
          title,
          min,
          max,
          options,
          type,
          value
        }) => {
          return {
            id: formId,
            description,
            title,
            min,
            max,
            type,
            value,
            options: options.map(o => ({ id: o.id, label: o.label }))
          };
        }
      )
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      data: { loading, surveyform }
    } = this.props;
    const { selectedForm } = this.state;
    if (loading || !surveyform) return null;
    return (
      <Container fluid className="survey-forms">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  surveyform: subscriptionData.data.surveyformUpdate
                });
              }
            })
          }
        />
        <h4>Survey Config </h4>

        <Row>
          <Col sm={3}>
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "scroll"
              }}
            >
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
            <Button color="success" block onClick={this.createForm}>
              Create Form
            </Button>
            {selectedForm && (
              <Button color="danger" block onClick={this.removeForm}>
                Remove Form
              </Button>
            )}
          </Col>
          <Col sm={9}>
            {selectedForm && (
              <Form
                saveForm={this.saveForm}
                form={
                  surveyform.find(f => f.id === selectedForm) &&
                  surveyform.find(f => f.id === selectedForm).form
                }
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query SurveyForms {
    surveyform(simulatorId: null, active: false) {
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
      simulatorId
    }
  }
`;

export default graphql(QUERY)(withApollo(Surveys));
