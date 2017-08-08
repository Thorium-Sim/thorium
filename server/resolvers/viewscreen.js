import App from "../../app.js";

export const ViewscreenQueries = {
  viewscreens(rootValue, { simulatorId }) {
    let viewscreens = App.clients.filter(s => s.stationName === "Viewscreen");
    if (simulatorId) {
      viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
    }
    return viewscreens.map(v =>
      App.viewscreens.find(av => av.id === v.clientId)
    );
  }
};

export const ViewscreenMutations = {};

export const ViewscreenSubscriptions = {
  viewscreens(rootValue, { simulatorId }) {
    let viewscreens = App.clients.filter(s => s.stationName === "Viewscreen");
    if (simulatorId) {
      viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
    }
    return viewscreens.map(v => rootValue.find(av => av.id === v.clientId));
  }
};
