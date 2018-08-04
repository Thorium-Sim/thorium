export default `
  systems(simulatorId: ID, type: String, power: Boolean, heat: Boolean, extra: Boolean): [System]
  system(id: ID!): System
  `;
