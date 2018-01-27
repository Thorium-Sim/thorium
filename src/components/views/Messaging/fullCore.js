import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Card, Button } from "reactstrap";
import "./style.css";

const MESSAGING_SUB = gql`
  subscription GotMessage($simulatorId: ID!) {
    sendMessage(simulatorId: $simulatorId) {
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
    teamsUpdate(simulatorId: $simulatorId) {
      id
      name
      type
    }
  }
`;

class Messaging extends Component {
  subscription = null;
  teamSub = null;
  state = {
    messageInput: ""
  };
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: MESSAGING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
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
    if (!this.teamSub && !nextProps.data.loading) {
      this.teamSub = nextProps.data.subscribeToMore({
        document: TEAMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            teams: subscriptionData.data.teamsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
    this.teamSub && this.teamSub();
  }
  sendMessage = () => {
    const mutation = gql`
      mutation SendMessage($message: MessageInput!) {
        sendMessage(message: $message)
      }
    `;
    const { messageInput, selectedDestination, selectedSender } = this.state;
    const variables = {
      message: {
        simulatorId: this.props.simulator.id,
        destination: selectedDestination,
        sender: selectedSender,
        content: messageInput
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({ messageInput: "" });
  };
  newMessage = () => {
    const selectedSender = prompt("What do you want the sender to be?");
    if (selectedSender) {
      this.setState({
        selectedSender
      });
    }
  };
  render() {
    if (this.props.data.loading || !this.props.data.messages) return null;
    const { messages, teams } = this.props.data;
    const { messageInput, selectedDestination, selectedSender } = this.state;
    let senders = [];
    messages.forEach(m => {
      senders.push(m.sender);
    });
    senders = senders
      .concat(selectedSender)
      .filter((s, i, a) => a.indexOf(s) === i);
    const messageGroups = ["SecurityTeams", "DamageTeams", "MedicalTeams"];
    const destinations = []
      .concat(this.props.simulator.stations.map(s => s.name))
      .concat(messageGroups)
      .concat(senders)
      .concat(messages.map(m => m.destination))
      .filter((s, i, a) => a.indexOf(s) === i);
    const senderDestinations = selectedSender
      ? messages
          .reduce((prev, next) => {
            if (next.sender === selectedSender)
              return prev.concat(next.destination);
            return prev;
          }, [])
          .filter((s, i, a) => a.indexOf(s) === i)
      : [];
    return (
      <Container fluid className="core core-messaging">
        <Row>
          <Col sm={3}>
            <Row>
              <Button block color="primary" onClick={this.newMessage}>
                New Message
              </Button>
              <h4>Senders</h4>
              <Card>
                {senders.map(s => (
                  <p
                    key={`sender-${s}`}
                    onClick={() => this.setState({ selectedSender: s })}
                    className={s === selectedSender ? "selected" : ""}
                  >
                    {s}
                  </p>
                ))}
              </Card>
            </Row>
            {selectedSender && (
              <Row>
                <h4>Destinations</h4>
                <Card>
                  {destinations.map(g => (
                    <p
                      className={`${
                        senderDestinations.indexOf(g) > -1 ? "bold" : ""
                      } ${g === selectedDestination ? "selected" : ""}`}
                      onClick={() => this.setState({ selectedDestination: g })}
                      key={g}
                    >
                      {g}
                    </p>
                  ))}
                  {teams &&
                    teams
                      .filter(
                        t =>
                          messageGroups.findIndex(
                            m =>
                              m.toLowerCase().indexOf(t.type.toLowerCase()) > -1
                          ) > -1
                      )
                      .map(g => (
                        <p
                          className={`${
                            senderDestinations.indexOf(g.name) > -1
                              ? "bold"
                              : ""
                          } ${
                            g.name === selectedDestination ? "selected" : ""
                          }`}
                          onClick={() =>
                            this.setState({ selectedDestination: g.name })
                          }
                          key={g.name}
                        >
                          {g.name} - {g.type}
                        </p>
                      ))}
                </Card>
              </Row>
            )}
          </Col>
          {selectedDestination &&
            selectedSender && (
              <Col sm={9}>
                <h4>Messages</h4>
                <Card className="full">
                  {messages
                    .filter(
                      m =>
                        (m.sender === selectedSender &&
                          m.destination === selectedDestination) ||
                        (m.sender === selectedDestination &&
                          m.destination === selectedSender)
                    )
                    .concat()
                    .sort((a, b) => {
                      if (a.timestamp > b.timestamp) return 1;
                      if (a.timestamp < b.timestamp) return -1;
                      return 0;
                    })
                    .reverse()
                    .map(m => (
                      <p key={m.id}>
                        <strong>{m.sender}</strong>: {m.content}
                      </p>
                    ))}
                </Card>
                <form
                  // eslint-disable-next-line
                  action={"javascript:void(0);"}
                  onSubmit={this.sendMessage}
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
              </Col>
            )}
        </Row>
      </Container>
    );
  }
}

const MESSAGING_QUERY = gql`
  query Messages($simulatorId: ID!) {
    messages(simulatorId: $simulatorId) {
      id
      sender
      content
      timestamp
      simulatorId
      destination
    }
    teams(simulatorId: $simulatorId) {
      id
      name
      type
    }
  }
`;
export default graphql(MESSAGING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Messaging));
