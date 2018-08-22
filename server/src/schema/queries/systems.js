export default `
  systems(simulatorId: ID, type: String, power: Boolean, heat: Boolean, extra: Boolean, damageWhich: String): [System]
  system(id: ID!): System
  `;
