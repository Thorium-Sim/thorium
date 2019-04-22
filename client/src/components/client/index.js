import React, { Component } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { getClientId, setClientId } from "helpers/getClientId";
import SimulatorData from "./simulatorData";
import Credits from "./credits";
import "./client.scss";

const fragments = {
  clientData: gql`
    fragment ClientData on Client {
      id
      token
      email
      cracked
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
      soundPlayer
    }
  `
};

const QUERY = gql`
  query Client($clientId: ID!) {
    clients(clientId: $clientId) {
      ...ClientData
    }
  }
  ${fragments.clientData}
`;
const SUBSCRIPTION = gql`
  subscription ClientUpdate($clientId: ID!) {
    clientChanged(client: $clientId) {
      ...ClientData
    }
  }
  ${fragments.clientData}
`;

class ClientData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false
    };
  }
  componentDidMount() {
    getClientId().then(clientId => {
      this.setState({ clientId });
      const { client } = this.props;
      // Register the client for the first time.
      client
        .mutate({
          mutation: gql`
            mutation RegisterClient($client: ID!) {
              clientConnect(client: $client)
            }
          `,
          variables: { client: clientId }
        })
        .then(() => this.setState({ registered: true }));
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
    });
  }
  updateClientId = async clientId => {
    const oldClientId = await getClientId();
    setClientId(clientId);
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
    const { clientId, registered } = this.state;
    if (!clientId) return null;

    return (
      <Query query={QUERY} variables={{ clientId }} skip={!registered}>
        {({ loading, data, subscribeToMore }) => {
          if (!data)
            return (
              <Credits
                {...this.props}
                clientId={clientId}
                updateClientId={this.updateClientId}
              />
            );
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
