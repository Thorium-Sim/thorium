export default `
#Macro: Add shield system to simulator
createShield(
simulatorId: ID!,

# {
#   "content":"Name",
#   "type":"text"
# }
name: String,

# {
#   "content":"Position",
#   "type":"select",
#   "enum":["0", "1", "2", "3", "4", "5", "6"]
# }
position: Int,
):String
shieldRaised(id: ID!): String
shieldLowered(id: ID!): String
shieldIntegritySet(id: ID!, integrity: Float): String
shieldFrequencySet(id: ID!, frequency: Float): String
`;
