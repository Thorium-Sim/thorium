import App from "../../../../app";
import { randomFromList } from "../constants";
export default (
  { inventory, room },
  { location, name, displayName = name, stations, simulatorId }
) => {
  // Find the station with the cargo control
  const station = stations.find(s =>
    s.cards.find(c => c.component === "CargoControl")
  );
  const stationName = station ? station.name : "Cargo Control";
  return `Supplies will be needed to repair the ${displayName} system. Ask the ${stationName} officer to send the following cargo:
    
Location: ${room || location}
Cargo: ${inventory ||
    (App.inventory.filter(
      i => i.simulatorId === simulatorId && i.metadata.type === "repair"
    ).length &&
      Array(Math.floor(Math.random() * 3 + 1))
        .fill(0)
        .map(
          () =>
            randomFromList(
              App.inventory.filter(
                i =>
                  i.simulatorId === simulatorId && i.metadata.type === "repair"
              )
            ).name
        )
        .filter((c, i, a) => a.indexOf(c) === i)
        .map(i => Math.floor(Math.random() * 4 + 1) + " " + i))}
    `;
};
