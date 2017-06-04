export default `
  setCoolantTank(id: ID!, coolant: Float!):String
  transferCoolant(coolantId: ID!, systemId: ID!, subsystemId: ID, amount: Float!): String
`;
