import React, { Component } from "react";
import { Button } from "reactstrap";
import { TypingField, InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import "./style.css";

class LRCommCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSender: "",
      message: "",
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
  _updateSender(e) {
    this.setState({
      messageSender: e
    });
  }
  _sendMessage() {
    const mutation = gql`
      mutation sendLRM(
        $id: ID!
        $sender: String
        $message: String!
        $decoded: Boolean
      ) {
        sendLongRangeMessage(
          id: $id
          crew: true
          sender: $sender
          message: $message
          decoded: $decoded
        )
      }
    `;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      sender: this.state.messageSender,
      message: this.state.message,
      decoded: this.state.decoded
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      sent: true
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
    if (this.state.sent) {
      return (
        <div>
          <p>Message Sent</p>
          <Button size="sm" onClick={this._clearMessage}>
            Send Another
          </Button>
        </div>
      );
    }
    return (
      <div className="comm-core">
        {this.props.data.longRangeCommunications.length > 0 ? (
          <div style={{ height: "calc(100% - 20px)" }}>
            <InputField
              prompt="What is the message sender? (eg. Starbase 74)"
              onClick={this._updateSender.bind(this)}
            >
              {this.state.messageSender}
            </InputField>
            <TypingField
              style={{ height: "calc(100% - 40px)", textAlign: "left" }}
              controlled
              value={this.state.message}
              onChange={this._lrmText.bind(this)}
            />
            <span>
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
            </span>
          </div>
        ) : (
          "No Long Range Comm"
        )}
      </div>
    );
  }
}

const DECODING_QUERY = gql`
  query LRDecoding($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId, crew: true) {
      id
    }
  }
`;

export default graphql(DECODING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(LRCommCore));
