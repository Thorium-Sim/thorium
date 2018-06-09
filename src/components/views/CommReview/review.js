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
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
      <Container>
        <Row>
          <Col sm={4}>
            <h4>Message Queue</h4>
            <ListGroup>
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
          <Col sm={8}>
            <Card style={{ height: "50vh", overflowY: "auto" }}>
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
      </Container>
    );
  }
}
export default Review;

/*function feistelNet(input) {
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

let string =
  "Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. Crystal is my favorite! I love her so much! She is such a wonderful, kind, considerate, amazing wife and I am #soblessed to have her in my life. ";

document.getElementById("container").innerText = string;

let frame = 0;
let processedPixels = [];
document.getElementById("myButton").addEventListener("click", () => {
  frame = 0;
  processedPixels = [];
  processPixels();
});

document.getElementById("myButton2").addEventListener("click", () => {
  frame = 0;
  processedPixels = [];
  processPixels(true);
});

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function processPixels(immediate) {
  const fn = feistelNet(frame);
  frame += 1;
  const x = fn % string.length;
  const y = Math.floor(fn / 100) + 30;
  if (processedPixels.indexOf(x) === -1) {
    string = setCharAt(string, x, String.fromCharCode(y));
    processedPixels.push(x);
    if (frame < 65536 && processedPixels.length < string.length) {
      if (immediate) {
        processPixels(immediate);
      } else {
        requestAnimationFrame(processPixels);
      }
      return;
    }
  }

  document.getElementById("container").innerText = string;
  if (frame < 65536) processPixels(immediate);
}
*/
