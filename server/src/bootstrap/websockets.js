import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import schema from "../data";

export default (server, PORT) => {
  const ws = createServer(server);
  ws.listen(PORT, () => {
    // Set up the WebSocket for handling GraphQL subscriptions

    new SubscriptionServer( // eslint-disable-line
      {
        execute,
        subscribe,
        schema
      },
      {
        server: ws,
        path: "/subscriptions"
      }
    );
  });
  return Promise.resolve();
};
