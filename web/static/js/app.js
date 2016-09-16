import "phoenix_html";
import React from 'react';
import { render } from 'react-dom';
import guid from './helpers/guid';
import App from './containers/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { addTypenameToSelectionSet } from 'apollo-client/queries/queryTransform';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import {Socket} from 'phoenix';
import { Client } from 'subscriptions-transport-ws';
import addGraphQLSubscriptions from './subscription';


//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  //Just to test out the webpack
  localStorage.setItem('thorium_clientId',clientId);
}

const wsClient = new Client('ws://localhost:4000/socket/websocket?vsn=1.0.0&otherClient=true&client_id=' + clientId);

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
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





let socket = new Socket('/socket',  {params: {client_id: clientId}});
socket.connect();
let presence = socket.channel("session",{client_id: clientId});
presence.join();


render(
 (<ApolloProvider client={client}>
  <App />
  </ApolloProvider>),
 document.getElementById('app')
 );
