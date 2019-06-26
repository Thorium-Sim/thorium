import React, { Component } from "react";
import { Input, Button } from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
class Scanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: props.scanrequest
    };
  }
  render() {
    const { sickbayId, id, scanning, scanResults } = this.props;
    const { request } = this.state;
    return (
      <div className="scanning action-container">
        <h4>Scanning</h4>
        <Input
          placeholder="Type your scan request here."
          type="textarea"
          rows={3}
          value={request}
          onChange={e => this.setState({ request: e.target.value })}
          disabled={scanning}
        />
        <p>Results</p>
        <Input
          type="textarea"
          rows={5}
          value={scanning ? "Scanning..." : scanResults}
          readOnly
        />
        {scanning ? (
          <Mutation
            mutation={gql`
              mutation CancelScan($id: ID!, $bunkId: ID!) {
                cancelSickbayBunkScan(id: $id, bunkId: $bunkId)
              }
            `}
            variables={{ bunkId: id, id: sickbayId }}
          >
            {cancel => (
              <Button color="danger" block onClick={cancel}>
                Cancel Scan
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation
            mutation={gql`
              mutation BeginScan($id: ID!, $bunkId: ID!, $request: String!) {
                scanSickbayBunk(id: $id, bunkId: $bunkId, request: $request)
              }
            `}
            variables={{ bunkId: id, id: sickbayId, request }}
          >
            {scan => (
              <Button color="primary" block onClick={scan} disabled={!request}>
                Begin Scan
              </Button>
            )}
          </Mutation>
        )}
      </div>
    );
  }
}

export default Scanning;
