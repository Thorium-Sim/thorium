import React from 'react';
import guid from './helpers/guid';
import App from './containers/App';
import ApolloClient from 'apollo-client';
import createNetworkInterface from 'apollo-upload-network-interface'
import { Client } from 'subscriptions-transport-ws';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import addGraphQLSubscriptions from './helpers/subscriptions.js';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import './app.scss';

const wsClient = new Client('ws://apple.local:3002');

//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  //Just to test out the webpack
  localStorage.setItem('thorium_clientId',clientId);
}

const networkInterface = createNetworkInterface({
  uri: 'http://apple.local:3001/graphql',
  opts: {
    mode: 'cors',
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
  );

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  queryTransformer: addTypenameToSelectionSet,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});

const ADD_CLIENT = gql`
mutation AddClient($id: ID!){
  clientConnect(id: $id)
}
`;
const REMOVE_CLIENT = gql`
mutation RemoveClient($id: ID!){
  clientDisconnect(id: $id)
}
`;

client.mutate({
  mutation:ADD_CLIENT,
  variables: {id: clientId}
});

window.onbeforeunload = () => {
 client.mutate({
  mutation: REMOVE_CLIENT,
  variables: {id: clientId}
})
 return null;
}

export default () => (<ApolloProvider client={client}>
  <App />
  </ApolloProvider>);
