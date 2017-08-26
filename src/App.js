import React from "react";
import randomWords from "random-words";
import ApolloClient from "apollo-client";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import { addTypenameToSelectionSet } from "apollo-client/queries/queryTransform";
import { ApolloProvider } from "react-apollo";
import createNetworkInterface from "apollo-upload-network-interface";
import App from "./containers/App";
import fragmentMatcher from "./helpers/fragmentMatcher";
import "./app.scss";

const hostname = window.location.hostname;

const wsClient = new SubscriptionClient(`ws://${hostname}:3002`, {
  reconnect: true
});

// Set a clientId for the client
let clientId = localStorage.getItem("thorium_clientId");
if (!clientId) {
  clientId = randomWords(3).join("-");
  // Just to test out the webpack
  localStorage.setItem("thorium_clientId", clientId);
}
const networkInterface = createNetworkInterface({
  uri: `http://${hostname}:3001/graphql`,
  headers: { clientId },
  opts: {
    mode: "cors"
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  queryTransformer: addTypenameToSelectionSet,
  fragmentMatcher,
  dataIdFromObject: result => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});

const ApolloApp = () =>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>;

export default ApolloApp;
