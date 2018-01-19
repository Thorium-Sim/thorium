export default `
#Macro: Long Range Message
sendLongRangeMessage(id: ID, simulatorId: ID, message: String!, crew: Boolean, sender: String, decoded: Boolean): String
longRangeMessageSend(id: ID, message: ID!): String
deleteLongRangeMessage(id: ID!, message: ID!): String
updateLongRangeDecodedMessage(id: ID!, messageId: ID!, decodedMessage: String, a: Int, f: Int): String
updateLongRangeComm(longRangeComm: LongRangeCommInput!): String
`;
