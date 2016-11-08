export default `
type Engine {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  destination: Location
  calculated: Location
  power: Power
  damage: Float
}
type Location {
  name: String
  xCoord: Float
  yCoord: Float
  zCoord: Float
}
`;
