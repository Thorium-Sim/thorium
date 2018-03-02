import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const NavigationQueries = {
  navigation(rootValue, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "Navigation");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const NavigationMutations = {
  navCalculateCourse(rootValue, args, context) {
    App.handleEvent(args, "navCalculateCourse", context);
  },
  navCancelCalculation(rootValue, args, context) {
    App.handleEvent(args, "navCancelCalculation", context);
  },
  navCourseResponse(rootValue, args, context) {
    App.handleEvent(args, "navCourseResponse", context);
  },
  navCourseEntry(rootValue, args, context) {
    App.handleEvent(args, "navCourseEntry", context);
  },
  navToggleCalculate(rootValue, args, context) {
    App.handleEvent(args, "navToggleCalculate", context);
  },
  navSetDestinations(rootValue, args, context) {
    App.handleEvent(args, "navSetDestinations", context);
  },
  navSetDestination(rootValue, args, context) {
    App.handleEvent(args, "navSetDestination", context);
  },
  navSetScanning(rootValue, args, context) {
    App.handleEvent(args, "navSetScanning", context);
  },
  navSetPresets(rootValue, args, context) {
    App.handleEvent(args, "navSetPresets", context);
  },
  navSetThrusters(rootValue, args, context) {
    App.handleEvent(args, "navSetThrusters", context);
  }
};

export const NavigationSubscriptions = {
  navigationUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("navigationUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const NavigationTypes = {
  Navigation: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  }
};
