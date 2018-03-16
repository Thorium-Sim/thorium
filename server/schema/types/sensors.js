export default `
type Sensors implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  stealthFactor: Float
  domain: String
  pings: Boolean
  timeSincePing: Int
  pingMode: PING_MODES
  scanResults: String
  scanRequest: String
  processedData: String
  presetAnswers: [PresetAnswer]
  scanning: Boolean
  power: Power
  contacts: [SensorContact]
  armyContacts: [SensorContact]
  damage: Damage

  scans: [SensorScan]
  history: Boolean
  autoTarget: Boolean
  frozen: Boolean
  autoThrusters: Boolean
  interference: Float
  movement: Coordinates
  segments: [SensorsSegment]
  locations: [Room]
}
type SensorScan {
  id: ID
  timestamp: String
  mode: String
  location: String
  request: String
  response: String
  scanning: Boolean
  cancelled: Boolean
}
input SensorScanInput {
  id: ID
  timestamp: String
  mode: String
  location: String
  request: String
  response: String
  scanning: Boolean
  cancelled: Boolean
}
type SensorContact {
  id: ID
  name: String
  type: String
  size: Float
  icon: String
  picture: String
  color: String
  rotation: Float
  speed: Float
  location: Coordinates
  destination: Coordinates
  position: Coordinates
  startTime: Float
  endTime: Float
  movementTime: Int
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
  forceUpdate: Boolean
  targeted: Boolean
}
type SensorsSegment {
  segment: String
  state: Boolean
}
type PresetAnswer {
  label: String
  value: String
}
input PresetAnswerInput {
  label: String
  value: String
}
input CoordinatesInput {
  x: Float
  y: Float
  z: Float
}
input SensorContactInput {
  id: ID
  name: String
  type: String
  size: Float
  icon: String
  picture: String
  color: String
  speed: Float
  rotation: Float
  location: CoordinatesInput
  destination: CoordinatesInput
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
enum PING_MODES {
  active
  passive
  manual
}
`;
