export default `
  clientChanged(client: ID, simulatorId: ID): [Client]
  clearCache(client: ID, flight: ID): Boolean
  soundSub(clientId: ID): Sound
`;
