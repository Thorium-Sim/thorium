import React, { Component } from "react";
import { graphql, Mutation, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import "./style.scss";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

const MESSAGES_SUB = gql`
  subscription LRDecoding($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      satellites
      messages(crew: false) {
        id
        sender
        sent
        deleted
        message
        datestamp
        encrypted
        approved
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
  render() {
    if (this.props.data.loading || !this.props.data.longRangeCommunications)
      return null;
    let selectedMessage = null;
    if (this.state.selectedMessage) {
      selectedMessage = this.props.data.longRangeCommunications[0].messages.find(
        m => m.id === this.state.selectedMessage
      );
    }
    return (
      <div className="comm-core">
        {this.props.data.longRangeCommunications.length > 0 ? (
          <Container
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <SubscriptionHelper
              subscribe={() =>
                this.props.data.subscribeToMore({
                  document: MESSAGES_SUB,
                  variables: {
                    simulatorId: this.props.simulator.id
                  },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      longRangeCommunications:
                        subscriptionData.data.longRangeCommunicationsUpdate
                    });
                  }
                })
              }
            />
            <Row className="comm-messages" style={{ flex: 1 }}>
              <Col sm={3}>
                <ul>
                  {this.props.data.longRangeCommunications[0].messages.map(
                    m => (
                      <li
                        key={m.id}
                        className={`${
                          this.state.selectedMessage === m.id ? "active" : ""
                        } ${m.sent === true ? "text-success" : ""} ${
                          m.deleted === true ? "text-danger" : ""
                        } ${
                          m.approved === true && !m.sent && !m.deleted
                            ? "text-warning"
                            : ""
                        } `}
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
                  <pre>{`${selectedMessage.datestamp}${
                    selectedMessage.encrypted ? ` - Encrypted` : ""
                  }${selectedMessage.approved ? ` - Approved` : ""}
From: ${selectedMessage.sender}
${selectedMessage.message}`}</pre>
                )}
              </Col>
            </Row>
            <div>
              <label>Satellites:</label>
              <Mutation
                mutation={gql`
                  mutation SetSatellites($id: ID!, $num: Int!) {
                    setLongRangeSatellites(id: $id, num: $num)
                  }
                `}
              >
                {action => (
                  <InputField
                    prompt="How many satellites should they have?"
                    onClick={a => {
                      action({
                        variables: {
                          id: this.props.data.longRangeCommunications[0].id,
                          num: a
                        }
                      });
                    }}
                    style={{
                      display: "inline-block",
                      padding: "2px 7px"
                    }}
                  >
                    {this.props.data.longRangeCommunications[0].satellites}
                  </InputField>
                )}
              </Mutation>
            </div>
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
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      satellites
      messages(crew: false) {
        id
        sender
        message
        sent
        deleted
        datestamp
        encrypted
        approved
      }
    }
  }
`;

export default graphql(MESSAGES_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(LRCommCore));
