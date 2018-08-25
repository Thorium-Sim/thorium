export default `
type Phaser implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  stealthFactor: Float
  power: Power
  damage: Damage
  arc: Float
  coolant: Float
  beams: [PhaserBeam]
  locations: [Room]
}

type PhaserBeam {
  id: ID
  power: Power
  damage: Damage
  charge: Float
  # One of 'idle', 'discharging', charging', 'firing'
  state: String
  heat: Float
}
`;
