import {FlightClient} from "./FlightClient";
import type {ServerDataModel} from "./ServerDataModel";
import type {FlightDataModel} from "./FlightDataModel";

/**
 * An instance of this class is available in every input and subscription handler
 * You can use getters to provide convenient computed data
 */

export class DataContext {
  constructor(
    public id: string,
    public database: {server: ServerDataModel; flight: FlightDataModel | null},
  ) {}
  get server() {
    return this.database.server;
  }
  get flight() {
    return this.database.flight;
  }
  set flight(flight: FlightDataModel | null) {
    this.database.flight = flight;
  }
  get client() {
    return this.database.server.clients[this.id];
  }
  get flightClient() {
    return this.findFlightClient(this.id);
  }
  findFlightClient(clientId: string) {
    if (!this.flight) return null;
    if (!this.flight.clients[clientId]) {
      this.flight.clients[clientId] = new FlightClient({
        id: clientId,
        flightId: this.flight.name,
      });
    }
    return this.flight.clients[clientId];
  }
  get ship() {
    // TODO: Implement
    return null;
  }
}
