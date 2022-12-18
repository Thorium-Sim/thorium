import {DataContext} from "@server/newClasses/DataContext";
import {t} from "@server/newHelpers/liveQuery";
import {request, gql} from "graphql-request";
import {z} from "zod";
async function graphqlRequest(
  token: string | null,
  document: string,
  variables?: any,
) {
  return request(
    "https://us-central1-space-edventures.cloudfunctions.net/api/graphql",
    document,
    variables,
    {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  );
}

let spaceEdventuresData: null | {
  id: string;
  name: string;
  simulators: {id: string; name: string}[];
  badges: {id: string; name: string; description: string}[];
  missions: {id: string; name: string; description: string}[];
  flightTypes: {
    id: string;
    name: string;
    classHours: number;
    flightHours: number;
  }[];
} = null;
let spaceEdventuresTimeout = 0;

const spaceEdventuresQuery = gql`
  query {
    center {
      id
      name
      simulators {
        id
        name
      }
      badges(type: badge) {
        id
        name
        description
      }
      missions: badges(type: mission) {
        id
        name
        description
      }
      flightTypes {
        id
        name
        flightHours
        classHours
      }
    }
  }
`;

export const spaceEdventures = t.router({
  spaceEdventuresCenter: t.procedure.request(async ({ctx}) => {
    // Simple timeout based caching
    if (
      !spaceEdventuresData ||
      spaceEdventuresTimeout + 1000 * 60 * 5 < Number(new Date())
    ) {
      spaceEdventuresTimeout = Date.now();
      // TODO: Replace this token with one in the new database
      const data = await graphqlRequest(
        ctx.server.spaceEdventuresToken,
        spaceEdventuresQuery,
      );

      if (!data.center) return spaceEdventuresData;
      spaceEdventuresData = {...data.center, token: App.spaceEdventuresToken};
      return spaceEdventuresData;
    }
    if (spaceEdventuresData) {
      return spaceEdventuresData;
    }
  }),
  spaceEdventuresToken: t.procedure.request(({ctx}) => {
    return ctx.server.spaceEdventuresToken;
  }),
  setSpaceEdventuresToken: t.procedure
    .input(z.object({token: z.string()}))
    .send(async ({ctx, input: {token}}) => {
      // Check the token first
      const {center} = await await graphqlRequest(token, spaceEdventuresQuery);
      if (center) {
        ctx.server.spaceEdventuresToken = token;
        return center;
      }
    }),
});

// function tokenGenerator() {
//   var length = 10,
//     charset = "abcdefghjkmnpqrstuvwxyz123456789",
//     retVal = "";
//   for (var i = 0, n = charset.length; i < length; ++i) {
//     retVal += charset.charAt(Math.floor(Math.random() * n));
//   }
//   return retVal;
// };

// const badgeAssign = (
//   rootValue,
//   {badgeId, station},
//   {simulator, clientId, flight},
// ) => {
//   const clients = App.clients.filter(c => {
//     if (clientId) return c.id === clientId;
//     if (station)
//       return (
//         c.simulatorId === simulator.id &&
//         (c.station === station || c.id === station)
//       );
//     return c.flightId === flight.id;
//   });
//   const badges = clients.map(c => ({clientId: c.id, badgeId}));
//   flight.addBadges(badges);
// };

export const inputs = {
  setSpaceEdventuresToken: async (
    ctx: DataContext,
    {token}: {token: string},
  ) => {
    // Check the token first
    const {center} = await await graphqlRequest(token, spaceEdventuresQuery);
    if (center) {
      ctx.server.spaceEdventuresToken = token;
      return center;
    }
  },

  // assignSpaceEdventuresFlightRecord: (rootValue, {simulatorId, flightId}) => {
  //   const flight = App.flights.find(
  //     f => f.id === flightId || f.simulators.includes(simulatorId),
  //   );
  //   if (!flight) return;
  //   flight.submitSpaceEdventure();
  // },

  // assignSpaceEdventuresFlightType: (
  //   rootValue,
  //   {flightId, simulatorId, flightType},
  // ) => {
  //   const flight = App.flights.find(
  //     f => f.id === flightId || f.simulators.includes(simulatorId),
  //   );
  //   if (!flight) return;
  //   flight.setFlightType(flightType);
  //   pubsub.publish("flightsUpdate", App.flights);
  // },

  // removeSpaceEdventuresClient: (rootValue, {flightId, clientId}) => {
  //   const flight = App.flights.find(f => f.id === flightId);
  //   if (!flight) return;
  //   flight.removeClient(clientId);
  //   pubsub.publish("flightsUpdate", App.flights);
  // },
  // getSpaceEdventuresLogin: async (rootValue, {token}, context) => {
  //   async function doLogin() {
  //     let res: any = {};
  //     try {
  //       res = await GraphQLClient.query({
  //         query: `query GetUser($token:String!) {
  //       user:userByToken(token:$token) {
  //         id
  //         profile {
  //           name
  //           displayName
  //           rank {
  //             name
  //           }
  //         }
  //       }
  //     }
  //     `,
  //         variables: {token},
  //       });
  //     } catch (err) {
  //       if (err instanceof Error)
  //         return err.message.replace("GraphQL error:", "Error:");
  //     }
  //     const {
  //       data: {user},
  //     } = res;
  //     const clientId = context.clientId;
  //     if (user) {
  //       const client = App.clients.find(c => c.id === clientId);
  //       if (!client || !client.simulatorId || !client.station) return;
  //       client.login(
  //         user.profile.displayName ||
  //           user.profile.name ||
  //           user.profile.rank.name,
  //         true,
  //       );
  //       const flight = App.flights.find(f => f.id === client.flightId);
  //       if (flight) {
  //         flight.addSpaceEdventuresUser(client.id, user.id);
  //         flight.loginClient({
  //           id: client.id,
  //           token: tokenGenerator(),
  //           simulatorId: client.simulatorId,
  //           name: client.station,
  //         });
  //       }
  //     }
  //     pubsub.publish("clientChanged", App.clients);
  //   }
  //   return doLogin();
  // },
  // assignSpaceEdventuresBadge: badgeAssign,
  //   assignSpaceEdventuresMission: badgeAssign,
};
