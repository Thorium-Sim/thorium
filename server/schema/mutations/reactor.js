export default `
reactorEject(id: ID!, tf: Boolean!): String
reactorChangeOutput(id: ID!, output: Int!): String
reactorChangeEfficiency(id: ID!, efficiency: Float!): String
reactorBatteryChargeLevel(id: ID!, level: Float!): String
reactorBatteryChargeRate(id: ID!, rate: Float!): String
`;
