export default `
  clients(clientId: ID, simulatorId: ID, stationName: String, flightId:ID): [Client]
  keypad(client: ID!):Keypad
  keypads(simulatorId: ID!): [Keypad]
`;
