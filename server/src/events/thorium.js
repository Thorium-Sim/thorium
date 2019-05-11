import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import autoUpdate from "../bootstrap/autoupdate";
import heap from "../helpers/heap";
import GraphQLClient from "../helpers/graphqlClient";
import tokenGenerator from "../helpers/tokenGenerator";

App.on("toggleAutoUpdate", ({ autoUpdate }) => {
  App.autoUpdate = autoUpdate;
  pubsub.publish("thoriumUpdate", App);
});

App.on("triggerAutoUpdate", () => {
  autoUpdate(true);
});

App.on("setTrackingPreference", ({ pref }) => {
  App.doTrack = pref;
  App.askedToTrack = true;
  heap.stubbed = !pref;
});

App.on("importTaskTemplates", () => {
  if (App.addedTaskTemplates) return;
  App.addedTaskTemplates = true;
  const templates = require("../helpers/baseTaskTemplates.js")();
  App.taskTemplates = App.taskTemplates.concat(templates);
  pubsub.publish("taskTemplatesUpdate", App.taskTemplates);
});

App.on("setSpaceEdventuresToken", async ({ token, cb }) => {
  // Check the token first
  const {
    data: { center }
  } = await GraphQLClient.query({
    query: `query {
      center {
        id
        name
      }
    }`,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  if (center) {
    App.spaceEdventuresToken = token;
    cb(center);
  }
  cb();
});

App.on("assignSpaceEdventuresFlightRecord", ({ simulatorId, flightId }) => {
  const flight = App.flights.find(
    f => f.id === flightId || f.simulators.includes(simulatorId)
  );
  flight.submitSpaceEdventure();
});
const badgeAssign = ({
  badgeId,
  station,
  context: { simulator, flight, clientId }
}) => {
  const clients = App.clients.filter(c => {
    if (clientId) return c.id === clientId;
    if (station) return c.simulatorId === simulator.id && c.station === station;
    return c.flightId === flight.id;
  });
  const badges = clients.map(c => ({ clientId: c.id, badgeId }));
  flight.addBadges(badges);
};
App.on("assignSpaceEdventuresBadge", badgeAssign);
App.on("assignSpaceEdventuresMission", badgeAssign);
App.on("getSpaceEdventuresLogin", async ({ token, context, cb }) => {
  async function doLogin() {
    let res = {};
    try {
      res = await GraphQLClient.query({
        query: `query GetUser($token:String!) {
      user:userByToken(token:$token) {
        id
        profile {
          name
          displayName
          rank {
            name
          }
        }
      }
    }    
    `,
        variables: { token }
      });
    } catch (err) {
      return err.message.replace("GraphQL error:", "Error:");
    }
    const {
      data: { user }
    } = res;
    const clientId = context.clientId;
    if (user) {
      const client = App.clients.find(c => c.id === clientId);
      client.login(
        user.profile.displayName || user.profile.name || user.profile.rank.name,
        true
      );
      const flight = App.flights.find(f => f.id === client.flightId);
      if (flight) {
        flight.addSpaceEdventuresUser(client.id, user.id);
        flight.loginClient({
          id: client.id,
          token: tokenGenerator(),
          simulatorId: client.simulatorId,
          name: client.station
        });
      }
    }
    pubsub.publish("clientChanged", App.clients);
  }
  cb(doLogin());
});
