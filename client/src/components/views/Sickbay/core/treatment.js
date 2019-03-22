import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button } from "reactstrap";
import { TypingField } from "../../../generic/core";
import { titleCase } from "change-case";
import HashtagDefinition from "helpers/hashtagDefinition";

class Treatment extends Component {
  constructor(props) {
    super(props);
    const { chart } = props;
    this.state = {
      treatment: chart.treatment
    };
  }
  loadReport = e => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      this.setState({
        treatment: result
      });
    };
    e.target.files[0] && reader.readAsText(e.target.files[0]);
  };
  render() {
    const { treatment } = this.state;
    const { chart, patient, simulator } = this.props;
    return (
      <Fragment>
        <p>
          <strong>Symptoms:</strong>{" "}
          {chart.symptoms && chart.symptoms.map(titleCase).join(", ")}
        </p>
        <p>
          <strong>Diagnosis: </strong>{" "}
          {chart.diagnosis && chart.diagnosis.map(titleCase).join(", ")}
        </p>
        <p className={chart.treatmentRequest ? "text-danger" : ""}>
          <strong>Treatment: </strong>
        </p>
        <div
          style={{
            display: "flex",
            minHeight: "44px",
            flexGrow: 1
          }}
        >
          <TypingField
            style={{
              height: "auto",
              flex: 5,
              textAlign: "left"
            }}
            controlled
            onChange={e => {
              this.setState({ treatment: e.target.value });
            }}
            value={treatment}
          />
          <HashtagDefinition />
        </div>
        <div style={{ display: "flex" }}>
          <Mutation
            mutation={gql`
              mutation SetBunkTreatment(
                $simulatorId: ID!
                $crewId: ID!
                $treatment: String!
              ) {
                updatePatientChart(
                  simulatorId: $simulatorId
                  crewId: $crewId
                  chart: { treatment: $treatment }
                )
              }
            `}
            variables={{
              crewId: patient && patient.id,
              simulatorId: simulator.id,
              treatment
            }}
          >
            {action => (
              <Button onClick={action} style={{ flexGrow: 2 }} size={"sm"}>
                Send
              </Button>
            )}
          </Mutation>
          <label
            htmlFor="fileInput"
            style={{ flexGrow: 1, display: "inline-block" }}
          >
            <Button tag="div" color="info" block size="sm">
              File
            </Button>
          </label>
          <input
            id="fileInput"
            type="file"
            hidden
            value={[]}
            onChange={this.loadReport}
          />
        </div>
      </Fragment>
    );
  }
}
export default Treatment;
