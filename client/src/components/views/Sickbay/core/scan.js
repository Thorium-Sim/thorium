import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import { OutputField, TypingField } from "../../../generic/core";
import ScanPresets from "../../Sensors/ScanPresets";

class Scan extends Component {
  state = { dataField: "" };
  scanPreset = evt => {
    let dataField = evt.target.value;
    if (dataField === "omnicourse") {
      dataField = `Course Calculated:
      X: ${Math.round(Math.random() * 100000) / 100}
      Y: ${Math.round(Math.random() * 100000) / 100}
      Z: ${Math.round(Math.random() * 100000) / 100}`;
    }
    this.setState({
      dataField
    });
  };
  render() {
    const { scanning, scanRequest, sickbayId, id } = this.props;
    const { dataField } = this.state;
    return (
      <Fragment>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <OutputField
            style={{ flexGrow: 2, minHeight: "44px" }}
            alert={scanning}
          >
            {scanRequest}
          </OutputField>
          <TypingField
            style={{ flexGrow: 6, minHeight: "44px" }}
            controlled
            onChange={e => {
              this.setState({ dataField: e.target.value });
            }}
            value={dataField}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Mutation
            mutation={gql`
              mutation BunkScanResult(
                $id: ID!
                $bunkId: ID!
                $response: String!
              ) {
                sickbayBunkScanResponse(
                  id: $id
                  bunkId: $bunkId
                  response: $response
                )
              }
            `}
            variables={{
              id: sickbayId,
              bunkId: id,
              response: dataField
            }}
          >
            {action => (
              <Button onClick={action} style={{ flexGrow: 2 }} size={"sm"}>
                Send
              </Button>
            )}
          </Mutation>
          <select
            value={"answers"}
            onChange={this.scanPreset}
            style={{ flexGrow: 4, maxWidth: 100 }}
          >
            <option value={"answers"} disabled>
              Answers
            </option>
            {ScanPresets().map(p => (
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </Fragment>
    );
  }
}
export default Scan;
