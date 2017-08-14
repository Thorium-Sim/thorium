export default `
internalCommConnectOutgoing(id: ID!):String
internalCommConnectIncoming(id: ID!):String
internalCommCancelIncoming(id: ID!):String
internalCommCancelOutgoing(id: ID!):String
internalCommCallIncoming(id: ID!, incoming: String):String
internalCommCallOutgoing(id: ID!, outgoing: String):String
`;
