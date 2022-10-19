// To properly export a flight, we must loop through
// all of the items that are included in the flight

import App from "../../app";
import yazl from "yazl";
import {aspectList} from "../../typeDefs/flight";
import { Flight, Simulator } from "@server/classes";

let cache:string[] = [];
const safeStringify = (key, value) => {
  if (typeof value === "object" && value !== null) {
    // Duplicate reference found, discard key
    if (cache.includes(value)) return;

    // Store value in our collection
    cache.push(value);
  }
  return value;
};
export default function exportFlight(id, res) {
  const flight = App.flights.find(s => s.id === id);
  if (!flight) {
    return res.end("No flight");
  }
  const zipfile = new yazl.ZipFile();
  const data:{flight:Flight, simulators:Simulator[]} = {flight: flight, simulators: []};
  data.simulators = flight.simulators.map(simId => {
    const sim = App.simulators.find(s => s.id === simId);
    aspectList.forEach(aspect => {
      if (!data[aspect]) data[aspect] = [];
      data[aspect] = data[aspect].concat(
        App[aspect].filter(a => a.simulatorId === simId),
      );
    });

    return sim as Simulator;
  }).filter(Boolean);
  zipfile.addBuffer(
    Buffer.from(JSON.stringify(data, safeStringify)),
    "flight/flight.json",
    {
      mtime: new Date(),
      mode: parseInt("0100664", 8), // -rw-rw-r--
    },
  );
  cache = [];
  zipfile.end({}, function () {
    res.set({
      "Content-Disposition": `attachment; filename=${flight.name}.flight`,
      "Content-Type": "application/octet-stream",
    });
    zipfile.outputStream.pipe(res);
  });
}
