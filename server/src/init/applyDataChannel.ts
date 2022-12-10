import buildHTTPServer from "./buildHttpServer";
import websocketPlugin from "@fastify/websocket";
import {DataContext} from "@server/newHelpers/types";
import {ServerClient} from "@server/newClasses/ServerClient";
import {AuthData} from "@thorium/types";

type Awaited<T> = T extends Promise<infer U> ? U : T;

export async function applyDataChannel(
  app: Awaited<ReturnType<typeof buildHTTPServer>>,
  database: Pick<DataContext, "server" | "flight">,
) {
  // Set up WebSockets too, but only for NetSend, NetRequest
  await app.register(websocketPlugin);
  app.get("/ws", {websocket: true}, async (connection, req) => {
    try {
      const authData = (await Promise.race([
        new Promise(res => {
          const handleConnection = (data: any) => {
            const message = JSON.parse(data.toString()) as AuthData;
            if (message.type === "clientConnect") {
              res(message);
            }
          };
          connection.socket.on("message", handleConnection);
        }),
        new Promise((res, rej) =>
          setTimeout(() => rej(`Client Connect Timeout`), 5000),
        ),
      ])) as AuthData;
      const clientId = authData.clientId;
      let client = database.server.clients[clientId];
      if (!client) {
        client = new ServerClient({id: clientId});
        database.server.clients[clientId] = client;
      }
      client.connected = true;
      await client.initWebSocket(connection, database);
      pubsub.publish("thorium");
      pubsub.publish("clients");
      pubsub.publish("client", {clientId: client.id});
    } catch (err) {
      connection.socket.close();
      console.error(err);
    }
  });
}
