import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, Card, Button } from "reactstrap";
import Immutable from "immutable";
import Measure from "react-measure";
import Satellites from "./Satellites";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "reactour";

import "./style.scss";

const MESSAGES_SUB = gql`
  subscription LRQueueingSub($simulatorId: ID) {
    longRangeCommunicationsUpdate(
      simulatorId: $simulatorId
      crew: false
      sent: false
    ) {
      id
      simulatorId
      name
      messages {
        id
        sender
        message
        datestamp
        sent
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
    this.loopTimeout = setTimeout(this.typeLoop.bind(this), 16);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      this.setState({
        typedMessage: "",
        typedIndex: 0
      });
      clearTimeout(this.loopTimeout);
      this.loopTimeout = setTimeout(this.typeLoop.bind(this), 16);
    }
  }
  typeLoop() {
    const { message } = this.props;
    const { typedIndex } = this.state;
    this.setState({
      typedMessage: message.substr(0, typedIndex),
      typedIndex: typedIndex + 1
    });
    if (typedIndex + 1 <= message.length) {
      this.loopTimeout = setTimeout(this.typeLoop.bind(this), 16);
    }
  }
  render() {
    return (
      <div className="message-box">
        <pre>
          {this.state.typedMessage}
        </pre>
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
    this.lrsub = null;
    this.state = {
      selectedMessage: null,
      selectedSat: null,
      messageLoc: messageLoc(),
      messageText: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.lrsub && !nextProps.data.loading) {
      this.lrsub = nextProps.data.subscribeToMore({
        document: MESSAGES_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
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
    const messageShow = () => {
      const message = this.props.data.longRangeCommunications[0].messages.find(
        s => s.id === this.state.selectedMessage
      );
      this.setState({
        messageText: message.message
      });

      setTimeout(messageHide, 2000);
    };
    const messageHide = () => {
      this.setState({
        messageText: null,
        messageLoc: messageLoc()
      });
      setTimeout(sendMessage, 2000);
    };
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
    setTimeout(messageShow, 2000);
  }
  render() {
    if (this.props.data.loading) return null;
    const messages = this.props.data.longRangeCommunications[0].messages;
    return (
      <Row className="long-range-comm">
        <DamageOverlay
          system={this.props.data.longRangeCommunications[0]}
          message={"Long Range Communications Offline"}
          style={{ minHeight: "400px", height: "calc(100% + 40px)" }}
        />
        <Col sm={3} className="message-queue">
          <h4>Message Queue</h4>
          <Card style={{ minHeight: "60px" }}>
            {messages.map(m =>
              <li
                onClick={() => {
                  this.setState({ selectedMessage: m.id, selectedSat: null });
                }}
                className={`message-list ${m.id === this.state.selectedMessage
                  ? "active"
                  : ""}`}
                key={m.id}
              >
                {`${m.datestamp}: ${m.sender}`}
              </li>
            )}
          </Card>
        </Col>
        {this.state.selectedMessage &&
          <Col sm={9}>
            <div className="sat-container">
              <Measure includeMargin={true}>
                {dimensions =>
                  <Satellites
                    selectSat={this.selectSat.bind(this)}
                    selectedSat={this.state.selectedSat}
                    width={dimensions.width}
                    height={dimensions.height}
                    messageLoc={this.state.messageLoc}
                    messageText={this.state.messageText}
                  />}
              </Measure>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col lg={{ size: 4, offset: 1 }} xl={{ size: 3, offset: 2 }}>
                <Button
                  onClick={this.deleteMessage.bind(this)}
                  size="lg"
                  block
                  color="danger"
                >
                  Delete Message
                </Button>
              </Col>
              <Col lg={{ size: 4, offset: 2 }} xl={{ size: 3, offset: 2 }}>
                <Button
                  onClick={this.sendMessage.bind(this)}
                  disabled={!this.state.selectedSat}
                  size="lg"
                  block
                  color="success"
                >
                  Send Message
                </Button>
              </Col>
            </Row>
            <MessageBox
              message={
                messages.find(m => m.id === this.state.selectedMessage).message
              }
            />
          </Col>}
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Row>
    );
  }
}

const trainingSteps = [
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
    longRangeCommunications(
      simulatorId: $simulatorId
      crew: false
      sent: false
    ) {
      id
      simulatorId
      name
      messages {
        id
        sender
        message
        datestamp
        sent
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
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(LongRangeComm));
