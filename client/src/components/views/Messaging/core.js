import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Card, Button } from "reactstrap";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";

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
  state = {
    messageInput: ""
  };
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
    const { data, simulator } = this.props;
    if (data.loading || !data.messages) return null;
    const { messages, teams } = data;
    const { messageInput, selectedDestination, selectedSender } = this.state;

    if (!simulator.stations) return <div>No Stations</div>;
    const messageGroups = simulator.stations
      .reduce((prev, next) => prev.concat(next.messageGroups), [])
      .filter((a, i, arr) => arr.indexOf(a) === i);
    let senders = simulator.stations.map(s => s.name).concat(messageGroups);
    messages.forEach(m => {
      senders.push(m.sender);
    });
    senders = senders
      .concat(selectedSender)
      .filter((s, i, a) => a.indexOf(s) === i);
    const destinations = []
      .concat(simulator.stations.map(s => s.name))
      .concat(messageGroups)
      .concat(senders)
      .concat(messages.map(m => m.destination))
      .filter((s, i, a) => a.indexOf(s) === i && s);
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
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: MESSAGING_SUB,
              variables: {
                simulatorId: this.props.simulator.id
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
          <Col sm={4} className="vertical-row">
            <Button block size="sm" color="primary" onClick={this.newMessage}>
              New Sender
            </Button>
            <strong>Senders</strong>
            <Card>
              {senders.map(
                s =>
                  s && (
                    <p
                      key={`sender-${s}`}
                      onClick={() => this.setState({ selectedSender: s })}
                      className={`${s === selectedSender ? "selected" : ""} ${
                        messages.find(m => m.sender === s) ? "bold" : ""
                      }`}
                    >
                      {s}
                    </p>
                  )
              )}
            </Card>
            <strong>Destinations</strong>
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
                        m => m.toLowerCase().indexOf(t.type.toLowerCase()) > -1
                      ) > -1
                  )
                  .map(g => (
                    <p
                      className={`${
                        senderDestinations.indexOf(g.name) > -1 ? "bold" : ""
                      } ${g.name === selectedDestination ? "selected" : ""}`}
                      onClick={() =>
                        this.setState({ selectedDestination: g.name })
                      }
                      key={g.name}
                    >
                      {g.name} - {g.type}
                    </p>
                  ))}
            </Card>
          </Col>
          {selectedDestination &&
            selectedSender && (
              <Col sm={8} className="vertical-row">
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
