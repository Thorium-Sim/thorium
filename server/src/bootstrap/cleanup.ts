import App from "../app";
import {aspectList} from "../typeDefs/flight";

export default async function cleanUp() {
  // Get all of the flights.
  const flightIds = App.flights.map(f => f.id);
  const flightSimulators = App.flights.reduce(
    (prev: string[], next) => prev.concat(next.simulators),
    [],
  );

  App.officerLogs = App.officerLogs.filter(
    l => flightIds.indexOf(l.flightId || "") > -1,
  );
  // Clear out our simulators
  const removeSimulators = App.simulators.filter(
    s => !s.template && flightSimulators.indexOf(s.id) === -1,
  );
  removeSimulators.forEach(s => {
    aspectList.forEach((aspect: string) => {
      App[aspect] = App[aspect].filter((a: any) => a.simulatorId !== s.id);
    });
    App.stationSets = App.stationSets.filter(a => a.simulatorId !== s.id);
  });

  const removeSimulatorsIds = removeSimulators.map(s => s.id);
  App.simulators = App.simulators.filter(
    s => removeSimulatorsIds.indexOf(s.id) === -1,
  );
  App.assetFolders = [];
  App.assetContainers = [];
  App.assetObjects = [];
};
