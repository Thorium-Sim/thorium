export default `
type ThxClient {
  id: ID
  charge: Float
  lock: Boolean
  station: Station
  executive: Boolean
}

type Thx{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
  locations: [Room]

  activated: Boolean
  clients: [ThxClient]
}
`;
