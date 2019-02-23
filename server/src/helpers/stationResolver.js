import App from "../app";

export const StationResolver = rootValue => {
  if (
    rootValue.station &&
    rootValue.station.match(/keyboard:.{8}-.{4}-.{4}-.{4}-.{12}/gi)
  ) {
    return {
      name: rootValue.station,
      cards: [
        {
          name: "Keyboard",
          component: "Keyboard"
        }
      ]
    };
  }
  if (rootValue.station === "Sound") {
    return {
      name: "Sound",
      cards: [
        {
          name: "SoundPlayer",
          component: "SoundPlayer"
        }
      ]
    };
  }
  const simulator = App.simulators.find(s => s.id === rootValue.simulatorId);
  if (simulator) {
    const station = simulator.stations.find(s => s.name === rootValue.station);
    if (station) return station;
    // Fallback for Viewscreen, Blackout, and Mobile
    if (rootValue.station) {
      return {
        name: rootValue.station,
        cards: [
          {
            name: rootValue.station,
            component: rootValue.station
          }
        ]
      };
    }
    return null;
  }
};
