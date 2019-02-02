export default `
type SubspaceField implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
  locations: [Room]
  totalPower: Int
  fore: SubspaceFieldSector
  aft: SubspaceFieldSector
  port: SubspaceFieldSector
  starboard: SubspaceFieldSector
  ventral: SubspaceFieldSector
  dorsal: SubspaceFieldSector
}
type SubspaceFieldSector {
  required: Int
  value: Int
}
`;
