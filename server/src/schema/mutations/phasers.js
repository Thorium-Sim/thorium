export default `
  chargePhaserBeam(id: ID!, beamId: ID!):String
  dischargePhaserBeam(id: ID!, beamId: ID!):String
  firePhaserBeam(id: ID!, beamId: ID!):String
  stopPhaserBeams(id: ID!): String
  coolPhaserBeam(id: ID!, beamId: ID):String
  phaserArc(id: ID!, arc: Float!):String
  setPhaserBeamCharge(id: ID!, beamId: ID!, charge: Float!):String
  setPhaserBeamHeat(id: ID!, beamId: ID!, heat: Float!):String
  setPhaserBeamCount(id: ID!, beamCount: Int!): String
`;
