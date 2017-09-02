import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Card,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupButton
} from "reactstrap";
import "./style.scss";

const MESSAGING_SUB = gql`
  subscription GotMessage($simulatorId: ID!, $station: String) {
    sendMessage(simulatorId: $simulatorId, station: $station) {
      id
      sender
      content
      timestamp
      simulatorId
      destination
    }
  }
`;

class Messaging extends Component {
  subscription = null;
  state = {
    messageInput: "",
    stationsShown: false,
    selectedConversation: null
  };
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: MESSAGING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id,
          station: nextProps.station.name
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          if (!subscriptionData.data.sendMessage) return previousResult;
          setTimeout(this.scrollElement, 100);
          return Object.assign({}, previousResult, {
            messages: previousResult.messages.concat(
              subscriptionData.data.sendMessage
            )
          });
        }
      });
    }
  }
  componentDidUpdate() {
    const el = this.refs.messageHolder;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
  sendMessage = () => {
    const mutation = gql`
      mutation SendMessage($message: MessageInput!) {
        sendMessage(message: $message)
      }
    `;
    const { messageInput, selectedConversation } = this.state;
    const variables = {
      message: {
        simulatorId: this.props.simulator.id,
        destination: selectedConversation,
        sender: this.props.station.name,
        content: messageInput
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({ messageInput: "" });
  };
  scrollElement = () => {
    const el = this.refs.messageHolder;
    scrollTo(el, el.scrollHeight, 600);
  };
  toggleStations = () => {
    this.setState({
      stationsShown: !this.state.stationsShown
    });
  };
  render() {
    const { messages, simulators } = this.props.data.loading
      ? { messages: [], simulators: [{ stations: [] }] }
      : this.props.data;
    const stations = simulators[0].stations.filter(
      s => s.name !== this.props.station.name
    );
    const messageGroups = this.props.station.messageGroups;
    const { messageInput, stationsShown, selectedConversation } = this.state;
    const convoObj = messages.reduce((prev, next) => {
      if (next.sender === this.props.station.name) {
        prev[next.destination] = Object.assign({}, next, {
          convo: next.destination
        });
      } else if (messageGroups.indexOf(next.destination) > -1) {
        prev[next.destination] = Object.assign({}, next, {
          convo: next.destination
        });
      } else {
        prev[next.sender] = Object.assign({}, next, { convo: next.sender });
      }
      return prev;
    }, {});
    const conversations = Object.keys(convoObj)
      .map(c => convoObj[c])
      .sort((a, b) => {
        if (new Date(a.timestamp) > new Date(b.timestamp)) return -1;
        if (new Date(a.timestamp) < new Date(b.timestamp)) return 1;
        return 0;
      });
    return (
      <Container className="messages">
        <Row>
          <Col sm={3}>
            <h4>Conversations</h4>
            <Card className="convoList">
              {conversations.map(c =>
                <li
                  className={`list-group-item ${c.convo === selectedConversation
                    ? "selected"
                    : ""}`}
                  key={c.id}
                  onClick={() =>
                    this.setState({ selectedConversation: c.convo })}
                >
                  <div>
                    {c.convo}
                  </div>
                  <div>
                    <small>
                      {`${c.content.substr(0, 25)}${c.content.length > 25
                        ? "..."
                        : ""}`}
                    </small>
                  </div>
                </li>
              )}
            </Card>
            <ButtonDropdown
              className="btn-block"
              isOpen={stationsShown}
              toggle={this.toggleStations}
              dropup
            >
              <DropdownToggle caret size="lg" block color="primary">
                New Message
              </DropdownToggle>
              <DropdownMenu>
                {stations.map(s =>
                  <DropdownItem
                    key={s.name}
                    onClick={() =>
                      this.setState({ selectedConversation: s.name })}
                  >
                    {s.name}
                  </DropdownItem>
                )}
                <DropdownItem disabled>⸺⸺⸺⸺⸺</DropdownItem>
                {messageGroups.map(g =>
                  <DropdownItem
                    key={g}
                    onClick={() => this.setState({ selectedConversation: g })}
                  >
                    {g}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col sm={9}>
            <h4>Messages</h4>

            <Card>
              <div className="message-holder" ref="messageHolder">
                {selectedConversation &&
                  <h2 className="convoHeader">
                    Conversation with {selectedConversation}
                  </h2>}
                {messages
                  .filter(
                    m =>
                      m.sender === selectedConversation ||
                      m.destination === selectedConversation
                  )
                  .map(m =>
                    <p
                      key={m.id}
                      className={`message ${m.sender === this.props.station.name
                        ? "sent"
                        : ""}`}
                    >
                      <strong>{m.sender}</strong>: {m.content}
                    </p>
                  )}
              </div>}
            </Card>
            <form action="javascript:" onSubmit={this.sendMessage}>
              <InputGroup>
                <Input
                  disabled={!selectedConversation}
                  onChange={evt =>
                    this.setState({ messageInput: evt.target.value })}
                  value={messageInput}
                />
                <InputGroupButton>
                  <Button
                    disabled={!selectedConversation}
                    type="submit"
                    color="primary"
                  >
                    Send Message
                  </Button>
                </InputGroupButton>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const MESSAGING_QUERY = gql`
  query Messages($simulatorId: ID!, $simId: String, $station: String) {
    messages(simulatorId: $simulatorId, station: $station) {
      id
      sender
      content
      timestamp
      simulatorId
      destination
    }
    simulators(id: $simId) {
      stations {
        name
        messageGroups
      }
    }
  }
`;
export default graphql(MESSAGING_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id,
      station: ownProps.station.name
    }
  })
})(withApollo(Messaging));

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
