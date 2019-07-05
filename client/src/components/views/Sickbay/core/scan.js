import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button } from "helpers/reactstrap";
import { OutputField, TypingField } from "../../../generic/core";
import ScanPresets from "../../Sensors/ScanPresets";

class Scan extends Component {
  state = { dataField: "" };
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
          <ScanPresets
            style={{ flexGrow: 4, maxWidth: 100 }}
            onChange={e =>
              this.setState({
                dataField: e
              })
            }
          />
        </div>
      </Fragment>
    );
  }
}
export default Scan;
