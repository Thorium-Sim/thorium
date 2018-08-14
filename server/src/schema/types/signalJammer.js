export default `
type SignalJammer implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
  active: Boolean
  level: Float
  strength: Float
  signals: [Signal]
  locations: [Room]
}

type Signal {
  id: ID
  type: String
  level: Float
  power: Float
}
input SignalJammerInput {
  id: ID
  active: Boolean
  level: Float
  strength: Float
}
`;
