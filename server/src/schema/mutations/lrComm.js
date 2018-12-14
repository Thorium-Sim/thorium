export default `
#Macro: Long Range: Send Long Range Message
sendLongRangeMessage(id: ID, simulatorId: ID, message: String!, crew: Boolean, sender: String, decoded: Boolean): String
longRangeMessageSend(id: ID, message: ID!): String
deleteLongRangeMessage(id: ID!, message: ID!): String
updateLongRangeDecodedMessage(id: ID!, messageId: ID!, decodedMessage: String, a: Int, f: Int): String
updateLongRangeComm(longRangeComm: LongRangeCommInput!): String
approveLongRangeMessage(id: ID!, message: ID!): String
encryptLongRangeMessage(id: ID!, message: ID!): String
setLongRangeSatellites(id:ID!, num:Int!):String

#Macro: Interception: Add Interception Signal
addInterceptionSignal(id:ID!):String

#Macro: Interception: Remove Interception Signal
removeInterceptionSignal(id:ID!):String

#Macro: Long Range: Set preset messages
setLongRangePresetMessages(id:ID, simulatorId:ID, messages:[PresetAnswerInput]):String
`;
