import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import "./style.css";

const MESSAGES_SUB = gql`
  subscription LRDecoding($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId, crew: false) {
      id
      simulatorId
      name
      messages {
        id
        sender
        sent
        deleted
        message
        datestamp
      }
    }
  }
`;

class LRCommCore extends Component {
  constructor(props) {
    super(props);
    this.decodeSubscription = null;
    this.state = {
      selectedMessage: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.decodeSubscription && !nextProps.data.loading) {
      this.decodeSubscription = nextProps.data.subscribeToMore({
        document: MESSAGES_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            longRangeCommunications:
              subscriptionData.longRangeCommunicationsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.decodeSubscription && this.decodeSubscription();
  }
  render() {
    if (this.props.data.loading) return null;
    let selectedMessage = null;
    if (this.state.selectedMessage) {
      selectedMessage = this.props.data.longRangeCommunications[0].messages.find(
        m => m.id === this.state.selectedMessage
      );
    }
    return (
      <div className="comm-core">
        {this.props.data.longRangeCommunications.length > 0 ? (
          <Container style={{ height: "calc(100% - 16px)" }}>
            <Row
              className="comm-messages"
              style={{ height: "100%", minHeight: "30vh" }}
            >
              <Col sm={3}>
                <ul>
                  {this.props.data.longRangeCommunications[0].messages.map(
                    m => (
                      <li
                        key={m.id}
                        className={`${this.state.selectedMessage === m.id
                          ? "active"
                          : ""} ${m.sent === true
                          ? "text-success"
                          : ""} ${m.deleted === true ? "text-danger" : ""}`}
                        onClick={() => this.setState({ selectedMessage: m.id })}
                      >
                        {m.datestamp} - {m.sender}
                      </li>
                    )
                  )}
                </ul>
              </Col>
              <Col sm={9}>
                {selectedMessage && (
                  <pre>{`${selectedMessage.datestamp}
From: ${selectedMessage.sender}
${selectedMessage.message}`}</pre>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          "No Long Range Comm"
        )}
      </div>
    );
  }
}

const MESSAGES_QUERY = gql`
  query LRDecoding($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId, crew: false) {
      id
      simulatorId
      name
      messages {
        id
        sender
        message
        sent
        deleted
        datestamp
      }
    }
  }
`;

export default graphql(MESSAGES_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(LRCommCore));
