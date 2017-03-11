import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import multer from 'multer';
import cors from 'cors';
import request from 'request';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import graphqlExpressUpload from 'graphql-server-express-upload';
import { schema, subscriptionManager } from './server/data';
import scribe from './server/helpers/logging';

import './server/events';
import './server/processes/engines';
import './server/processes/thrusters';
import './server/processes/sensorContacts';
import './server/processes/clientPing';

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

const websocketServer = createServer((req, response) => {
  response.writeHead(404);
  response.end();
});

// eslint-disable-next-line
new SubscriptionServer(
{
  subscriptionManager,
},
{
  server: websocketServer,
},
);

const graphQLServer = express();
graphQLServer.use(require('express-status-monitor')());
graphQLServer.use('/logs', scribe.webPanel());
graphQLServer.use('*', cors());

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.use('/graphql',
  upload.array('files'),
  graphqlExpressUpload({ endpointURL: '/graphql' }),
  bodyParser.json({ limit: '1mb' }),
  graphqlExpress(GraphQLOptions));

graphQLServer.use('/graphiql', graphiqlExpress(options));

graphQLServer.use('/assets', (req, res) => {
  const baseUrl = 'https://s3.amazonaws.com/thorium-assets';
  request(baseUrl + req.url)
  .on('response', (response) => {
    if (response.statusCode !== 200) {
      // Replace the simulator with 'default';
      const assetPath = path.parse(req.url);
      request(`${baseUrl}${assetPath.dir}/default${assetPath.ext}`).pipe(res);
      return false;
    }
    response.pipe(res);
    return null;
  });
});

graphQLServer.listen(GRAPHQL_PORT, () => log.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  ));

websocketServer.listen(WS_PORT, () => log.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`,
  ));
