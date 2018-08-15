export default `
  setCoolantTank(id: ID!, coolant: Float!):String
  transferCoolant(coolantId: ID!, systemId: ID, 
  # One of:
  #
  # "stop" - stop the coolant transfer
  #
  # "tank" - transfer to the tank
  #
  # "system" - default. transfer to the system
  which: String): String
`;
