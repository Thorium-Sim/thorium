export default `
type JumpDrive implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  power: Power
  name: String
  displayName: String
  stealthFactor: Float
  damage: Damage
  locations: [Room]

  sectors: JumpDriveSectors
  env: Float
  activated: Boolean
  stress: Float
}

type JumpDriveSectors {
  fore: JumpDriveSector
  aft: JumpDriveSector
  starboard: JumpDriveSector
  port: JumpDriveSector
}
type JumpDriveSector {
  level: Int
  offset: Float
}
`;
