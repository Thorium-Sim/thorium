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
import { Query, graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Form from "./form";
import ReactDOM from "react-dom";
import { Input } from "reactstrap";
import Measure from "react-measure";

import debounce from "helpers/debounce";
import "./style.scss";
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

const Search = ({ location, items, select, boxStyle = {}, listStyle = {} }) => (
  <div
    className="search-box"
    style={{
      left: `${location.left}px`,
      top: `${location.top + location.height}px`,
      ...boxStyle
    }}
  >
    {items.length === 0 && (
      <p className="search-item" style={listStyle}>
        No Results
      </p>
    )}
    {items.map(item => (
      <p
        className="search-item"
        key={item.id}
        onClick={() => select(item)}
        style={listStyle}
      >
        {item.name}
      </p>
    ))}
  </div>
);

class SearchForm extends Component {
  state = { searchQuery: this.props.defaultValue };
  setSearch = debounce((value, client) => {
    if (!value) {
      return this.setState({
        sheets: null,
        searchQuery: value
      });
    }
    if (value.length < 3) return;
    client
      .mutate({
        mutation: gql`
          mutation Search($searchText: String!) {
            googleSheetsFileSearch(searchText: $searchText) {
              id
              name
            }
          }
        `,
        variables: {
          searchText: value
        }
      })
      .then(({ data: { googleSheetsFileSearch } }) =>
        this.setState({ searchQuery: value, sheets: googleSheetsFileSearch })
      );
  }, 500);
  render() {
    const { select = () => {}, inputProps = {}, listProps = {} } = this.props;
    return (
      <>
        <Measure bounds onResize={d => this.setState({ dimensions: d.bounds })}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <Input
                bsSize="sm"
                type="text"
                placeholder="Sheet Search..."
                onChange={e =>
                  this.setSearch(e.target.value, this.props.client)
                }
                value={this.state.searchQuery}
                {...inputProps}
              />
            </div>
          )}
        </Measure>
        {this.state.sheets &&
          ReactDOM.createPortal(
            <Search
              items={this.state.sheets}
              location={this.state.dimensions}
              select={item => {
                select(item);
                this.setState({ sheets: null });
              }}
              {...listProps}
            />,
            document.body
          )}
      </>
    );
  }
}

const SheetPicker = ({ sheet, id, name, select }) => {
  function handleChange(e) {}
  return (
    <Query
      query={gql`
        query Spreadsheet($id: ID!) {
          googleSheetsGetSpreadsheet(spreadsheetId: $id) {
            id
            title
            sheets {
              id
              title
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ loading, data }) => {
        if (loading) return "Loading...";
        const { googleSheetsGetSpreadsheet } = data;
        return (
          <Input
            type="select"
            value={sheet || "nothing"}
            onChange={e => select({ id, name, sheet: e.target.value })}
          >
            <option value="nothing" disabled>
              Choose a sheet.
            </option>
            {googleSheetsGetSpreadsheet.sheets.map(s => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </Input>
        );
        return "hi";
      }}
    </Query>
  );
};

const WrappedSearch = withApollo(SearchForm);
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
  handleSpreadsheetPick = ({ id, name, sheet }) => {
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
        sheetId: sheet
      }
    });
  };
  render() {
    const {
      data: { loading, surveyform }
    } = this.props;
    const { selectedForm } = this.state;
    if (loading || !surveyform) return null;
    const form = surveyform.find(f => f.id === selectedForm);
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
          {form && (
            <>
              <Col sm={3}>
                <Query query={GoogleSheetsQuery}>
                  {({ loading, data: { googleSheets } }) =>
                    googleSheets ? (
                      <div>
                        <h3>Google Sheets Connection</h3>
                        <WrappedSearch
                          defaultValue={form.googleSpreadsheetName}
                          select={this.handleSpreadsheetPick}
                        />
                        {form.googleSpreadsheetName && (
                          <SheetPicker
                            id={form.googleSpreadsheet}
                            name={form.googleSpreadsheetName}
                            sheet={form.googleSheet}
                            select={this.handleSpreadsheetPick}
                          />
                        )}
                        <p>
                          <small>
                            This will transmit form responses to this Google
                            Sheet when the form is submitted.
                          </small>
                        </p>
                      </div>
                    ) : null
                  }
                </Query>
              </Col>
              <Col sm={6}>
                <Form saveForm={this.saveForm} form={form.form} />
              </Col>
            </>
          )}
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
      googleSpreadsheet
      googleSpreadsheetName
      googleSheet
    }
  }
`;

export default graphql(QUERY)(withApollo(Surveys));
