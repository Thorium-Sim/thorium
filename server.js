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

graphQLServer.use('/assets', (req, res) => {
  const baseUrl = 'https://s3.amazonaws.com/thorium-assets';
  res.end();
  const headers = {
    "Cache-Control": "max-age=86400",
    "Expires": moment().add(1, 'day').startOf('day').format('ddd, DD MMM YYYY HH:mm:ss G[M]T'),
    "Last-Modified":moment().startOf('day').format('ddd, DD MMM YYYY HH:mm:ss G[M]T'),
  };
  if (req.url.substr(-3) === 'svg'){
    headers['Content-Type'] = 'image/svg+xml';
  }
  res.set(headers);
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

// eslint-disable-next-line
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  ));

// eslint-disable-next-line
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`,
  ));
