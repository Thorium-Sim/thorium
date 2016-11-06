export default `
type Query {
  simulators(template: Boolean, id: String): [simulator]
  stations(name: String): [stationset]
  missions: [mission]
  flights: [flight]
  sessions: [session]
  users(id: String, token: String, email: String): [user]
  clients: [client]
  shields(simulatorID: ID): [shields]
}`;
