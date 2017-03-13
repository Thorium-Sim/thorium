export default `
type Sensors {
  id: ID
  simulatorId: ID
  type: String
  domain: String
  scanResults: String
  scanRequest: String
  processedData: String
  scanning: Boolean
  power: Power
  contacts: [SensorContact]
  armyContacts: [SensorContact]
  damage: Damage
}
type SensorContact {
  id: ID
  name: String
  size: Float
  icon: String
  iconUrl: String
  picture: String
  pictureUrl: String
  speed: Float
  velocity: Coordinates
  location: Coordinates
  destination: Coordinates
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
input CoordinatesInput {
  x: Float
  y: Float
  z: Float
}
input SensorContactInput {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  speed: Float
  location: CoordinatesInput
  destination: CoordinatesInput
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
`;
