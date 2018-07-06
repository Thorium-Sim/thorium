import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Button, Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Tour from "reactour";
import DecodingCanvas from "./decodingCanvas";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import "./style.scss";

const DECODING_SUB = gql`
  subscription LRDecoding($simulatorId: ID!) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      messages(crew: true) {
        id
        a
        f
        ra
        rf
        sender
        message
        decodedMessage
        datestamp
      }
    }
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "When you receive messages from someone outside of your ship, you must first decode them before you can read them."
  },
  {
    selector: ".incoming-messages",
    content:
      "This is the list of messages you have received. Click on one to read it or decode it."
  },
  {
    selector: ".decode-sliders",
    content:
      "Use these two knobs to adjust the amplitude and frequency of the waves you are sending. Amplitude is the height of the wave and frequency is how close together the waves are, or how quickly you send out the waves. To decode the message, you have to line up the yellow wave and the red wave by adjusting the frequency and amplitude."
  },
  {
    selector: ".decode-button ",
    content:
      "Once your yellow intercepting waves line up with the red waves you are receiving, press this button to decode the message."
  },
  {
    selector: ".message-field",
    content:
      "The decoded message will appear here. If the message isn’t coming through in a language you understand, continue to refine your intercepting wavelength until the message comes through clearly."
  }
];

class Decoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessage: null,
      a: 10,
      f: 10,
      ra: 30,
      rf: 10,
      message:
        "This is my really long testing testing 123 test message. It represents a message" +
        " which might be given to the captain and crew during their flight and would be g" +
        "reat cause for celebration when it is recieved. ",
      decodedMessage: "",
      decodeProgress: null
    };
    this.decodeSubscription = null;
    this.decodeTimeout = null;
  }
  componentWillUnmount() {
    clearTimeout(this.decodeTimeout);
  }
  decode = () => {
    let {
      selectedMessage,
      decodeProgress,
      decodedMessage,
      message,
      a,
      f,
      ra,
      rf
    } = this.state;
    if (!decodeProgress) {
      decodeProgress = 0;
      decodedMessage = "";
    }

    if (decodeProgress < message.length) {
      decodeProgress += 1;
      // Deterministic function to figure out the char code. Char codes go from 32 to
      // 126 Get the adjuster
      decodedMessage = decodedMessage.split();
      const adjuster =
        ((Math.round(Math.sin(decodeProgress * a + f) * ra + rf) +
          message.length) %
          94) +
        32;
      if (a === ra && f === rf) {
        decodedMessage[decodeProgress] = message[decodeProgress - 1];
      } else {
        decodedMessage[decodeProgress] = String.fromCharCode(adjuster);
      }
      this.setState({
        decodedMessage: decodedMessage.join(""),
        decodeProgress
      });
      clearTimeout(this.decodeTimeout);
      this.decodeTimeout = setTimeout(this.decode, 50);
    } else {
      // Update the server
      const mutation = gql`
        mutation UpdateDecodedMessage(
          $id: ID!
          $messageId: ID!
          $decodedMessage: String
          $a: Int
          $f: Int
        ) {
          updateLongRangeDecodedMessage(
            id: $id
            messageId: $messageId
            decodedMessage: $decodedMessage
            a: $a
            f: $f
          )
        }
      `;
      const variables = {
        id: this.props.data.longRangeCommunications[0].id,
        messageId: selectedMessage,
        decodedMessage: this.state.decodedMessage,
        a,
        f
      };
      this.props.client.mutate({
        mutation,
        variables
      });
      this.setState({ decodeProgress: null });
    }
  };
  _selectMessage(message) {
    this.setState({
      selectedMessage: message.id,
      a: message.a,
      f: message.f,
      decodedMessage:
        message.a === message.ra && message.f === message.rf
          ? message.message
          : ""
    });
  }
  _handleOnChange(which, e) {
    const obj = {};
    obj[which] = e;
    this.setState(obj);
  }
  _handleChangeComplete() {
    let { selectedMessage, a, f } = this.state;
    if (!selectedMessage) return;
    const mutation = gql`
      mutation UpdateDecodedMessage(
        $id: ID!
        $messageId: ID!
        $a: Int
        $f: Int
      ) {
        updateLongRangeDecodedMessage(
          id: $id
          messageId: $messageId
          a: $a
          f: $f
        )
      }
    `;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      messageId: selectedMessage,
      a,
      f
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    let alertClass = `alertColor${this.props.simulator.alertLevel || 5}`;
    if (this.props.data.loading || !this.props.data.longRangeCommunications)
      return null;
    const sys = this.props.data.longRangeCommunications[0];
    let selectedMessage = { a: 10, f: 10 };
    if (this.state.selectedMessage) {
      selectedMessage = sys.messages.find(
        m => m.id === this.state.selectedMessage
      );
    }
    return (
      <Container fluid className="lrComm">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DECODING_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  longRangeCommunications:
                    subscriptionData.data.longRangeCommunicationsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={8}>
            <Card style={{ padding: 0 }}>
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef}>
                    {this.state.dimensions &&
                      selectedMessage && (
                        <DecodingCanvas
                          dimensions={this.state.dimensions}
                          decodeProgress={this.state.decodeProgress}
                          ra={selectedMessage.ra}
                          rf={selectedMessage.rf}
                          message={selectedMessage.message}
                          a={this.state.a}
                          f={this.state.f}
                        />
                      )}
                  </div>
                )}
              </Measure>
            </Card>
            <Row>
              <Col sm={{ size: 4, offset: 8 }}>
                <Button
                  className="decode-button"
                  disabled={!this.state.selectedMessage}
                  color="secondary"
                  block
                  onClick={() => {
                    this.setState(
                      {
                        decodedMessage: "",
                        message: selectedMessage.message,
                        ra: selectedMessage.ra,
                        rf: selectedMessage.rf
                      },
                      this.decode.bind(this)
                    );
                  }}
                >
                  Decode
                </Button>
              </Col>
            </Row>
            <Row className="decode-sliders">
              <Col>
                <Label>Frequency</Label>
                <Slider
                  className={`frequency-slider ${alertClass}`}
                  value={this.state.f}
                  orientation="horizontal"
                  onChange={this._handleOnChange.bind(this, "f")}
                  onChangeComplete={this._handleChangeComplete.bind(this, "f")}
                  tooltip={false}
                  min={5}
                  step={5}
                  max={50}
                />
                <Label>Amplitude</Label>
                <Slider
                  className={`amplitude-slider ${alertClass}`}
                  value={this.state.a}
                  orientation="horizontal"
                  onChange={this._handleOnChange.bind(this, "a")}
                  onChangeComplete={this._handleChangeComplete.bind(this, "a")}
                  tooltip={false}
                  min={5}
                  step={5}
                  max={50}
                />
              </Col>
            </Row>
            <Row>
              <Card className="message-field">
                <CardBody>
                  <pre>{this.state.decodedMessage}</pre>
                </CardBody>
              </Card>
            </Row>
          </Col>
          <Col sm={4} className="incoming-messages">
            <h3>Incoming Messages</h3>
            <Card style={{ minHeight: "40px" }}>
              {sys.messages.map(m => (
                <li
                  key={m.id}
                  onClick={this._selectMessage.bind(this, m)}
                  className={`${
                    m.id === this.state.selectedMessage ? "active" : ""
                  } list-group-item`}
                >
                  {m.datestamp} - {m.sender}
                </li>
              ))}
            </Card>
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const DECODING_QUERY = gql`
  query LRDecoding($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      messages(crew: true) {
        id
        a
        f
        ra
        rf
        sender
        message
        decodedMessage
        datestamp
      }
    }
  }
`;
export default graphql(DECODING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Decoding));
