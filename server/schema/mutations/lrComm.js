export default `
createLongRange(simulatorId: ID!): String
removeLongRange(id: ID!): String
sendLongRangeMessage(id: ID!, message: String!, crew: Boolean, sender: String, decoded: Boolean): String
updateLongRangeDecodedMessage(id: ID!, messageId: ID!, decodedMessage: String!, a: Int!, f: Int!): String
`;