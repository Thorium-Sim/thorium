import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema, subscriptionManager } from './data/data.js';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import cors from 'cors';

import './processes/engines';
import './processes/thrusters';

const GRAPHQL_PORT = 3001;
const WS_PORT = 3002;

const GraphQLOptions = {
  schema,
};

const options = {
  endpointURL: '/graphql', // URL for the GraphQL endpoint this instance of GraphiQL serves
};

const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// eslint-disable-next-line
new SubscriptionServer(
  { subscriptionManager },
  websocketServer
  );

const graphQLServer = express();
graphQLServer.use('*', cors());

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.use('/graphql', bodyParser.json(),
  graphqlExpress(GraphQLOptions));

graphQLServer.use('/graphiql', graphiqlExpress(options));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  ));

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
  ));
