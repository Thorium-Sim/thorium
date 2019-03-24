import randomWords from "random-words";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { MockLink } from "react-apollo/test-utils";
import { Hermes } from "apollo-cache-hermes";
import { FLIGHTS_QUERY } from "../containers/FlightDirector/Welcome";
import * as Sentry from "@sentry/browser";

// Set a clientId for the client
let clientId = localStorage.getItem("thorium_clientId");
if (!clientId) {
  clientId = randomWords(3).join("-");
  // Just to test out the webpack
  localStorage.setItem("thorium_clientId", clientId);
}

const hostname = window.location.hostname;

const wsLink = ApolloLink.from([
  onError(args => {
    const { response, graphQLErrors, networkError } = args;
    if (graphQLErrors)
      graphQLErrors.forEach(error => {
        const { message, locations, path } = error;
        console.log(
          `[Subscription Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        Sentry.captureException(error);
      });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      Sentry.captureException(networkError);
    }
    if (response) response.errors = null;
  }),
  new WebSocketLink({
    uri: `ws://${hostname}:${parseInt(window.location.port, 10) + 1}/graphql`,
    options: {
      reconnect: true
    }
  })
]);

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  process.env.NODE_ENV === "test"
    ? new MockLink([{ request: { query: FLIGHTS_QUERY } }])
    : new HttpLink({
        uri: `http://${hostname}:${parseInt(window.location.port, 10) +
          1}/graphql`,
        headers: { clientId },
        opts: {
          mode: "cors"
        }
      })
]);

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const cache = new Hermes({
  entityIdForNode(node) {
    if (node.id && node.__typename && node.count) {
      return node.__typename + node.id + node.count;
    }
    if (node.id && node.__typename) {
      return node.__typename + node.id;
    }
    return null;
  }
});

const client = new ApolloClient({
  link,
  // use restore on the cache instead of initialState
  cache: cache.restore(window.__APOLLO_CLIENT__),
  ssrMode: true,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    mutate: {
      errorPolicy: "all"
    }
  }
});

export default client;
