import yauzl from "yauzl";
import uuid from "uuid";
import App from "../../app";
import * as Classes from "../../classes";
import {pubsub} from "../../helpers/subscriptionManager";
import {addAspects} from "../../typeDefs/flight";

function streamToString(stream, cb) {
  const chunks = [];
  stream.on("data", chunk => {
    chunks.push(chunk.toString());
  });
  stream.on("end", () => {
    cb(chunks.join(""));
  });
}

export default function ImportFlight(filepath, cb) {
  console.info("Importing flight");
  yauzl.open(filepath, {lazyEntries: true}, function (err, importZip) {
    if (err) throw err;
    importZip.on("close", function () {
      pubsub.publish("flightsUpdate", App.flights);
      pubsub.publish("simulatorsUpdate", App.simulators);
      cb(null);
    });
    importZip.readEntry();

    importZip.on("entry", function (entry) {
      if (/flight\/flight.json/.test(entry.fileName)) {
        // Flight
        importZip.openReadStream(entry, function (error, readStream) {
          if (error) throw error;
          streamToString(readStream, str => {
            const data = JSON.parse(str);
            // Create a duplicate flight with a different ID
            let name = data.flight.name;
            if (App.flights.some(f => f.name === data.flight.name)) {
              name = `${data.flight.name} - Imported`;
            }
            const flight = new Classes.Flight({
              ...data.flight,
              id: uuid.v4(),
              name,
            });
            flight.simulators = flight.simulators.map(s => {
              const newId = uuid.v4();
              const oldSim = data.simulators.find(ss => ss.id === s);
              oldSim.simulatorId = s;
              const sim = new Classes.Simulator({
                ...oldSim,
                id: newId,
              });

              App.simulators.push(sim);
              addAspects(oldSim, sim, data, true);

              App.handleEvent(
                {simulatorId: sim.id, count: sim.exocomps},
                "setSimulatorExocomps",
              );
              return newId;
            });

            App.flights.push(flight);

            importZip.readEntry();
          });
        });
      }
    });
  });
}
