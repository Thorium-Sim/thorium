import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Container, Row, Col, Card, Input, Button } from "reactstrap";
import uuid from "uuid";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Printable from "helpers/printable";

import "./style.scss";

const stardate = date => {
  var calculatedDate = new Date(date).getTime() / 1000 / 60 / 60 / 30 / 2;
  var subtraction = Math.floor(calculatedDate);
  var finalDate = (calculatedDate - subtraction) * 100000;
  return Math.floor(finalDate) / 10;
};

const SUB = gql`
  subscription OfficerLogUpdate($clientId: ID!, $flightId: ID!) {
    officerLogsUpdate(clientId: $clientId, flightId: $flightId) {
      id
      log
      timestamp
    }
  }
`;

class OfficerLog extends Component {
  state = { logText: null, selectedLog: null };
  componentWillUnmount() {
    clearTimeout(this.scanning);
    this.scanning = null;
  }
  startLog = () => {
    this.setState({ logText: "", selectedLog: null });
  };
  cancelLog = () => {
    this.setState({ logText: null, selectedLog: null });
  };
  addLog = () => {
    const mutation = gql`
      mutation AddOfficerLog($clientId: ID!, $flightId: ID!, $log: String!) {
        addLog(log: { clientId: $clientId, flightId: $flightId, log: $log })
      }
    `;
    const id = uuid.v4();
    const variables = {
      clientId: this.props.clientObj.id,
      flightId: this.props.flight.id,
      log: this.state.logText,
      id
    };
    this.props.client.mutate({ mutation, variables }).then(() => {
      this.setState({
        selectedLog: id
      });
    });
  };
  printLog = () => {
    window.print();
  };
  render() {
    const { loading, officerLogs } = this.props.data;
    if (loading || !officerLogs) return null;
    const { logText, selectedLog } = this.state;
    const timestamp =
      selectedLog &&
      officerLogs.find(l => l.id === selectedLog) &&
      officerLogs.find(l => l.id === selectedLog).timestamp;
    return (
      <Container className="officer-log">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: {
                clientId: this.props.clientObj.id,
                flightId: this.props.flight.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  officerLogs: subscriptionData.data.officerLogsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={4}>
            <Card>
              {officerLogs.map(l => (
                <div
                  key={l.id}
                  className={`log-entry ${
                    selectedLog === l.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    this.setState({ selectedLog: l.id, logText: l.log })
                  }
                >
                  <p className="stardate">{stardate(l.timestamp)}</p>
                  <p>
                    {l.log.substr(0, 60)}
                    {l.log.length > 60 && "..."}
                  </p>
                </div>
              ))}
            </Card>
            <Button block color="primary" onClick={this.startLog}>
              Start Log
            </Button>
            <Button block color="info" onClick={this.printLog}>
              Print
            </Button>
          </Col>
          {logText !== null && (
            <Col sm={8} style={{ display: "flex", flexDirection: "column" }}>
              <div className="log-header">
                <h4>Log of Officer: {this.props.clientObj.loginName}</h4>
                <h4>Stardate: {stardate(timestamp || new Date())}</h4>
              </div>
              <Input
                style={{ flex: 1 }}
                type="textarea"
                value={logText || ""}
                disabled={selectedLog}
                onChange={e => this.setState({ logText: e.target.value })}
              />
              <Row>
                <Col sm={6}>
                  <Button
                    color="danger"
                    disabled={selectedLog}
                    block
                    onClick={this.cancelLog}
                  >
                    Clear
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    color="success"
                    disabled={selectedLog}
                    block
                    onClick={this.addLog}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <Printable>
          <div>
            <h1>Officer Log</h1>
            {officerLogs.map(l => (
              <div
                key={l.id}
                className={`log-entry`}
              >
                <p className="stardate"><b>Stardate {stardate(l.timestamp)}</b></p>
                <p>
                  {l.log}
                </p>
              </div>
            ))}
          </div>
        </Printable>
      </Container>
    );
  }
}

const QUERY = gql`
  query OfficerLog($clientId: ID!, $flightId: ID!) {
    officerLogs(clientId: $clientId, flightId: $flightId) {
      id
      log
      timestamp
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => {
    return {
      fetchPolicy: "cache-and-network",
      variables: {
        clientId: ownProps.clientObj.id,
        flightId: ownProps.flight.id
      }
    };
  }
})(withApollo(OfficerLog));
