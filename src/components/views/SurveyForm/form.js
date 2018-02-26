import React, { Component } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import * as Components from "../../../containers/FlightDirector/SurveyConfig/components";
class Form extends Component {
  state = {
    currentForm: 0,
    responses: [],
    submitted: false
  };
  submit = () => {
    const mutation = gql`
      mutation SubmitSurveyResults(
        $id: ID!
        $client: String
        $form: [FormFieldsInput]!
      ) {
        surveyFormResponse(id: $id, response: { client: $client, form: $form })
      }
    `;
    const variables = {
      id: this.props.form.id,
      client: this.props.clientId,
      form: this.state.responses.map((r, i) => {
        const form = this.props.form.form[i];
        return { id: form.id, value: r };
      })
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      submitted: true
    });
  };
  render() {
    const { form } = this.props;
    console.log(form);
    const { currentForm, responses, submitted } = this.state;
    const formItem = form.form[currentForm];
    const Comp = Components[formItem.type];
    return (
      <div>
        <h1 className="text-center">{form.title}</h1>
        <Card style={{ minHeight: "55vh" }}>
          <CardBody
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            {submitted ? (
              <h1>Thank you for your response.</h1>
            ) : (
              <div>
                <h3>{formItem.title}</h3>
                <p>{formItem.description}</p>
                <div style={{ width: "80%" }}>
                  <Comp
                    survey
                    {...formItem}
                    value={responses[currentForm]}
                    updateValue={e => {
                      const newResponses = responses.concat();
                      newResponses[currentForm] = e;
                      this.setState({
                        responses: newResponses
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        {!submitted && (
          <Row>
            <Col sm={3}>
              <Button
                disabled={currentForm === 0}
                color="primary"
                size="lg"
                block
                onClick={() => {
                  this.setState({
                    currentForm: currentForm - 1
                  });
                }}
              >
                Previous
              </Button>
            </Col>
            <Col sm={{ size: 4, offset: 1 }}>
              {currentForm === form.form.length - 1 &&
                responses.find(c => c === null) && (
                  <p className="text-danger">
                    Please respond to all of the questions.
                  </p>
                )}
              {responses.length === form.form.length && (
                <Button color="success" block size="lg" onClick={this.submit}>
                  Submit
                </Button>
              )}
            </Col>
            <Col sm={{ size: 3, offset: 1 }}>
              <Button
                disabled={currentForm === form.form.length - 1}
                color="primary"
                size="lg"
                block
                onClick={() => {
                  this.setState({
                    currentForm: currentForm + 1
                  });
                }}
              >
                Next
              </Button>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Form;
