import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import chalk from "chalk";
import schema from "../data";

export default (server, PORT) => {
  const ws = createServer(server);
  ws.on("error", err => {
    if (err.code === "EADDRINUSE") {
      console.log(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Shutting down..."
        )
      );
      process.exit(0);
    }
  });
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
