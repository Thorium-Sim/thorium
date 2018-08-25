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
  previousSpeed: Int
  velocity: Float
  speedFactor: Float
  acceleration: Float
  useAcceleration: Boolean  
  heat: Float
  damage: Damage
  on: Boolean
  coolant: Float
  locations: [Room]
}
type Speed {
  text: String
  number: Float
  velocity: Float
  optimal: Boolean
}
input SpeedInput {
  text: String
  number: Float
  velocity: Float
  optimal: Boolean
}
`;
