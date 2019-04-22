import App from "../app";
import heap from "../helpers/heap";

App.on("startFlight", ({ name, simulators }) => {
  heap.track("startFlight", App.thoriumId, {
    name,
    ...simulators.reduce((prev, next, index) => {
      const simulator = App.simulators.find(s => s.id === next.simulatorId);
      const stationSet = App.stationSets.find(s => s.id === next.stationSet);
      const mission = App.missions.find(s => s.id === next.missionId);
      prev[`simulator-${index}.name`] = simulator.name;
      prev[`simulator-${index}.stationSet`] = stationSet.name;
      if (mission) prev[`simulator-${index}.mission`] = mission.name;
      return prev;
    }, {})
  });
});
App.on("resetFlight", ({ flightId, simulatorId }) => {
  const flight = App.flights.find(
    f => f.id === flightId || f.simulators.indexOf(simulatorId) > -1
  );
  heap.track("resetFlight", App.thoriumId, {
    id: flight.id,
    name: flight.name
  });
});
App.on("deleteFlight", ({ flightId }) => {
  const flight = App.flights.find(f => f.id === flightId);
  if (flight) {
    heap.track("deleteFlight", App.thoriumId, {
      id: flight.id,
      name: flight.name
    });
  }
});
