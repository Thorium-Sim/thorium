import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import multer from 'multer';
import moment from 'moment';
import cors from 'cors';
import request from 'request';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import graphqlExpressUpload from 'graphql-server-express-upload';
import { schema, subscriptionManager } from './server/data';
import electron from 'electron';

import './server/events';
import './server/processes';

const GRAPHQL_PORT = 3001;
const WS_PORT = 3002;

const GraphQLOptions = () => ({
  schema,
});

let appDir = './';
if (electron.app) {
  appDir = electron.app.getPath('appData') + "/thorium/";
}

const upload = multer({
  dest: appDir + 'temp',
});

const options = {
  endpointURL: '/graphql', // URL for the GraphQL endpoint this instance of GraphiQL serves
};

export const websocketServer = createServer((req, response) => {
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

export const graphQLServer = express();
graphQLServer.use(require('express-status-monitor')());
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

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  ));

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`,
  ));
