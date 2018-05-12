export default `
  clientChanged(client: ID, simulatorId: ID): [Client]
  clearCache(client: ID, flight: ID): Boolean
  soundSub(clientId: ID): Sound
  cancelSound(clientId: ID): ID
  cancelAllSounds(clientId: ID): Boolean
`;
