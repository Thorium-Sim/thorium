export default `
  clientConnect(client: ID!):String
  clientDisconnect(client: ID!):String
  clientPing(client: ID!, ping: String!):String
  clientSetFlight(client: ID!, flightId: ID!):String
  clientSetSimulator(client: ID!, simulatorId: ID!):String
  clientSetStation(client: ID!, stationName: ID!):String
  clientLogin(client: ID!, loginName: String):String
  clientLogout(client: ID!):String
  clientDiagnostic(client: ID!):String
  clientReset(client: ID!):String
  clientLockScreen(client: ID!):String
  clientUnlockScreen(client: ID!):String
  clientOfflineState(client: ID!, state: String): String
`;
