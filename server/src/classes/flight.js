import uuid from "uuid";
import randomWords from "random-words";
import App from "../app";
import graphqlClient from "../helpers/graphqlClient";

export default class Flight {
  constructor(params = {}) {
    this.class = "Flight";
    this.id = params.id || uuid.v4();
    this.name = params.name || randomWords(3).join("-");
    this.date = params.date || Date.now();
    this.running = params.running || false;
    this.simulators = params.simulators || [];

    // Space EdVentures Flight Type
    this.flightType = params.flightType || null;
    // {clientId, badgeId}
    this.badges = params.badges || [];
    // {clientId, userId}
    this.spaceEdventuresUsers = params.spaceEdventuresUsers || [];
    // These are IDs of clients that have logged in during this flight.
    // {id, simulatorId, name (which is the station name)}
    this.clients = params.clients || [];
  }
  addSimulator(simulator) {
    this.simulators.push(simulator.id);
  }
  removeSimulator(simulatorId) {
    this.simulators = this.simulators.filter(s => s !== simulatorId);
  }
  stopFlight() {
    this.running = false;
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
  }
  loginClient(clientId) {
    this.clients = this.clients
      .concat(clientId)
      .filter((a, i, arr) => arr.findIndex(c => c.id === a.id) === i);
  }
  addBadges(badges) {
    this.badges = this.badges.concat(badges);
  }
  addSpaceEdventuresUser(clientId, userId) {
    this.spaceEdventuresUsers = this.spaceEdventuresUsers.concat({
      clientId,
      userId
    });
  }
  submitSpaceEdventure() {
    // When submitting to SpaceEdventures.org, each logged-in client should be
    // considered to be assignable to a participant. The participant that claims
    // that client would get all of badges that client earned. There's no risk of
    // double-awards because SpaceEdventures will check to make sure a single user
    // is attached to a single flight record.

    // Don't submit if there isn't a flight type.
    if (!this.flightType) return;

    // Concatenate the clients so there are no duplicate space edventures users.
    // Only use clients that have logged in during this flight.
    const clients = Object.values(
      this.clients
        .map(c => ({
          ...c,
          badges: this.badges
            .filter(b => b.clientId === c.id)
            .map(b => b.badgeId),
          userId: this.spaceEdventuresUsers
            .filter(u => u.clientId === c.id)
            .map(u => u.userId)[0]
        }))
        .reduce((prev, next) => {
          if (!next.userId) {
            prev[next.id] = next;
            return prev;
          }
          // Combine add all the badges for clients logged in as the same Space Edventures User,
          // removing duplicates
          if (prev[next.userId]) {
            prev[next.userId].badges = prev[next.userId].badges
              .concat(next.badges)
              .filter((a, i, arr) => arr.indexOf(a) === i);
          } else {
            prev[next.userId] = next;
          }
          return prev;
        }, {})
    );
    // Filter simulators that don't have a space edventures ID
    const simulators = this.simulators
      .map(s => App.simulators.find(ss => ss.id === s))
      .filter(s => s.spaceEdventuresId)
      .map(s => ({
        id: s.spaceEdventuresId,
        stations: clients
          .filter(c => c.simulatorId === s.id)
          .map(c => ({ name: c.name, badges: c.badges, userId: c.userId }))
      }));
    const variables = {
      flightId: this.id,
      flightType: this.flightType,
      simulators
    };

    // Send the flight record to Space EdVentures
    const mutation = `mutation FlightRecordCreate(
      $flightId: ID!, 
      $flightType: ID!, 
      $simulators:[FlightSimulatorInput!]!
    ){
        flightRecordCreate(
          thoriumFlightId:$flightId, 
          flightTypeId:$flightType, 
          simulators:$simulators) 
        {
          id
        }
      }`;
    console.log(variables);
    graphqlClient
      .query({
        query: mutation,
        variables
      })
      .catch(err => {
        console.error(err);
      });
    // Remove the flight type so it is not transmitted again.
    this.flightType = null;
  }
}
