import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Card,
  CardBody
} from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import Tour from "helpers/tourHelper";

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

class Review extends Component {
  state = {};
  trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <span>
          The message review screen allows you to see and review all messages
          being sent out of the ship before they are sent. It's possible that
          spies on the ship could send confidential information to our enemies.
          It's also possible our crewmembers accidentally include something
          secret in their messages.
        </span>
      )
    },
    {
      selector: ".nothing",
      content: (
        <span>
          You have to make sure nothing secret gets out of this ship into the
          wrong hands. Use this screen to see what is being written, screen for
          any sensitive or confidential information, and encrypt secret
          information that is supposed to go out so enemies cannot read it.
        </span>
      )
    },
    {
      selector: ".message-queue",
      content: (
        <span>
          This is the list of messages which have been written. Some messages
          have been written by your fellow crewmembers on the bridge, but some
          could be written by other people on the ship.
        </span>
      )
    },
    {
      selector: ".message-text",
      content: (
        <span>
          This is where you can see the text of the message. Read the messages
          carefully to ensure they don't have any secret information inside of
          them. If the message is encrypted, you won't be able to read it at
          all.
        </span>
      )
    },
    {
      selector: ".delete-message",
      content: (
        <span>
          If the information in the message is too secret, or if you don't know
          who the message destination is, you can delete the message to make
          sure it never gets off the ship.
        </span>
      )
    },
    {
      selector: ".encrypt-message",
      content: (
        <span>
          If there is secret information in the message, but you know who it is
          being sent to, you can encrypt the message. That will make it so only
          the person recieving it can read the message. Even if an enemy
          intercepts the message, they won't be able to read it.
        </span>
      )
    },
    {
      selector: ".approve-message",
      content: (
        <span>
          If the message is safe to send, namely if the message doesn't have any
          secrets in it or if it is encrypted, you can approve the message to be
          sent.
        </span>
      )
    }
  ];
  componentDidUpdate(prevProps, prevState) {
    const { selectedMessage } = this.state;
    // Check to see if the message encryption has changed.
    // If it has, run the encryption method
    const newMessage =
      this.props.messages.find(m => m.id === selectedMessage) || {};
    const oldMessage =
      prevProps.messages.find(m => m.id === selectedMessage) || {};
    if (newMessage.encrypted && oldMessage.encrypted === false) {
      this.setState({ encrypting: true });
      this.encrypt();
    }
  }
  encrypt = () => {
    this.frame = 0;
    this.processedPixels = [];
    this.processPixels();
  };
  encryptMessage = ({ message, encrypted }) => {
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
  processPixels = () => {
    let { messageText } = this.state;
    for (let i = 0; i < Math.ceil(this.frame / 20 + 1); i++) {
      const fn = feistelNet(this.frame);
      this.frame += 1;
      const x = fn % messageText.length;
      const y = Math.floor(fn / 100) + 30;
      if (this.processedPixels.indexOf(x) === -1) {
        messageText = setCharAt(messageText, x, String.fromCharCode(y));
        this.processedPixels.push(x);
      }
    }
    this.setState({ messageText }, () => {
      if (
        this.frame < 65536 &&
        this.processedPixels.length < messageText.length
      ) {
        requestAnimationFrame(this.processPixels);
      }
    });
    if (
      this.frame >= 65536 ||
      this.processedPixels.length >= messageText.length
    ) {
      this.setState({ encrypting: false });
    }
  };
  render() {
    const { id, messages } = this.props;
    const { selectedMessage, encrypting, messageText } = this.state;
    const message = messages.find(m => m.id === selectedMessage) || {};
    return (
      <Container style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col sm={4} className="message-queue flex-column">
            <h4>Message Queue</h4>
            <ListGroup className="flex-max auto-scroll">
              {messages.map(m => (
                <ListGroupItem
                  key={m.id}
                  onClick={() =>
                    this.setState({
                      selectedMessage: m.id,
                      messageText: this.encryptMessage(m)
                    })
                  }
                  active={selectedMessage === m.id}
                >
                  <ListGroupItemHeading>From: {m.sender}</ListGroupItemHeading>
                  <ListGroupItemText>{m.datestamp}</ListGroupItemText>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8} className="flex-column">
            <Card className="message-text flex-max auto-scroll">
              <CardBody style={{ whiteSpace: "pre-wrap" }}>
                {messageText}
              </CardBody>
            </Card>
            <Row>
              <Col sm={4}>
                <Mutation
                  mutation={gql`
                    mutation DeleteMessage($id: ID!, $message: ID!) {
                      deleteLongRangeMessage(id: $id, message: $message)
                    }
                  `}
                  variables={{ id, message: selectedMessage }}
                >
                  {action => (
                    <Button
                      disabled={!selectedMessage || encrypting}
                      color="danger"
                      block
                      className="delete-message"
                      onClick={() => {
                        action();
                        this.setState({
                          selectedMessage: null,
                          messageText: ""
                        });
                      }}
                    >
                      Delete Message
                    </Button>
                  )}
                </Mutation>
              </Col>
              <Col sm={4}>
                <Mutation
                  mutation={gql`
                    mutation EncryptMessage($id: ID!, $message: ID!) {
                      encryptLongRangeMessage(id: $id, message: $message)
                    }
                  `}
                  variables={{ id, message: selectedMessage }}
                >
                  {action => (
                    <Button
                      color="info"
                      block
                      className="encrypt-message"
                      disabled={!selectedMessage || message.encrypted}
                      onClick={action}
                    >
                      {encrypting ? "Encrypting" : "Encrypt"} Message
                    </Button>
                  )}
                </Mutation>
              </Col>
              <Col sm={4}>
                <Mutation
                  mutation={gql`
                    mutation ApproveMessage($id: ID!, $message: ID!) {
                      approveLongRangeMessage(id: $id, message: $message)
                    }
                  `}
                  variables={{ id, message: selectedMessage }}
                >
                  {action => (
                    <Button
                      color="success"
                      block
                      className="approve-message"
                      disabled={!selectedMessage || encrypting}
                      onClick={() => {
                        action();
                        this.setState({
                          selectedMessage: null,
                          messageText: ""
                        });
                      }}
                    >
                      Approve Message
                    </Button>
                  )}
                </Mutation>
              </Col>
            </Row>
          </Col>
        </Row>
        <Tour steps={this.trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}
export default Review;
