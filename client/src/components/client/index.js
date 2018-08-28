import React, { Component } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import randomWords from "random-words";
import SubscriptionHelper from "../../helpers/subscriptionHelper";
import SimulatorData from "./simulatorData";
import Credits from "./credits";
import "./client.scss";

const queryData = `
id
flight {
  id
  name
  date
}
simulator {
  id
  name
}
station {
  name
}
loginName
loginState
offlineState
hypercard
movie
training
caches
overlay
`;

const QUERY = gql`
  query Client($clientId: ID!) {
    clients(clientId: $clientId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription ClientUpdate($clientId: ID!) {
    clientChanged(client: $clientId) {
${queryData}
    }
  }
`;

class ClientData extends Component {
  constructor(props) {
    super(props);
    let clientId = localStorage.getItem("thorium_clientId");
    if (!clientId) {
      clientId = randomWords(3).join("-");
      localStorage.setItem("thorium_clientId", clientId);
    }
    this.state = {
      clientId
    };
  }
  componentDidMount() {
    const { clientId } = this.state;
    const { client } = this.props;
    // Register the client for the first time.
    setTimeout(() => {
      client.mutate({
        mutation: gql`
          mutation RegisterClient($client: ID!) {
            clientConnect(client: $client)
          }
        `,
        variables: { client: clientId }
      });
    }, 100);
    // Keep the context menu from opening.
    if (process.env.NODE_ENV === "production") {
      window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    }
    // Disconnect the client when the browser closes.
    window.onbeforeunload = () => {
      client.mutate({
        mutation: gql`
          mutation RemoveClient($id: ID!) {
            clientDisconnect(client: $id)
          }
        `,
        variables: { id: clientId }
      });
      return null;
    };
  }
  updateClientId = clientId => {
    const oldClientId = this.state.clientId;
    localStorage.setItem("thorium_clientId", clientId);
    this.setState({ clientId });
    this.props.client.mutate({
      mutation: gql`
        mutation RemoveClient($id: ID!) {
          clientDisconnect(client: $id)
        }
      `,
      variables: { id: oldClientId }
    });
    this.props.client
      .mutate({
        mutation: gql`
          mutation RegisterClient($client: ID!) {
            clientConnect(client: $client)
          }
        `,
        variables: { client: clientId }
      })
      .then(() => {
        window.location.reload();
      });
  };
  render() {
    const { clientId } = this.state;
    if (!clientId) return null;

    return (
      <Query query={QUERY} variables={{ clientId }}>
        {({ loading, data, subscribeToMore }) => {
          const { clients } = data;
          if (loading || !clients) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { clientId },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      clients: subscriptionData.data.clientChanged
                    });
                  }
                })
              }
            >
              {!clients[0] || !clients[0].simulator || !clients[0].station ? (
                <Credits
                  {...this.props}
                  clientId={clientId}
                  {...clients[0]}
                  client={clients[0]}
                  updateClientId={this.updateClientId}
                />
              ) : (
                <SimulatorData
                  {...this.props}
                  {...clients[0]}
                  clientId={clientId}
                  updateClientId={this.updateClientId}
                  client={clients[0]}
                />
              )}
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default withApollo(ClientData);
