// To properly export a flight, we must loop through
// all of the items that are included in the flight

import App from "../../app";
import yazl from "yazl";
import { aspectList } from "../../events/flight";

export default function exportFlight(id, res) {
  const flight = App.flights.find(s => s.id === id);
  if (!flight) {
    return res.end("No flight");
  }
  const zipfile = new yazl.ZipFile();
  const data = { flight: flight, simulators: [] };
  data.simulators = flight.simulators.map(simId => {
    const sim = App.simulators.find(s => s.id === simId);
    aspectList.forEach(aspect => {
      if (!data[aspect]) data[aspect] = [];
      data[aspect] = data[aspect].concat(
        App[aspect].filter(a => a.simulatorId === simId)
      );
    });

    return sim;
  });
  zipfile.addBuffer(Buffer.from(JSON.stringify(data)), "flight/flight.json", {
    mtime: new Date(),
    mode: parseInt("0100664", 8) // -rw-rw-r--
  });
  zipfile.end({}, function() {
    res.set({
      "Content-Disposition": `attachment; filename=${flight.name}.flight`,
      "Content-Type": "application/octet-stream"
    });
    zipfile.outputStream.pipe(res);
  });
}
