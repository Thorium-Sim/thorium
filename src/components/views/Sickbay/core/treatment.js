import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import { TypingField } from "../../../generic/core";
import { titleCase } from "change-case";
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
          <small style={{ flex: 3, display: "inline-block" }}>
            You can use some hashtags to make your report dynamic:<ul>
              <li>
                <strong>#COLOR</strong> - a random color of red, green, blue,
                yellow
              </li>
              <li>
                <strong>#[1 - 2]</strong> - a random whole number between the
                two listed numbers
              </li>
              <li>
                <strong>#["string1", "string2", "string3", etc.]</strong> - a
                random string from the list provided
              </li>
            </ul>
          </small>
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

          {/* <select
        value={"answers"}
        onChange={this.scanPreset}
        style={{ flexGrow: 4, maxWidth: 100 }}
      >
        <option value={"answers"} disabled>
          Answers
        </option>
        {ScanPresets.map(p => (
          <option key={p.label} value={p.value}>
            {p.label}
          </option>
        ))}
      </select> */}
        </div>
      </Fragment>
    );
  }
}
export default Treatment;
