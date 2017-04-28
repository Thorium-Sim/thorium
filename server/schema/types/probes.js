export default `
type Probes {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  probes: [Probe]
}

type Probe {
  id: ID
  launched: Boolean
  type: String
  size: Float
  destination: String
  equipment: [ProbeEquipment]
  engine: Engine
  phaser: Phaser
}

type ProbeEquipment {
  id: ID
  name: String
  size: Float
  damage: Damage
}
`;