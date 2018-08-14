import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Button } from "reactstrap";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const SUB = gql`
  subscription SurveyFormsUpdate($simulatorId: ID) {
    surveyformUpdate(simulatorId: $simulatorId) {
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
        name
        client
        station
        form {
          id
          value
        }
      }
    }
  }
`;

class SurveyCore extends Component {
  state = {};
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
  downloadResults = s => {
    // Map the results
    const results = [];
    results.push(
      ["Name", "Station", "Client"].concat(s.form.map(f => f.title))
    );
    s.results
      .map(r =>
        [r.name, r.station, r.client].concat(
          r.form.map(f => {
            if (s.form.find(m => m.id === f.id)) {
              const option = s.form
                .find(m => m.id === f.id)
                .options.find(o => o.id === f.value);
              if (option) {
                return option.label;
              }
            }
            if (parseInt(f.value, 10)) {
              return parseInt(f.value, 10);
            }
            return f.value;
          })
        )
      )
      .forEach(a => {
        results.push(a);
      });
    let csvContent = "data:text/csv;charset=utf-8,";
    results.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.classList.add("hidden");
    link.setAttribute("download", `${s.title}.csv`);
    document.body.appendChild(link);

    link.click();
  };
  endSurvey = e => {};
  render() {
    const {
      data: { loading, surveyform, allForms }
    } = this.props;
    if (loading || !surveyform || !allForms) return null;
    return (
      <Container className="surveyForm-card">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  surveyform: subscriptionData.data.surveyformUpdate
                });
              }
            })
          }
        />
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
            {surveyform.map(s => (
              <Row key={`${s.id}-running`}>
                <Col>
                  <p>{s.title}</p>
                </Col>
                <Col>
                  <p>{s.results.length}</p>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => this.downloadResults(s)}
                  >
                    Results (CSV)
                  </Button>
                </Col>
                {/* {<Col>
                  <Button size="sm" color="danger">
                    End
                  </Button>
                </Col>} */}
              </Row>
            ))}
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
    surveyform(simulatorId: $simulatorId) {
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
        name
        client
        station
        form {
          id
          value
        }
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
