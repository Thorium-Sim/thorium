import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  split,
  from,
  InMemoryCache,
} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import {WebSocketLink} from "@apollo/client/link/ws";
import {MockLink} from "@apollo/client/testing";
import {setContext} from "@apollo/client/link/context";
import {FLIGHTS_QUERY} from "../containers/FlightDirector/Welcome/Welcome";
import {getTabId} from "@thorium/tab-id";

const hostname = window.location.hostname;
const protocol = window.location.protocol;
const wsProtocol = protocol === "https:" ? "wss:" : "ws:";
export const graphqlUrl =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : `${protocol}//${hostname}:${
        parseInt(window.location.port || 3000, 10) + 1
      }/graphql`;

const websocketUrl =
  process.env.NODE_ENV === "production"
    ? `${wsProtocol}//${window.location.host}/graphql`
    : `${wsProtocol}//${hostname}:${
        parseInt(window.location.port || 3000, 10) + 1
      }/graphql`;

const webSocketLink = new WebSocketLink({
  uri: websocketUrl,
  options: {
    reconnect: true,
    connectionParams: () => getTabId().then(clientId => ({clientId})),
  },
});

const wsLink = ApolloLink.from([
  onError(args => {
    const {response, graphQLErrors, networkError} = args;
    if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        const {message, locations, path} = error;
        console.error(
          `[Subscription Error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    }

    if (networkError) {
      console.error(`[Network error]: `, networkError);
    }
    if (response) response.errors = null;
  }),
  webSocketLink,
]);

const headersMiddleware = setContext((operation, {headers}) => {
  const core = window.location.pathname.includes("/core");
  return getTabId().then(clientId => ({
    headers: {...headers, clientId, core},
  }));
});

// const mutationMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   if (operation.query.definitions[0].operation === "mutation" && schema) {
//     const event =
//       operation?.query?.definitions?.[0]?.selectionSet?.selections?.[0]?.name
//         ?.value;
//     const variables = Object.keys(operation.variables).reduce((acc, key) => {
//       const _acc = acc;
//       if (operation.variables[key] !== undefined)
//         _acc[key] = operation.variables[key];
//       return _acc;
//     }, {});
//     const opDef = operation?.query.definitions?.[0];
//     const parentType = getOperationRootType(schema, opDef);
//     const fieldDef = getFieldDef(schema, parentType, event);
//     try {
//       const args = getArgumentValues(
//         fieldDef,
//         opDef.selectionSet.selections[0],
//         variables,
//       );
//       if (event) {
//         publish("mutation-event", {event, args});
//       }
//     } catch {
//       // Swallow the error
//     }
//   }

//   return forward(operation);
// });

const httpLink = ApolloLink.from([
  onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) console.error(`[Network error]:`, networkError);
  }),
  process.env.NODE_ENV === "test"
    ? new MockLink([{request: {query: FLIGHTS_QUERY}}])
    : new HttpLink({
        uri: graphqlUrl,
        opts: {
          mode: "cors",
        },
      }),
]);

const link = split(
  // split based on operation type
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: from([headersMiddleware, link]),
  assumeImmutableResults: true,
  // use restore on the cache instead of initialState
  cache: new InMemoryCache(),
  connectToDevTools: true,
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
