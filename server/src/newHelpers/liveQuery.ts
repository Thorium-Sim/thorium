import {SocketStream} from "@fastify/websocket";
import type {buildDatabase} from "@server/init/buildDatabase";
import {inferAsyncReturnType, initLiveQuery} from "@thorium/live-query/server";
import {FastifyRequest, FastifyReply} from "fastify";
import {DataContext} from "@server/newClasses/DataContext";

type ExtraContext = Awaited<ReturnType<typeof buildDatabase>>;
export function createContext({
  req,
  res,
  context,
}: {
  req: FastifyRequest;
  res: FastifyReply;
  context: ExtraContext;
}) {
  const result = new DataContext(req.headers["client-id"] as string, context);
  return result;
}

export async function createWSContext({
  connection,
  context,
}: {
  connection: SocketStream;
  context: ExtraContext;
}) {
  const result = await Promise.race([
    new Promise<{id: string}>(res => {
      const handleConnection = (data: any) => {
        const {type, ...message} = JSON.parse(data.toString());
        if (type === "clientConnect") {
          res(new DataContext(message.id, context));
        }
      };
      connection.socket.on("message", handleConnection);
    }),
    new Promise((res, rej) =>
      setTimeout(() => rej(`Client Connect Timeout`), 60 * 1000),
    ),
  ]);
  return result;
}
type Context = inferAsyncReturnType<typeof createContext>;
export const t = initLiveQuery.context<Context>().create();
