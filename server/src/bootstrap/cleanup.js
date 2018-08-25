import App from "../app";
import { aspectList } from "../events/flight";
import fs from "fs";
import paths from "../helpers/paths";

export default () => {
  // Get all of the flights.
  const flightIds = App.flights.map(f => f.id);
  const flightSimulators = App.flights.reduce(
    (prev, next) => prev.concat(next.simulators),
    []
  );

  App.officerLogs = App.officerLogs.filter(
    l => flightIds.indexOf(l.flightId) > -1
  );
  // Clear out our simulators
  const removeSimulators = App.simulators.filter(
    s => !s.template && flightSimulators.indexOf(s.id) === -1
  );
  removeSimulators.forEach(s => {
    aspectList.forEach(aspect => {
      App[aspect] = App[aspect].filter(a => a.simulatorId !== s.id);
    });
    App.stationSets = App.stationSets.filter(a => a.simulatorId !== s.id);
  });

  const removeSimulatorsIds = removeSimulators.map(s => s.id);
  App.simulators = App.simulators.filter(
    s => removeSimulatorsIds.indexOf(s.id) === -1
  );
  App.assetFolders = [];
  App.assetContainers = [];
  App.assetObjects = [];

  // Clean up logs
  let logDir = "./logs";
  if (process.env.NODE_ENV === "production") {
    logDir = paths.userData + "/logs";
  }
  const deleteLogs = fs.readdirSync(logDir).filter(f => {
    const stat = fs.statSync(`${logDir}/${f}`);
    // One week old or no contents
    return (
      Date.now() - stat.birthtime > 1000 * 60 * 60 * 24 * 7 || stat.size === 0
    );
  });
  deleteLogs.forEach(f => {
    fs.unlinkSync(`${logDir}/${f}`);
  });
};
