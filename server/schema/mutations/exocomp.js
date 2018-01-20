export default `
setSimulatorExocomps(simulatorId: ID!, count: Int!):String
deployExocomp(exocomp: ExocompInput!):String
recallExocomp(exocomp: ID!): String
updateExocompDifficulty(exocomp: ID!, difficulty: Float!):String
`;
