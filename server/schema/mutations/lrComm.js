export default `
# Macro: Add a long range communication system
createLongRange(simulatorId: ID!): String
removeLongRange(id: ID!): String
# Macro: Send a long range message TODO: Add Args
sendLongRangeMessage(id: ID, simulatorId: ID, message: String!, crew: Boolean, sender: String, decoded: Boolean): String
updateLongRangeDecodedMessage(id: ID!, messageId: ID!, decodedMessage: String, a: Int, f: Int): String
`;