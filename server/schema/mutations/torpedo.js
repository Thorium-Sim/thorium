export default `
torpedoAddWarhead(id: ID!, warhead: WarheadInput!): String
torpedoRemoveWarhead(id: ID!, warheadId: ID!): String
torpedoLoadWarhead(id: ID!, warheadId: ID!): String
torpedoUnload(id: ID!): String
torpedoFire(id: ID!): String
`;
