export default `
type Sickbay implements SystemInterface {
  id: ID
  simulatorId: ID
  name: String
  displayName: String
  type: String
  damage: Damage
  power: Power
  stealthFactor: Float
  locations: [Room]
  sickbayRoster: [Crew]
  bunks: [SickbayBunk]
}

type SickbayBunk {
  id: ID
  scanRequest: String
  scanResults: String
  scanning: Boolean
  patient: Crew
}
`;
