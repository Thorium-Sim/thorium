import App from "../app";
import heap from "../helpers/heap";

function parseParams(params) {
  // Stringifys each of the params to make them easier to read.
  return Object.entries(params).reduce(
    (prev, [key, value]) =>
      value ? { ...prev, [key]: JSON.stringify(value) } : prev,
    {}
  );
}

App.on(
  "triggerAction",
  ({ action, message, voice, simulatorId, stationId, clientId, duration }) => {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    const data = {
      action,
      message,
      voice,
      stationId,
      simulator: simulator.name,
      clientId,
      duration
    };
    heap.track("triggerAction", App.thoriumId, parseParams(data));
  }
);
