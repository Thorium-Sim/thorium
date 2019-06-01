import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Label,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import Measure from "react-measure";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import Tour from "helpers/tourHelper";
import DecodingCanvas from "./decodingCanvas";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Prando from "prando";
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
        deleted
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

      if (a === ra && f === rf) {
        decodedMessage[decodeProgress] = message[decodeProgress - 1];
      } else {
        const adjuster =
          ((Math.round(Math.sin(decodeProgress * a + f) * ra + rf) +
            message.length) %
            94) +
          32;
        let char = String.fromCharCode(adjuster);
        // If it is partially decoded, reveal random characters based on how much is is decoded.
        const diff =
          Math.abs(a / 50 - ra / 50) / 2 + Math.abs(f / 50 - rf / 50) / 2;
        if (this.rng.next() > diff) char = message[decodeProgress - 1];
        decodedMessage[decodeProgress] = char;
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
  _handleOnChange = (which, e) => {
    const obj = {};
    obj[which] = e;
    this.setState(obj);
  };
  _handleChangeComplete = () => {
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
  };
  render() {
    let alertClass = `alertColor${this.props.simulator.alertLevel || 5}`;
    if (this.props.data.loading || !this.props.data.longRangeCommunications)
      return null;
    const sys = this.props.data.longRangeCommunications[0];
    let selectedMessage = { a: 10, f: 10 };
    if (this.state.selectedMessage) {
      selectedMessage = sys.messages.find(
        m => m.id === this.state.selectedMessage && !m.deleted
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
          <Col sm={8} className="flex-column">
            <Card style={{ padding: 0 }} className="flex-max">
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef}>
                    {this.state.dimensions && selectedMessage && (
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
            <div>
              <Col sm={{ size: 4, offset: 8 }}>
                <Button
                  className="decode-button"
                  disabled={!this.state.selectedMessage}
                  color="secondary"
                  block
                  onClick={() => {
                    this.rng = new Prando(selectedMessage.id);
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
            </div>
            <div className="decode-sliders">
              <Col>
                <Label>Frequency</Label>
                <Slider
                  className={`frequency-slider ${alertClass}`}
                  value={Math.abs(50 - this.state.f)}
                  orientation="horizontal"
                  onChange={e => this._handleOnChange("f", Math.abs(50 - e))}
                  onChangeComplete={this._handleChangeComplete}
                  tooltip={false}
                  min={0}
                  step={5}
                  max={45}
                />
                <Label>Amplitude</Label>
                <Slider
                  className={`amplitude-slider ${alertClass}`}
                  value={this.state.a}
                  orientation="horizontal"
                  onChange={e => this._handleOnChange("a", e)}
                  onChangeComplete={this._handleChangeComplete}
                  tooltip={false}
                  min={5}
                  step={5}
                  max={50}
                />
              </Col>
            </div>
            <div className="flex-max message-field">
              <pre>{this.state.decodedMessage}</pre>
            </div>
          </Col>
          <Col sm={4} className="incoming-messages flex-column">
            <h3>Incoming Messages</h3>
            <ListGroup
              style={{ minHeight: "40px" }}
              className="flex-max auto-scroll"
            >
              {sys.messages
                .filter(m => !m.deleted)
                .map(m => (
                  <ListGroupItem
                    key={m.id}
                    onClick={this._selectMessage.bind(this, m)}
                    active={m.id === this.state.selectedMessage}
                  >
                    {m.datestamp} - {m.sender}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
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
        deleted
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
