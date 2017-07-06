export default `
createSet(name: String!):String
removeSet(id: ID!):String
setSimulatorId(id: ID!, simulatorId: ID!):String
addClientToSet(id: ID!, clientId: ID!):String
removeClientFromSet(id: ID!, clientId: ID!):String
`;