import React, { Component } from "react";
import gql from "graphql-tag.macro";
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
  InputGroupAddon
} from "reactstrap";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { titleCase } from "change-case";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";

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

const TEAMS_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId, cleared: true) {
      id
      name
      type
      cleared
    }
  }
`;

export const trainingSteps = [
  {
    selector: "#nothing",
    content: (
      <FormattedMessage
        id="messages-training-1"
        defaultMessage="Messaging allows you to send text messages between people within your ship."
      />
    )
  },
  {
    selector: ".message-dropdown",
    content: (
      <FormattedMessage
        id="messages-training-2"
        defaultMessage="To send a message, click this button. A dropdown will appear showing you all of the options for places you can send your message."
      />
    )
  },
  {
    selector: ".convoList",
    content: (
      <FormattedMessage
        id="messages-training-3"
        defaultMessage="This is your list of current conversations. Click on a conversation to see that conversation on the right side."
      />
    )
  },
  {
    selector: ".messages-list",
    content: (
      <FormattedMessage
        id="messages-training-4"
        defaultMessage="The messages in the selected conversation appear here."
      />
    )
  },
  {
    selector: ".text-input",
    content: (
      <FormattedMessage
        id="messages-training-5"
        defaultMessage="Type any message you want to send in this box. Press the enter key or the 'Send Message' button to send the message."
      />
    )
  }
];

class Messaging extends Component {
  state = {
    messageInput: "",
    stationsShown: false,
    selectedConversation: null
  };
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
    if (el) {
      scrollTo(el, el.scrollHeight, 600);
    }
  };
  toggleStations = () => {
    this.setState({
      stationsShown: !this.state.stationsShown
    });
  };
  render() {
    const { simulator } = this.props;
    const { messages, simulators, teams } = this.props.data.loading
      ? { messages: [], teams: [], simulators: [{ stations: [] }] }
      : this.props.data;
    const { bridgeOfficerMessaging } = this.props.simulator;
    if (!simulators | !messages | !teams) return null;
    const stations = simulator.stations.filter(
      s =>
        s.name !== this.props.station.name &&
        (s.cards.find(c => c.component.name === "Messaging") ||
          s.widgets.indexOf("messages") > -1)
    );
    const messageGroups = this.props.station.messageGroups;
    const { messageInput, stationsShown, selectedConversation } = this.state;
    const convoObj = messages
      .filter(
        m =>
          !teams.find(
            t =>
              t.cleared === true &&
              (t.name === m.sender || t.name === m.destination)
          )
      )
      .reduce((prev, next) => {
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
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: MESSAGING_SUB,
              variables: {
                simulatorId: this.props.simulator.id,
                station: this.props.station.name
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
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TEAMS_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  teams: subscriptionData.data.teamsUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={3}>
            <h4>Conversations</h4>
            <Card className="convoList">
              {conversations.map(c => (
                <li
                  className={`list-group-item ${
                    c.convo === selectedConversation ? "selected" : ""
                  }`}
                  key={c.id}
                  onClick={() =>
                    this.setState({ selectedConversation: c.convo })
                  }
                >
                  <div>{c.convo}</div>
                  <div>
                    <small>
                      {c.content
                        ? `${c.content.substr(0, 25)}${
                            c.content.length > 25 ? "..." : ""
                          }`
                        : null}
                    </small>
                  </div>
                </li>
              ))}
            </Card>
            <ButtonDropdown
              className="btn-block message-dropdown"
              isOpen={stationsShown}
              toggle={this.toggleStations}
              direction="up"
            >
              <DropdownToggle caret size="lg" block color="primary">
                New Message
              </DropdownToggle>
              <DropdownMenu className="messages-destinations">
                {bridgeOfficerMessaging &&
                  stations.map(s => (
                    <DropdownItem
                      key={s.name}
                      onClick={() =>
                        this.setState({ selectedConversation: s.name })
                      }
                    >
                      {s.name}
                    </DropdownItem>
                  ))}
                {messageGroups && bridgeOfficerMessaging && (
                  <DropdownItem disabled>--------------</DropdownItem>
                )}
                {messageGroups &&
                  messageGroups.map(g => (
                    <DropdownItem
                      key={g}
                      onClick={() => this.setState({ selectedConversation: g })}
                    >
                      {titleCase(g)}
                    </DropdownItem>
                  ))}
                {teams &&
                  teams.filter(
                    t =>
                      !t.cleared &&
                      messageGroups.findIndex(
                        m => m.toLowerCase().indexOf(t.type.toLowerCase()) > -1
                      ) > -1
                  ).length > 0 && (
                    <DropdownItem disabled>--------------</DropdownItem>
                  )}
                {teams &&
                  teams
                    .filter(
                      t =>
                        !t.cleared &&
                        messageGroups.findIndex(
                          m =>
                            m.toLowerCase().indexOf(t.type.toLowerCase()) > -1
                        ) > -1
                    )
                    .map(g => (
                      <DropdownItem
                        key={g.name}
                        onClick={() =>
                          this.setState({ selectedConversation: g.name })
                        }
                      >
                        {g.name}
                      </DropdownItem>
                    ))}
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col sm={9} className="messages-list">
            <h4>Messages</h4>

            <Card>
              <div className="message-holder" ref="messageHolder">
                {selectedConversation && (
                  <h2 className="convoHeader">
                    Conversation with {selectedConversation}
                  </h2>
                )}
                {messages
                  .filter(
                    m =>
                      m.sender === selectedConversation ||
                      m.destination === selectedConversation
                  )
                  .map(m => (
                    <p
                      key={m.id}
                      className={`message ${
                        m.sender === this.props.station.name ? "sent" : ""
                      }`}
                    >
                      <strong>{m.sender}</strong>: {m.content}
                    </p>
                  ))}
              </div>
            </Card>
            <form
              className="text-input"
              // eslint-disable-next-line
              action={"javascript:void(0);"}
              onSubmit={this.sendMessage}
            >
              <InputGroup>
                <Input
                  disabled={!selectedConversation}
                  onChange={evt =>
                    this.setState({ messageInput: evt.target.value })
                  }
                  value={messageInput}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    disabled={!selectedConversation}
                    type="submit"
                    color="primary"
                  >
                    Send Message
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
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
    teams(simulatorId: $simulatorId, cleared: true) {
      id
      name
      type
      cleared
    }
    simulators(id: $simId) {
      id
      bridgeOfficerMessaging
    }
  }
`;
export default graphql(MESSAGING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id,
      station: ownProps.station.name
    }
  })
})(withApollo(Messaging));

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  let difference = to - element.scrollTop;
  let perTick = (difference / duration) * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
