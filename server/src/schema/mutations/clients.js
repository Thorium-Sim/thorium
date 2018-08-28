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
  clientMovieState(client: ID!, movie: String!):String
  clientSetTraining(client: ID!, training: Boolean!):String
  clientAddCache(client: ID, simulatorId: ID, viewscreen: Boolean cacheItem: String!):String
  clientRemoveCache(client: ID!, cacheItem: String!):String
  setClientHypercard(clientId:ID, simulatorId: ID, component:String):String
  
  #Macro: Play a sound
  playSound(sound: SoundInput!, station: String, simulatorId: ID, clientId: String):String
  
  #Macro: Cancel All Sounds
  stopAllSounds(simulatorId:ID!):String
applyClientSet(id:ID!, flightId:ID!, simulatorId:ID!, templateId:ID!, stationSetId:ID!):String
setClientOverlay(id:ID!, overlay:Boolean!):String
`;
