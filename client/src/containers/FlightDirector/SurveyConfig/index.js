import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import gql from "graphql-tag.macro";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";
import { withApollo } from "react-apollo";
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

const Surveys = ({ client }) => {
  const [selectedForm, setSelectedForm] = React.useState(null);
  const createForm = () => {
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
    client
      .mutate({
        mutation,
        variables
      })
      .then(({ data }) => {
        setSelectedForm(data && data.createSurveyForm);
      });
  };
  const removeForm = () => {
    if (!window.confirm("Are you sure you want to delete this survey?")) return;
    const mutation = gql`
      mutation RemoveForm($id: ID!) {
        removeSurveyForm(id: $id)
      }
    `;
    const variables = {
      id: selectedForm
    };
    setSelectedForm(null);

    client.mutate({
      mutation,
      variables
    });
  };
  const saveForm = form => {
    const mutation = gql`
      mutation SaveForm($id: ID!, $form: [FormFieldsInput]!) {
        updateSurveyForm(id: $id, form: $form)
      }
    `;
    const variables = {
      id: selectedForm,
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
    client.mutate({
      mutation,
      variables
    });
  };
  const { loading, data, subscribeToMore } = useQuery(QUERY);
  useSubscribeToMore(subscribeToMore, SUB, {
    updateQuery: (previousResult, { subscriptionData }) => {
      return Object.assign({}, previousResult, {
        surveyform: subscriptionData.data.surveyformUpdate
      });
    }
  });
  if (loading || !data) return null;
  const { surveyform } = data;
  return (
    <Container fluid className="survey-forms">
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
                  onClick={() => setSelectedForm(s.id)}
                >
                  {s.title}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
          <Button color="success" block onClick={createForm}>
            Create Form
          </Button>
          {selectedForm && (
            <Button color="danger" block onClick={removeForm}>
              Remove Form
            </Button>
          )}
        </Col>
        <Col sm={9}>
          {selectedForm && (
            <Form
              saveForm={saveForm}
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
};

export default withApollo(Surveys);
