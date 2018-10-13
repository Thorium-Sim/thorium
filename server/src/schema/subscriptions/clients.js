export default `
  clientChanged(client: ID, simulatorId: ID, flightId:ID): [Client]
  keypadsUpdate(simulatorId: ID!):[Keypad]
  keypadUpdate(client: ID!):Keypad
  scannersUpdate(simulatorId: ID!):[Scanner]
  scannerUpdate(client: ID!):Scanner
  clearCache(client: ID, flight: ID): Boolean
  soundSub(clientId: ID): Sound
  cancelSound(clientId: ID): ID
  cancelAllSounds(clientId: ID): Boolean
`;
