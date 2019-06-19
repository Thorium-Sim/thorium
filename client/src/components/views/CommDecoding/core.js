import React, { Component } from "react";
import { Row, Col, Button, ButtonGroup } from "helpers/reactstrap";
import { TypingField, InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import "./style.scss";

const MessagePresets = [
  {
    label: "Send Updates",
    messageSender: "Starbase 74",
    value: `To: #SIM
From: Starbase 74

We want to be informed about any developments during your mission. Make sure you send us a message every 10 minutes.

Starbase 74 out`
  },
  {
    label: "What is your status?",
    messageSender: "Starbase 74",
    value: `To: #SIM
From: Starbase 74

#SIM, we haven't heard from you in a while. What is your status?

Starbase 74 out`
  }
];

class LRCommCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSender: "",
      message: "",
      messageType: "inbound",
      decoded: false,
      sent: false
    };
  }
  _lrmText(e) {
    let value = e.target.value;
    const regex = /.*(?= out| out\.)/gi;
    const match = value.match(regex);
    if (match) {
      this.setState({
        messageSender: match[match.length - 2]
      });
    }
    this.setState({
      message: value
    });
  }
  _sendMessage() {
    const mutation = gql`
      mutation sendLRM(
        $id: ID!
        $sender: String
        $crew: Boolean!
        $message: String!
        $decoded: Boolean
      ) {
        sendLongRangeMessage(
          id: $id
          crew: $crew
          sender: $sender
          message: $message
          decoded: $decoded
        )
      }
    `;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      sender: this.state.messageSender,
      crew: this.state.messageType === "inbound",
      message: `${
        this.state.messageType === "outbound"
          ? `To: ${this.state.messageReceiver}`
          : ""
      }\n${this.state.message}`,
      decoded: this.state.decoded
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      sent: true,
      sender: "",
      message: ""
    });
    setTimeout(() => {
      this.setState({
        sent: false
      });
    }, 4000);
  }
  _clearMessage = () => {
    this.setState({
      messageSender: "",
      message: "",
      decoded: false,
      sent: false
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.longRangeCommunications)
      return null;
    const { sent, messageType } = this.state;
    if (sent) {
      return (
        <div>
          <p>Message Sent</p>
          <Button size="sm" onClick={this._clearMessage}>
            Send Another
          </Button>
        </div>
      );
    }
    if (this.props.data.longRangeCommunications.length === 0)
      return "No Long Range Comm";
    const comm = this.props.data.longRangeCommunications[0];
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <ButtonGroup>
          <Button
            size="sm"
            onClick={() => this.setState({ messageType: "inbound" })}
            active={messageType === "inbound"}
          >
            Inbound
          </Button>
          <Button
            size="sm"
            onClick={() => this.setState({ messageType: "outbound" })}
            active={messageType === "outbound"}
          >
            Outbound
          </Button>
        </ButtonGroup>
        <Row>
          <Col sm={messageType === "outbound" ? 6 : 12}>
            <label>Sender</label>
            <InputField
              prompt={`What is the message sender? (eg. ${
                messageType === "inbound" ? "Starbase 74" : "Lt. Carter"
              })`}
              onClick={e =>
                this.setState({
                  messageSender: e
                })
              }
            >
              {this.state.messageSender}
            </InputField>
          </Col>
          {messageType === "outbound" && (
            <Col sm={6}>
              <label>Receiver</label>
              <InputField
                prompt="What is the message receiver? (eg. Starbase 74)"
                onClick={e =>
                  this.setState({
                    messageReceiver: e
                  })
                }
              >
                {this.state.messageReceiver}
              </InputField>
            </Col>
          )}
        </Row>
        <TypingField
          style={{ flex: 1, textAlign: "left" }}
          controlled
          value={this.state.message}
          onChange={this._lrmText.bind(this)}
        />
        <span style={{ display: "flex", alignItems: "flex-start" }}>
          <Button size="sm" onClick={this._sendMessage.bind(this)}>
            Send
          </Button>
          <Button size="sm" onClick={this._clearMessage}>
            Clear
          </Button>
          <label>
            <input
              type="checkbox"
              onClick={e => {
                this.setState({ decoded: e.target.checked });
              }}
            />{" "}
            Decoded
          </label>
          <select
            style={{ height: "18px" }}
            value={"nothing"}
            onChange={e => {
              const { value, messageSender } = MessagePresets.concat(
                comm.presetMessages
              ).find(m => m.label === e.target.value);

              const regex = /.*(?= out| out\.)/gi;
              const match = value.match(regex);

              this.setState({
                message: value.replace(/#SIM/gi, this.props.simulator.name),
                messageSender: messageSender
                  ? messageSender
                  : match && match[match.length - 2]
              });
            }}
          >
            <option value="nothing" disabled>
              Select a Message
            </option>
            {MessagePresets.concat(comm.presetMessages).map(p => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </span>
      </div>
    );
  }
}

const DECODING_QUERY = gql`
  query LRDecoding($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      presetMessages {
        label
        value
      }
    }
  }
`;

export default graphql(DECODING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(LRCommCore));
