import randomWords from "random-words";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { MockLink } from "react-apollo/test-utils";
import { FLIGHTS_QUERY } from "../containers/FlightDirector/Welcome";
// Set a clientId for the client
let clientId = localStorage.getItem("thorium_clientId");
if (!clientId) {
  clientId = randomWords(3).join("-");
  // Just to test out the webpack
  localStorage.setItem("thorium_clientId", clientId);
}

const hostname = window.location.hostname;

const wsLink = new WebSocketLink({
  uri: `ws://${hostname}:${parseInt(window.location.port, 10) + 2}`,
  options: {
    reconnect: true
  }
});

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

const cache = new InMemoryCache({
  dataIdFromObject: result => {
    if (result.id && result.__typename && result.count) {
      return result.__typename + result.id + result.count;
    }
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
  addTypename: true,
  //cacheResolvers: {},
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: "UNION",
            name: "Location",
            possibleTypes: [
              {
                name: "Deck"
              },
              {
                name: "Room"
              }
            ]
          }
        ]
      }
    }
  })
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
