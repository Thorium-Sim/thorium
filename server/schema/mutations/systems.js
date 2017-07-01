export default `
addSystemToSimulator(simulatorId: ID!, className: String!, params: String!): String
removeSystemFromSimulator(systemId: ID!): String
damageSystem(systemId: ID!, report: String): String
damageReport(systemId: ID!, report: String!): String
repairSystem(systemId: ID!): String
requestDamageReport(systemId: ID!): String
systemReactivationCode(systemId: ID!, code: String!): String
systemReactivationCodeResponse(systemId: ID!, response: Boolean!): String
changePower(systemId: ID!, power: Int!): String
`;
