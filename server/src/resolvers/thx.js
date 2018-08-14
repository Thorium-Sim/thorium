import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ThxTypes = {
  Thx: {
    clients(thx) {
      // Return clients from the simulator that are crew stations (not keyboards or sound players)
      const simulator = App.simulators.find(s => s.id === thx.simulatorId);
      const stations = simulator.stations.map(s => s.name);
      return App.clients
        .filter(
          c =>
            c.simulatorId === thx.simulatorId &&
            stations.indexOf(c.station) > -1
        )
        .map(c => {
          const client = thx.clients.find(cli => cli.id === c.id) || {
            charge: 0,
            lock: false
          };
          const station = simulator.stations.find(s => s.name === c.station);
          return { ...station, ...client, ...c };
        });
    }
  }
};

export const ThxQueries = {
  thx(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.class === "Thx");
    if (simulatorId) {
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const ThxMutations = {
  chargeThx(root, args, context) {
    App.handleEvent(args, "chargeThx", context);
  },
  lockThx(root, args, context) {
    App.handleEvent(args, "lockThx", context);
  },
  activateThx(root, args, context) {
    App.handleEvent(args, "activateThx", context);
  },
  deactivateThx(root, args, context) {
    App.handleEvent(args, "deactivateThx", context);
  },
  resetThx(root, args, context) {
    App.handleEvent(args, "resetThx", context);
  }
};

export const ThxSubscriptions = {
  thxUpdate: {
    resolve(rootValue, { simulatorId }) {
      return rootValue.filter(s => s.simulatorId === simulatorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("thxUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId) {
          return !!rootValue.find(s => s.simulatorId === simulatorId);
        }
        return true;
      }
    )
  }
};
