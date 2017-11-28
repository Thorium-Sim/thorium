import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CrewQueries = {
  crew(root, { id, simulatorId, position }) {
    let returnVal = App.crew.concat();
    if (simulatorId) {
      returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
    }
    if (position) {
      // Special considerations for the security and damage
      if (position === "security") {
        const regex = /security/gi;
        returnVal = returnVal.filter(c => regex.test(c.position));
      } else if (position === "damage") {
        const damagePositions = [
          "Computer Specialist",
          "Custodian",
          "Quality Assurance",
          "Electrician",
          "Explosive Expert",
          "Fire Control",
          "General Engineer",
          "Hazardous Waste Expert",
          "Maintenance Officer",
          "Mechanic",
          "Plumber",
          "Structural Engineer",
          "Welder"
        ];
        returnVal = returnVal.filter(
          c => damagePositions.indexOf(c.position) > -1
        );
      }
    }
    return returnVal;
  }
};

export const CrewMutations = {
  addCrewmember(rootValue, params, context) {
    App.handleEvent(params, "addCrewmember", context);
  },
  removeCrewmember(rootValue, params, context) {
    App.handleEvent(params, "removeCrewmember", context);
  },
  updateCrewmember(rootValue, params, context) {
    App.handleEvent(params, "updateCrewmember", context);
  }
};

export const CrewSubscriptions = {
  crewUpdate: {
    resolve(rootValue, { simulatorId, position }) {
      let returnVal = rootValue;
      if (simulatorId) {
        returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
      }
      if (position) {
        // Special considerations for the security and damage
        if (position === "security") {
          const regex = /security/gi;
          returnVal = returnVal.filter(c => regex.test(c.position));
        } else if (position === "damage") {
          const damagePositions = [
            "Computer Specialist",
            "Custodian",
            "Quality Assurance",
            "Electrician",
            "Explosive Expert",
            "Fire Control",
            "General Engineer",
            "Hazardous Waste Expert",
            "Maintenance Officer",
            "Mechanic",
            "Plumber",
            "Structural Engineer",
            "Welder"
          ];
          returnVal = returnVal.filter(
            c => damagePositions.indexOf(c.position) > -1
          );
        }
      }
      return returnVal;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("crewUpdate"),
      rootValue => (rootValue.length > 0 ? true : false)
    )
  }
};

export const CrewTypes = {
  Crew: {
    name(crew) {
      return crew.firstName + " " + crew.lastName;
    }
  }
};
