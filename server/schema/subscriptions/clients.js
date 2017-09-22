export default `
  clientConnect: Client
  clientDisconnect: Client
  clientChanged(client: ID, simulatorId: ID): [Client]
  clientPing(client: ID!): String
`;
