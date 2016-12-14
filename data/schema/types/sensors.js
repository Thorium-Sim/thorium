export default `
type Sensors {
  id: ID
  simulatorId: ID
  type: String
  scanResults: String
  scanRequest: String
  processedData: String
  contacts: [SensorContact]
}
type SensorContact {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  speed: Float
  location: Coordinates
  destination: Coordinates
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
input SensorContactInput {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  speed: Float
  location: Coordinates
  destination: Coordinates
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
`;
