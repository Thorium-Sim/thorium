import App from '../../app.js';

export const CrewQueries = {
  crew(root, {id, simulatorId, position}) {
    let returnVal = App.crew.concat();
    if (simulatorId) {
      returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
    }
    if (position) {
      // Special considerations for the security and damage
      if (position === 'security') {
        const regex = /security/gi;
        returnVal = returnVal.filter(c => regex.test(c.position));
      } else if (position === 'damage') {
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
        returnVal = returnVal.filter(c => damagePositions.indexOf(c.position) > -1);
      }
    }
    return returnVal;
  }
};

export const CrewMutations = {
  addCrewmember(rootValue, params, context) {
    App.handleEvent(params, 'addCrewmember', context.clientId);
  },
  removeCrewmember(rootValue, params, context) {
    App.handleEvent(params, 'removeCrewmember', context.clientId);
  },
  updateCrewmember(rootValue, params, context) {
    App.handleEvent(params, 'updateCrewmember', context.clientId);
  }
};

export const CrewSubscriptions = {
  crewUpdate(rootValue, {simulatorId, position}) {
    let returnVal = rootValue;
    if (simulatorId) {
      returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
    }
    if (position) {
      // Special considerations for the security and damage
      if (position === 'security') {

      } else if (position === 'damage') {
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
        returnVal = returnVal.filter(c => damagePositions.indexOf(c.position) > -1);
      }
    }
    return returnVal;
  }
};
