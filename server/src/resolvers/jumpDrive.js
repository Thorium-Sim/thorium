import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const JumpDriveQueries = {
  jumpDrive(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "JumpDrive");
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const JumpDriveMutations = {
  //Comment,
  setJumpdriveActivated(root, args, context) {
    App.handleEvent(args, "setJumpdriveActivated", context);
  },
  setJumpdriveEnvs(root, args, context) {
    App.handleEvent(args, "setJumpdriveEnvs", context);
  },
  setJumpdriveSectorLevel(root, args, context) {
    App.handleEvent(args, "setJumpdriveSectorLevel", context);
  },
  setJumpdriveSectorOffset(root, args, context) {
    App.handleEvent(args, "setJumpdriveSectorOffset", context);
  },
  fluxJumpdriveSector(root, args, context) {
    App.handleEvent(args, "fluxJumpdriveSector", context);
  },
  setJumpDriveEnabled(root, args, context) {
    App.handleEvent(args, "setJumpDriveEnabled", context);
  }
};

export const JumpDriveSubscriptions = {
  jumpDriveUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("jumpDriveUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId) {
          return (
            rootValue.filter(s => s.simulatorId === simulatorId).length > 0
          );
        }
        return rootValue.length;
      }
    )
  }
};
