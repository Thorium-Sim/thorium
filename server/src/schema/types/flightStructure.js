export default `

type Mission {
  id: ID
  name: String
  description: String
  timeline: [TimelineStep]
}

input MacroInput {
  stepId: ID,
  event: String,
  args: String,
  delay: Int
}

type Flight {
  id: ID
  name: String
  date: String
  running: Boolean
  timelineStep: Int
  simulators: [Simulator]
}

input SimulatorInput {
  simulatorId: ID!,
  stationSet: ID!,
  missionId: ID
}

type SimulatorAssets {
  mesh:String
  texture:String
  side:String
  top:String
  logo:String
  bridge: String
}

input SimulatorAssetsInput {
  mesh:String
  texture:String
  side:String
  top:String
  logo:String
  bridge: String
}

type Simulator {
  id: ID
  name: String
  alertlevel: String
  alertLevelLock: Boolean
  layout: String
  caps: Boolean
  template: Boolean
  templateId: ID
  systems: [System]
  systemsFull: [SystemUnion]
  stations: [Station]
  mission: Mission
  currentTimelineStep: Int
  executedTimelineSteps: [ID]
  stationSets: [Stationset]
  stationSet: Stationset
  decks: [Deck]
  rooms: [Room]
  ship: Ship
  stepDamage: Boolean
  verifyStep: Boolean
  requiredDamageSteps: [DamageStep]
  optionalDamageSteps: [DamageStep]
  damageTasks: [DamageTask]
  exocomps: Int
  training: Boolean
  panels:[ID]
  commandLines:[ID]
  triggers:[ID]
  triggersPaused: Boolean
  bridgeOfficerMessaging: Boolean
  assets: SimulatorAssets
  lighting:Lighting
  ambiance:[Ambiance]
  hasPrinter:Boolean
}

type Lighting {
  intensity: Float
  action: LIGHTING_ACTION
  actionStrength: Float
  transitionDuration: Int
  useAlertColor: Boolean
  color: String
}

input LightingInput {
  intensity: Float
  action: LIGHTING_ACTION
  actionStrength: Float
  transitionDuration: Int
  useAlertColor: Boolean
  color: String
}

enum LIGHTING_ACTION {
  normal
  fade
  shake
  strobe
  oscillate
}

type Ambiance {
  id:ID
  name: String
  asset:String
  volume:Float
  channel:[Int]
  playbackRate:Float
}
input AmbianceInput {
  id:ID
  name: String
  asset:String
  volume:Float
  channel:[Int]
  playbackRate:Float
}

type TemplateSimulator {
  id: ID
  name: String
  timeline: [TimelineStep]
}

type Stationset {
  id: ID
  name: String
  simulator: Simulator
  crewCount: Int
  stations: [Station]
}

type Station {
  name: String
  description: String
  training: String
  ambiance: String
  login: Boolean
  executive: Boolean
  messageGroups: [String]
  layout: String
  widgets: [String]
  cards: [Card]
}

type Card {
  name: String
  component: String
}

type Notification {
  id: ID
  title: String
  body: String
  color: String
  type: String
  trigger: String
  duration: Int
}
`;
