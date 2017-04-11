export default `
type Phaser {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  charge: Float
  # One of 'idle', 'charging', 'firing'
  state: String
  arc: Float
}
`;