import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {useQuery} from "@apollo/client";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {Query, withApollo} from "react-apollo";
import Form from "./form";
import "./style.scss";
import Search, {SheetPicker} from "./sheets";
const GoogleSheetsQuery = gql`
  query HasToken {
    googleSheets
  }
`;

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
      googleSpreadsheet
      googleSpreadsheetName
      googleSheet
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
      googleSpreadsheet
      googleSpreadsheetName
      googleSheet
    }
  }
`;

const Surveys = ({client}) => {
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
      name,
    };
    client
      .mutate({
        mutation,
        variables,
      })
      .then(({data}) => {
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
      id: selectedForm,
    };
    setSelectedForm(null);

    client.mutate({
      mutation,
      variables,
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
        ({id: formId, description, title, min, max, options, type, value}) => {
          return {
            id: formId,
            description,
            title,
            min,
            max,
            type,
            value,
            options: options.map(o => ({id: o.id, label: o.label})),
          };
        },
      ),
    };
    client.mutate({
      mutation,
      variables,
    });
  };

  const handleSpreadsheetPick = ({id, name, sheet}) => {
    this.props.client.mutate({
      mutation: gql`
        mutation SetSpreadsheet(
          $id: ID!
          $spreadsheetId: ID
          $spreadsheetName: String
          $sheetId: ID
        ) {
          setSurveyFormGoogleSheet(
            id: $id
            spreadsheetId: $spreadsheetId
            spreadsheetName: $spreadsheetName
            sheetId: $sheetId
          )
        }
      `,
      variables: {
        id: this.state.selectedForm,
        spreadsheetId: id,
        spreadsheetName: name,
        sheetId: sheet,
      },
    });
  };
  const handleImport = evt => {
    const data = new FormData();
    Array.from(evt.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f),
    );
    fetch(`/importSurveyForms`, {
      method: "POST",
      body: data,
    }).then(() => {
      window.location.reload();
    });
  };

  const {loading, data, subscribeToMore} = useQuery(QUERY);
  const config = React.useMemo(
    () => ({
      updateQuery: (previousResult, {subscriptionData}) => {
        return Object.assign({}, previousResult, {
          surveyform: subscriptionData.data.surveyformUpdate,
        });
      },
    }),
    [],
  );
  useSubscribeToMore(subscribeToMore, SUB, config);
  if (loading || !data) return null;
  const {surveyform} = data;
  const form = surveyform.find(f => f.id === selectedForm);

  return (
    <Container fluid className="survey-forms">
      <h4>Survey Config </h4>

      <Row>
        <Col sm={3}>
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "scroll",
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
            <>
              <Button color="danger" block onClick={removeForm}>
                Remove Form
              </Button>
              <Button
                size="sm"
                tag="a"
                href={`/exportSurveyForms/${selectedForm}`}
                block
                color="info"
              >
                Export Survey
              </Button>
            </>
          )}
          <label style={{display: "block"}}>
            <div className="btn btn-info btn-sm btn-block">Import Survey</div>
            <input type="file" hidden onChange={handleImport} />
          </label>
        </Col>
        {form && (
          <>
            <Col sm={3}>
              <Query query={GoogleSheetsQuery}>
                {({loading, data}) => {
                  if (loading || !data) return null;
                  const {googleSheets} = data;
                  if (!googleSheets) return null;
                  return (
                    <div>
                      <h3>Google Sheets Connection</h3>
                      <Search
                        defaultValue={form.googleSpreadsheetName}
                        select={handleSpreadsheetPick}
                      />
                      {form.googleSpreadsheetName && (
                        <SheetPicker
                          id={form.googleSpreadsheet}
                          name={form.googleSpreadsheetName}
                          sheet={form.googleSheet}
                          select={handleSpreadsheetPick}
                        />
                      )}
                      <p>
                        <small>
                          This will transmit form responses to this Google Sheet
                          when the form is submitted.
                        </small>
                      </p>
                    </div>
                  );
                }}
              </Query>
            </Col>
            <Col sm={6}>
              <Form saveForm={saveForm} form={form.form} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default withApollo(Surveys);
