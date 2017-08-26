export default `
subscription MessageUpdates(simulatorId: ID!, station: String): [Message]
subscription SendMessage(simulatorId: ID!, station: String): Message
`;
