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
}

input SimulatorAssetsInput {
  mesh:String
  texture:String
  side:String
  top:String
  logo:String
}

type Simulator {
  id: ID
  name: String
  alertlevel: String
  layout: String
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
  exocomps: Int
  training: Boolean
  panels:[ID]
  bridgeOfficerMessaging: Boolean
  assets: SimulatorAssets
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
  stations: [Station]
}

type Station {
  name: String
  login: Boolean
  executive: Boolean
  messageGroups: [String]
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
  trigger: String
  duration: Int
}
`;
