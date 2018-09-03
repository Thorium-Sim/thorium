import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import Measure from "react-measure";
import Satellites from "./Satellites";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "../../../helpers/tourHelper";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

function feistelNet(input) {
  var l = input & 0xff;
  var r = input >> 8;
  for (let i = 0; i < 8; i++) {
    const nl = r;
    const F = ((r * 11 + (r >> 5) + 7 * 127) ^ r) & 0xff;
    r = l ^ F;
    l = nl;
  }
  return ((r << 8) | l) & 0xffff;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

const MESSAGES_SUB = gql`
  subscription LRQueueingSub($simulatorId: ID) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      satellites
      messages(crew: false, sent: false, approved: true) {
        id
        sender
        message
        datestamp
        sent
        encrypted
      }
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedMessage: "",
      typedIndex: 0
    };
    this.loopTimeout = null;
  }
  componentDidMount() {
    this.loopTimeout = setTimeout(this.typeLoop, 16);
  }
  componentWillUnmount() {
    clearTimeout(this.loopTimeout);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      this.setState({
        typedMessage: "",
        typedIndex: 0
      });
      clearTimeout(this.loopTimeout);
      this.loopTimeout = setTimeout(this.typeLoop, 16);
    }
  }
  typeLoop = () => {
    const { message } = this.props;
    const { typedIndex } = this.state;
    if (message) {
      this.setState({
        typedMessage: message.substr(0, typedIndex),
        typedIndex: typedIndex + 1
      });
      if (typedIndex + 1 <= message.length) {
        this.loopTimeout = setTimeout(this.typeLoop, 16);
      }
    }
  };
  render() {
    return (
      <div className="message-box flex-max">
        <pre>{this.state.typedMessage}</pre>
      </div>
    );
  }
}
function messageLoc() {
  const axis = Math.random() > 0.5 ? true : false;
  const amp = Math.round(Math.random());
  return { x: axis ? amp : Math.random(), y: axis ? Math.random() : amp };
}

class LongRangeComm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessage: null,
      selectedSat: null,
      messageLoc: messageLoc(),
      messageText: null,
      satellites: [],
      scanProgress: 0
    };
  }
  scanning = false;
  componentWillUnmount() {
    this.scanning = false;
  }
  selectSat(sat) {
    this.setState({
      selectedSat: sat
    });
  }
  deleteMessage() {
    const mutation = gql`
      mutation DeleteMessage($id: ID!, $message: ID!) {
        deleteLongRangeMessage(id: $id, message: $message)
      }
    `;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      message: this.state.selectedMessage
    };
    this.setState(
      {
        selectedMessage: null,
        selectedSat: null
      },
      () => {
        this.props.client.mutate({
          mutation,
          variables
        });
      }
    );
  }
  sendMessage() {
    const mutation = gql`
      mutation SendMessage($id: ID!, $message: ID!) {
        longRangeMessageSend(id: $id, message: $message)
      }
    `;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      message: this.state.selectedMessage
    };
    this.setState({
      messageLoc: { x: this.state.selectedSat.x, y: this.state.selectedSat.y }
    });
    const sendMessage = () => {
      this.setState(
        {
          selectedMessage: null,
          selectedSat: null
        },
        () => {
          this.props.client.mutate({
            mutation,
            variables
          });
        }
      );
    };
    const { selectedSat } = this.state;
    const timer = Math.round(
      4000 -
        this.state.satellites.find(s => s.id === selectedSat.id).strength * 2000
    );
    const messageHide = () => {
      this.setState({
        messageText: null,
        messageLoc: messageLoc()
      });
      setTimeout(sendMessage, timer);
    };
    const messageShow = () => {
      const message = this.props.data.longRangeCommunications[0].messages.find(
        s => s.id === this.state.selectedMessage
      );
      this.setState({
        messageText: message.message
      });

      setTimeout(messageHide, timer);
    };
    setTimeout(messageShow, timer);
  }
  scan = () => {
    if (this.scanning) {
      if (this.state.scanProgress >= 1) {
        return this.setState({
          scanProgress: 1
        });
      }
      this.setState(
        ({ scanProgress }) => ({
          scanProgress: scanProgress + 0.003
        }),
        () => requestAnimationFrame(this.scan)
      );
    }
  };
  startScanning = () => {
    const satCount = this.props.data.longRangeCommunications[0].satellites;
    this.setState(
      {
        satellites: Array(satCount)
          .fill(0)
          .map((_, i) => ({
            id: i,
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 360,
            strength: Math.random()
          })),

        scanProgress: 0
      },
      () => {
        this.scanning = true;
        this.scan();
      }
    );
  };
  encrypt = ({ message, encrypted }) => {
    if (encrypted) {
      let messageText = message;
      this.frame = 0;
      this.processedPixels = [];
      while (this.processedPixels.length < messageText.length) {
        const fn = feistelNet(this.frame);
        this.frame += 1;
        const x = fn % messageText.length;
        const y = Math.floor(fn / 100) + 30;
        const char = String.fromCharCode(y);
        if (messageText[x] === message[x]) {
          messageText = setCharAt(messageText, x, char);
          this.processedPixels.push(x);
        }
      }
      return messageText;
    }
    return message;
  };
  render() {
    if (this.props.data.loading || !this.props.data.longRangeCommunications)
      return null;
    const messages = this.props.data.longRangeCommunications[0].messages;
    const messageObj = messages.find(m => m.id === this.state.selectedMessage);
    const { scanProgress, satellites } = this.state;
    const messageText = messageObj && this.encrypt(messageObj);
    return (
      <Row className="long-range-comm">
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
        <DamageOverlay
          system={this.props.data.longRangeCommunications[0]}
          message={"Long Range Communications Offline"}
          style={{ minHeight: "400px", height: "calc(100% + 40px)" }}
        />
        <Col sm={3} className="message-queue flex-column">
          <h4>Message Queue</h4>
          <ListGroup className="flex-max auto-scroll">
            {messages.map(m => (
              <ListGroupItem
                onClick={() => {
                  this.setState({ selectedMessage: m.id, selectedSat: null });
                }}
                active={m.id === this.state.selectedMessage}
                key={m.id}
              >
                {`${m.datestamp}: ${m.sender}`}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9} className="flex-column">
          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
            }}
          >
            {({ measureRef }) => (
              <div ref={measureRef} className="sat-container flex-max">
                {this.state.dimensions && (
                  <Satellites
                    selectSat={
                      messageObj ? this.selectSat.bind(this) : () => {}
                    }
                    selectedSat={this.state.selectedSat}
                    messageLoc={this.state.messageLoc}
                    messageText={messageText}
                    satellites={satellites}
                    scanProgress={scanProgress}
                    {...this.state.dimensions}
                  />
                )}
              </div>
            )}
          </Measure>
          {scanProgress === 1 &&
            satellites.length > 0 && (
              <Row style={{ marginTop: "10px" }}>
                <Col lg={{ size: 4, offset: 1 }} xl={{ size: 3, offset: 2 }}>
                  <Button
                    onClick={this.deleteMessage.bind(this)}
                    size="lg"
                    block
                    disabled={!messageObj}
                    color="danger"
                  >
                    Delete Message
                  </Button>
                </Col>
                <Col lg={{ size: 4, offset: 2 }} xl={{ size: 3, offset: 2 }}>
                  <Button
                    onClick={this.sendMessage.bind(this)}
                    disabled={!this.state.selectedSat || !messageObj}
                    size="lg"
                    block
                    color="success"
                  >
                    Send Message
                  </Button>
                </Col>
              </Row>
            )}
          {satellites.length < 1 &&
            (scanProgress === 1 || scanProgress === 0) && (
              <Row style={{ marginTop: "10px" }}>
                <Col sm={{ size: 10, offset: 1 }}>
                  <Button
                    size="lg"
                    block
                    color="primary"
                    onClick={this.startScanning}
                  >
                    Scan for Satellites
                  </Button>
                </Col>
              </Row>
            )}
          {scanProgress < 1 &&
            scanProgress > 0 && (
              <Row style={{ marginTop: "10px" }}>
                <Col sm={12} className="text-center">
                  <h2>Scanning...</h2>
                </Col>
              </Row>
            )}
          <MessageBox message={messageText} />
        </Col>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Row>
    );
  }
}

const trainingSteps = [
  {
    selector: "#widget-composer",
    content:
      "This screen allows you to send messages from people inside the ship to people outside the ship. You can compose messages using this widget. Just type in the destination and the content of your message."
  },
  {
    selector: ".message-queue",
    content:
      "Other people on the ship can write long-range messages, addressed to any individual or group. These outgoing messages appear here. To send a message, click on it. Click on a message before continuing training."
  },
  {
    selector: ".sat-container",
    content:
      "To send the selected message, click on the satellite with the strongest signal. Stronger signals are represented by a longer line next to the satellite. Click the button below to send the message, or to delete the message."
  }
];

const QUEUING_QUERY = gql`
  query LRQueuing($simulatorId: ID) {
    longRangeCommunications(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      satellites
      messages(crew: false, sent: false, approved: true) {
        id
        sender
        message
        datestamp
        sent
        encrypted
      }
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;
export default graphql(QUEUING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(LongRangeComm));
