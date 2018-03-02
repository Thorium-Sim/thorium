import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const PhaserQueries = {
  phasers(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "Phasers");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const PhaserMutations = {
  chargePhaserBeam(root, args, context) {
    App.handleEvent(args, "chargePhaserBeam", context);
  },
  dischargePhaserBeam(root, args, context) {
    App.handleEvent(args, "dischargePhaserBeam", context);
  },
  firePhaserBeam(root, args, context) {
    App.handleEvent(args, "firePhaserBeam", context);
  },
  stopPhaserBeams(root, args, context) {
    App.handleEvent(args, "stopPhaserBeams", context);
  },
  phaserArc(root, args, context) {
    App.handleEvent(args, "phaserArc", context);
  },
  setPhaserBeamCharge(root, args, context) {
    App.handleEvent(args, "setPhaserBeamCharge", context);
  },
  setPhaserBeamHeat(root, args, context) {
    App.handleEvent(args, "setPhaserBeamHeat", context);
  },
  coolPhaserBeam(root, args, context) {
    App.handleEvent(args, "coolPhaserBeam", context);
  },
  setPhaserBeamCount(root, args, context) {
    App.handleEvent(args, "setPhaserBeamCount", context);
  }
};

export const PhaserSubscriptions = {
  phasersUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("phasersUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const PhaserTypes = {
  Phaser: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  }
};
