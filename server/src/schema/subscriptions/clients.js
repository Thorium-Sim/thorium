export default `
  clientChanged(client: ID, simulatorId: ID, flightId:ID): [Client]
  keypadsUpdate(simulatorId: ID!):[Keypad]
  keypadUpdate(client: ID!):Keypad
  clearCache(client: ID, flight: ID): Boolean
  soundSub(clientId: ID): Sound
  cancelSound(clientId: ID): ID
  cancelAllSounds(clientId: ID): Boolean
`;
