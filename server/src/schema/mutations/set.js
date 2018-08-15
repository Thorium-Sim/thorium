export default `
createSet(name: String!):String
removeSet(id: ID!):String
addClientToSet(id: ID!, client: SetClientInput!):String
removeClientFromSet(id: ID!, clientId: ID!):String
updateSetClient(id: ID!, client: SetClientInput!): String
`;
