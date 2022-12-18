import {z} from "zod";
import {pubsub} from "./pubsub";
import {t} from "./liveQuery";

import {spaceEdventures} from "@client/containers/FlightDirector/FlightConfig/data";
import {addGithubIssue} from "@client/components/issueTracker/data";
import {googleSheets} from "@client/containers/FlightDirector/settingsData";
export const router = t.router({
  // Requests
  timers: t.procedure.input(z.object({id: z.string()})).request(({ctx}) => {
    if (!ctx.flight) throw new Error("Flight has not started");
    return ctx.flight.timers;
  }),
  thorium: t.procedure.request(({ctx}) => ({
    thoriumId: ctx.server.thoriumId,
  })),
  clients: t.procedure.request(({ctx}) => ctx.server.clients),
  client: t.procedure
    .filter((publish: {clientId: string}, {ctx}) => {
      if (publish && publish.clientId !== ctx.id) return false;
      return true;
    })
    .request(({ctx}) => {
      const {id, name, connected} = ctx.server.clients[ctx.id] as any;

      const {officersLog, id: _id, ...flightClient} = ctx.flightClient || {};
      return {id, name, connected, ...flightClient};
    }),
  random: t.procedure.request(() => Math.random()),
  dbDump: t.procedure.request(({ctx}) => ctx.database),

  // Sends
  addGithubIssue,
  serverSnapshot: t.procedure.send(({ctx}) => {
    const server = ctx.server;
    server.writeFile(true);
    const flight = ctx.flight;
    flight?.writeFile(true);
    return {ok: true};
  }),
  randomize: t.procedure.send(() => {
    pubsub.publish.random();
  }),
  spaceEdventures,
  googleSheets,
});

export type AppRouter = typeof router;
