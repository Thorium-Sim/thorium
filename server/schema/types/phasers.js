export default `
type Phaser {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  arc: Float
  beams: [PhaserBeam]
}

type PhaserBeam {
  id: ID
  power: Power
  damage: Damage
  charge: Float
  # One of 'idle', 'discharging', charging', 'firing'
  state: String
}
`;