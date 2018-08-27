export default `
type Railgun implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  name: String
  displayName: String
  stealthFactor: Float
  heat: Float
  damage: Damage
  coolant: Float
  locations: [Room]

  availableAmmo: Int
  maxAmmo: Int
  ammo: Int
}
`;
