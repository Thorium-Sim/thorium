export default `
type Engine implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  name: String
  displayName: String
  stealthFactor: Float
  speeds: [Speed]
  speed: Int
  velocity: Float  
  heat: Float
  damage: Damage
  on: Boolean
  coolant: Float
}
type Speed {
  text: String
  number: Float
}
input SpeedInput {
  text: String
  number: Float
}
`;
