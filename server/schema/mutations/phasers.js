export default `
  chargePhaserBeam(id: ID!, beamId: ID!):String
  dischargePhaserBeam(id: ID!, beamId: ID!):String
  firePhaserBeam(id: ID!, beamId: ID!):String
  phaserArc(id: ID!, arc: Float!):String
  setPhaserBeamCharge(id: ID!, beamId: ID!, charge: Float!):String
`;
