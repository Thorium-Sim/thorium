import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema, subscriptionManager } from './data/data.js';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import graphqlExpressUpload from 'graphql-server-express-upload';
import multer from 'multer';
import cors from 'cors';
import request from 'request';

import './events';
import './processes/engines';
import './processes/thrusters';
import './processes/sensorContacts';
const GRAPHQL_PORT = 3001;
const WS_PORT = 3002;

const GraphQLOptions = {
  schema,
};

const upload = multer({
  dest: 'temp',
});

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
graphQLServer.use(require('express-status-monitor')());
graphQLServer.use('*', cors());

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.use('/graphql',
  upload.array('files'),
  graphqlExpressUpload({ endpointURL: '/graphql' }),
  bodyParser.json(),
  graphqlExpress(GraphQLOptions));

graphQLServer.use('/graphiql', graphiqlExpress(options));

graphQLServer.use('/assets', (req, res) => {
  console.log(req.url);
  const baseUrl = 'https://s3.amazonaws.com/thorium-assets';
  request(baseUrl + req.url).pipe(res);
});

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  ));

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
  ));
