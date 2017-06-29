import App from '../../app.js';

export const TeamsQueries = {
  teams(root, {simulatorId, type}) {
    // Get the simulator
    let returnVal = App.teams.filter(t => t.type === type);
    if (simulatorId) {
      returnVal = returnVal.filter(t => t.simulatorId === simulatorId)
    }
    return returnVal;
  }
};

export const TeamsMutations = {
  createTeam(root, params) {
    App.handleEvent(params, 'createTeam');
  },
  updateTeam(root, params) {
    App.handleEvent(params, 'updateTeam');
  },
  addCrewToTeam(root, params) {
    App.handleEvent(params, 'addCrewToTeam');
  },
  removeCrewFromTeam(root, params) {
    App.handleEvent(params, 'removeCrewFromTeam');
  },
  removeTeam(root, params) {
    App.handleEvent(params, 'removeTeam');
  }
};

export const TeamsSubscriptions = {
  teamsUpdate(rootValue, {simulatorId, type}) {
    // Get the simulator
    let returnVal = rootValue.filter(t => t.type === type);
    if (simulatorId) {
      returnVal = returnVal.filter(t => t.simulatorId === simulatorId)
    }
    return returnVal;
  }
};
