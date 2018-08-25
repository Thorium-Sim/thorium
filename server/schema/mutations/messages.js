export default `
toggleStationMessageGroup(stationSetId: ID!, station: String! group: MESSAGE_GROUP!, state: Boolean!): String
#Macro: Send an inter-ship message
sendMessage(message: MessageInput!):String

`;
