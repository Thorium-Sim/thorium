export default `
#Macro: Add shield system to simulator TODO: ADD ARGS
createShield(simulatorId: ID!):String
shieldRaised(id: ID!): String
shieldLowered(id: ID!): String
shieldIntegritySet(id: ID!, integrity: Float): String
shieldFrequencySet(id: ID!, frequency: Float): String
`;
