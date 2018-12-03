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

  defaultHitpoints: Int
  defaultSpeed: Float
  missPercent: Float
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
  locked: Boolean
  disabled: Boolean
  hostile: Boolean
  hitpoints: Int
  autoFire: Boolean
  particle: ParticleTypes
}
enum ParticleTypes {
  Dilithium
  Tachyon
  Neutrino
  AntiMatter
  Anomaly

  #Also use this for Science Probe bursts
  Resonance
  Graviton
  Lithium
  Magnetic
  Helium
  Hydrogen
  Oxygen
  Carbon
  Radiation
}
type SensorsSegment {
  ring: Int
  line: Int
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
  locked: Boolean
  disabled: Boolean
  hostile: Boolean
  hitpoints: Int
  autoFire: Boolean
  particle: ParticleTypes
}

enum PING_MODES {
  active
  passive
  manual
}
`;
