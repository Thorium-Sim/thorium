export default `
type Transwarp{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
  locations: [Room]
  heat: Float
  heatRate: Float
  coolant: Float
  active: Boolean
  quad1: TranswarpQuad
  quad2: TranswarpQuad
  quad3: TranswarpQuad
  quad4: TranswarpQuad
}
type TranswarpQuad {
  field: SubspaceFieldSector
  core: SubspaceFieldSector
  warp: SubspaceFieldSector
}
`;
