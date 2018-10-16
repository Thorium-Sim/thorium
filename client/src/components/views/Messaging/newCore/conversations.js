import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Input,
  Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GroupManager from "./groupManager";

class Conversations extends Component {
  state = {};
  render() {
    const { messages, simulator } = this.props;
    const { selectedConvo, messageInput, newMessage } = this.state;
    const stationNames = simulator.stations.map(s => s.name);
    const messageList = Object.values(
      messages.reduce((prev, next) => {
        if (stationNames.indexOf(next.sender) === -1) {
          prev[`${next.sender}-${next.destination}`] = {
            sender: next.sender,
            destination: next.destination,
            id: next.id,
            date: new Date(next.timestamp)
          };
        } else if (stationNames.indexOf(next.destination) === -1) {
          prev[`${next.destination}-${next.sender}`] = {
            sender: next.destination,
            destination: next.sender,
            id: next.id,
            date: new Date(next.timestamp)
          };
        }
        return prev;
      }, {})
    ).sort((a, b) => {
      if (a.date > b.date) return -1;
      if (b.date > a.date) return 1;
      return 0;
    });
    return (
      <Fragment>
        <Container style={{ flex: 1, maxHeight: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col sm={4} style={{ display: "flex", flexDirection: "column" }}>
              <ListGroup style={{ flex: 1, overflowY: "scroll" }}>
                {messageList.map(m => (
                  <ListGroupItem
                    key={m.id}
                    active={
                      selectedConvo &&
                      m.sender === selectedConvo.sender &&
                      m.destination === selectedConvo.destination
                    }
                    onClick={() => this.setState({ selectedConvo: m })}
                  >
                    <p>
                      <strong>{m.sender}</strong>
                    </p>
                    <p>{m.destination}</p>
                  </ListGroupItem>
                ))}
              </ListGroup>
              {!newMessage && (
                <Button
                  size="sm"
                  color="success"
                  onClick={() => this.setState({ newMessage: true })}
                >
                  New Conversation
                </Button>
              )}
            </Col>
            <Col sm={8} style={{ display: "flex", flexDirection: "column" }}>
              <Card className="full flex-max auto-scroll">
                {messages
                  .filter(
                    m =>
                      selectedConvo &&
                      ((m.sender === selectedConvo.sender &&
                        m.destination === selectedConvo.destination) ||
                        (m.sender === selectedConvo.destination &&
                          m.destination === selectedConvo.sender))
                  )
                  .concat()
                  .sort((a, b) => {
                    if (a.timestamp > b.timestamp) return 1;
                    if (a.timestamp < b.timestamp) return -1;
                    return 0;
                  })
                  .reverse()
                  .map(m => (
                    <p key={m.id} style={{ whiteSpace: "pre-wrap" }}>
                      <strong>{m.sender}</strong>: {m.content}
                    </p>
                  ))}
              </Card>
              <Mutation
                mutation={gql`
                  mutation SendMessage($message: MessageInput!) {
                    sendMessage(message: $message)
                  }
                `}
              >
                {action => (
                  <form
                    // eslint-disable-next-line
                    action={"javascript:void(0);"}
                    onSubmit={e => {
                      e.preventDefault();
                      if (!selectedConvo) return;
                      action({
                        variables: {
                          message: {
                            simulatorId: simulator.id,
                            destination: selectedConvo.destination,
                            sender: selectedConvo.sender,
                            content: messageInput
                          }
                        }
                      });
                      this.setState({ messageInput: "" });
                    }}
                  >
                    <Input
                      size="sm"
                      type="text"
                      value={messageInput}
                      onChange={evt =>
                        this.setState({ messageInput: evt.target.value })
                      }
                    />
                  </form>
                )}
              </Mutation>
            </Col>
          </Row>
        </Container>
        {newMessage && (
          <GroupManager
            {...this.props}
            cancel={() => this.setState({ newMessage: false })}
            startConvo={(sender, destination) =>
              this.setState({
                selectedConvo: { sender, destination, id: "new" },
                newMessage: false
              })
            }
          />
        )}
      </Fragment>
    );
  }
}

export default Conversations;
