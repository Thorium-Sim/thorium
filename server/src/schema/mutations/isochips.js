export default `
  insertIsochip(id: ID, simulatorId: ID, slot: Int, chip: Int): Isochip
  updateIsochip(id: ID, simulatorId: ID, slot: Int, isochip: IsochipInput): Isochip
  batchIsochipUpdate(simulatorId: ID, chips:[IsochipInput]):[Isochip]
`;
