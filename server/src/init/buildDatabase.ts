import {setBasePath} from "@thorium/db-fs";
import {databaseName, thoriumPath} from "@server/newHelpers/appPaths";
import {promises as fs, existsSync} from "fs";

import randomWords from "@thorium/random-words";

import {ServerDataModel} from "@server/newClasses/ServerDataModel";
import {FlightDataModel} from "@server/newClasses/FlightDataModel";

setBasePath(thoriumPath);

export async function buildDatabase() {
  // Initialize the database if it doesn't exist
  if (!existsSync(thoriumPath)) {
    await fs.mkdir(thoriumPath, {recursive: true});
  }

  // Create the primary database
  // This is for any user data that is persisted between flights
  // but that isn't part of a plugin. Not much goes in here.
  const serverModel = new ServerDataModel(
    {thoriumId: randomWords(3).join("-"), activeFlightName: null},
    {path: databaseName},
  );

  // If a flight is in progress, load it.
  // This helps in situations where the server is shut
  // down or crashes unexpectedly.
  let flight: FlightDataModel | null = null;
  if (serverModel.activeFlightName) {
    const flightName = serverModel.activeFlightName;
    flight = new FlightDataModel(
      {
        name: flightName,
        initialLoad: false,
        serverDataModel: serverModel,
      },
      {path: `/flights/${flightName}.flight`},
    );
    flight.init();
  }

  const database = {server: serverModel, flight};

  return database;
}
