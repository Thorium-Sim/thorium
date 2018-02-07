export default `
shieldRaised(id: ID!): String
shieldLowered(id: ID!): String
shieldIntegritySet(id: ID!, integrity: Float): String
shieldFrequencySet(id: ID!, frequency: Float): String
#Macro: Shields: Hit all shields
hitShields(id: ID, simulatorId: ID): String
`;
