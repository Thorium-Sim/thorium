import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";

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
  state = { messageInput: "" };
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
          return Object.assign({}, previousResult, {
            messages: previousResult.messages.concat(
              subscriptionData.data.sendMessage
            )
          });
        }
      });
    }
  }
  sendMessage = () => {
    const mutation = gql`
      mutation SendMessage($message: MessageInput!) {
        sendMessage(message: $message)
      }
    `;
    const { messageInput, selectedDestination } = this.state;
    const variables = {
      message: {
        simulatorId: this.props.simulator.id,
        destination: selectedDestination,
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
  render() {
    if (this.props.data.loading) return null;
    const { messages, simulators } = this.props.data;
    const stations = simulators[0].stations;
    const { messageInput, selectedDestination } = this.state;
    return (
      <div>
        <ul>
          {messages.map(m =>
            <li key={m.id} title={m.timestamp}>
              <strong>{m.sender}</strong>: {m.content}
            </li>
          )}
        </ul>
        <form action="javascript:" onSubmit={this.sendMessage}>
          <input
            onChange={evt => this.setState({ messageInput: evt.target.value })}
            value={messageInput}
          />
        </form>
        <select
          value={selectedDestination}
          onChange={evt =>
            this.setState({ selectedDestination: evt.target.value })}
        >
          {stations.map(s =>
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          )}
        </select>
      </div>
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
