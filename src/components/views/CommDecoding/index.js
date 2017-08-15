import React, { Component } from "react";
import { Layer, Line, Stage } from "react-konva";
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  Button,
  Label
} from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import Measure from "react-measure";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import "./style.scss";

const DECODING_SUB = gql`
  subscription LRDecoding($simulatorId: ID!) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId, crew: true) {
      id
      simulatorId
      name
      messages {
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

const height = 250;
const sinPoints = ({ a, f, p, animate, width }) => {
  let sinWidth = width * 2 * 2;
  if (animate) {
    sinWidth = width / 4 * 2;
  }
  return Array(Math.round(sinWidth)).fill(0).map((_, i) => {
    if (animate && i % 2 === 0) return i / 2 + p / 2;
    if (i % 2 === 0) return i / 2;
    if (animate) i += p;
    return Math.sin(i / 2 / f) * a + height / 2;
  });
};
const decodePoints = ({ message, decodeProgress, ra, rf, width }) => {
  const newDecodeProgress = width / message.length * 2 * decodeProgress;
  let sinWidth = width / 8 * 2;
  return Array(Math.round(sinWidth)).fill(0).map((_, i) => {
    if (i % 2 === 0) return i / 2 + newDecodeProgress / 2;
    i += newDecodeProgress;
    return Math.sin(i / 2 / rf) * ra + height / 2;
  });
};

class Decoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessage: null,
      a: 20,
      f: 10,
      ra: 30,
      rf: 20,
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
  componentWillReceiveProps(nextProps) {
    if (!this.decodeSubscription && !nextProps.data.loading) {
      this.decodeSubscription = nextProps.data.subscribeToMore({
        document: DECODING_SUB,
        variables: { simulatorId: this.props.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({
              longRangeCommunications:
                subscriptionData.data.longRangeCommunicationsUpdate
            })
            .toJS();
        }
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.decodeTimeout);
  }
  decode() {
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
        (Math.round(Math.sin(decodeProgress * a + f) * ra + rf) +
          message.length) %
          94 +
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
      this.decodeTimeout = setTimeout(this.decode.bind(this), 50);
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
  }
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
  _handleChangeComplete(which, e) {
    let { selectedMessage, a, f } = this.state;
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
    if (this.props.data.loading) return null;
    const sys = this.props.data.longRangeCommunications[0];
    let selectedMessage = { a: 20, f: 20 };
    if (this.state.selectedMessage)
      selectedMessage = sys.messages.find(
        m => m.id === this.state.selectedMessage
      );
    return (
      <Container fluid className="lrComm">
        <Row>
          <Col sm={8}>
            <Card style={{ padding: 0 }}>
              <Measure useClone={true} includeMargin={false}>
                {dimensions =>
                  <div>
                    <DecodingCanvas
                      dimensions={dimensions}
                      decodeProgress={this.state.decodeProgress}
                      ra={selectedMessage.ra}
                      rf={selectedMessage.rf}
                      message={selectedMessage.message}
                      a={this.state.a}
                      f={this.state.f}
                    />
                  </div>}
              </Measure>
            </Card>
            <Button
              className="decode-button"
              disabled={!this.state.selectedMessage}
              color="secondary"
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
            <Row>
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
                  min={10}
                  step={5}
                  max={100}
                />
              </Col>
            </Row>
            <Row>
              <Card className="message-field">
                <CardBlock>
                  <pre>
                    {this.state.decodedMessage}
                  </pre>
                </CardBlock>
              </Card>
            </Row>
          </Col>
          <Col sm={4}>
            <Card>
              {sys.messages.map(m =>
                <li
                  key={m.id}
                  onClick={this._selectMessage.bind(this, m)}
                  className={
                    m.id === this.state.selectedMessage ? "active" : ""
                  }
                >
                  {m.datestamp} - {m.sender}
                </li>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

class DecodingCanvas extends Component {
  constructor(props) {
    const width = props.dimensions.width;
    super(props);
    this.state = {
      p: width / 2 * -1
    };
    this.looping = true;
  }
  componentDidMount() {
    this.looping = true;
    requestAnimationFrame(this.loop.bind(this));
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop() {
    if (!this.looping) return;
    const width = this.props.dimensions.width;
    const newP = this.state.p + 20;
    if (newP < width * 2) {
      this.setState({ p: newP });
    } else {
      this.setState({
        p: width / 2 * -1
      });
    }
    // Next frame
    requestAnimationFrame(this.loop.bind(this));
  }
  render() {
    const { p } = this.state;
    const { ra, rf, f, a, message, decodeProgress } = this.props;
    return (
      <Stage width={this.props.dimensions.width} height={height}>
        <Layer>
          <Line
            points={sinPoints({
              f,
              a,
              message,
              width: this.props.dimensions.width
            })}
            stroke="red"
            strokeWidth={2}
            lineJoin="round"
            lineCap="round"
          />
          <Line
            points={
              decodeProgress
                ? decodePoints({
                    rf,
                    ra,
                    message,
                    decodeProgress,
                    width: this.props.dimensions.width
                  })
                : sinPoints({
                    f: rf,
                    a: ra,
                    p: p,
                    animate: true,
                    width: this.props.dimensions.width
                  })
            }
            stroke={decodeProgress ? "magenta" : "yellow"}
            strokeWidth={2}
            lineJoin="round"
            lineCap="round"
          />
        </Layer>
      </Stage>
    );
  }
}
const DECODING_QUERY = gql`
  query LRDecoding($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId, crew: true) {
      id
      simulatorId
      name
      messages {
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
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Decoding));
