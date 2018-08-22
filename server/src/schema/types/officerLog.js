export default `
type Log {
  id: ID
  clientId: ID
  flightId: ID
  simulatorId: ID
  timestamp: String
  log: String
}

input LogInput {
  clientId: ID
  flightId: ID
  simulatorId: ID
  timestamp: String
  log: String
}
`;
