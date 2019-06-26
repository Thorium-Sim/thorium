import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Button } from "helpers/reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
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
  startSurvey = () => {
    const mutation = gql`
      mutation TriggerSurvey($simulatorId: ID!, $id: ID!) {
        triggerSurvey(simulatorId: $simulatorId, id: $id)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      id: this.state.survey
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({ survey: null });
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
                .options.filter(o => f.value.split(",").includes(o.id))
                .map(o => o.label)
                .join("; ");
              if (option) {
                return option;
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
      <Container className="surveyForm-core">
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
            <div style={{ display: "flex" }}>
              <Input
                type="select"
                value={this.state.survey || "nothing"}
                onChange={e => this.setState({ survey: e.target.value })}
              >
                <option value="nothing" disabled>
                  Choose a new survey
                </option>
                {allForms.map(f => (
                  <option key={`${f.id}-all`} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </Input>
              <Button
                disabled={!this.state.survey}
                size="sm"
                color="success"
                onClick={this.startSurvey}
              >
                Start
              </Button>
            </div>
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
