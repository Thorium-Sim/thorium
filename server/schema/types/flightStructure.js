export default `

type Mission {
  id: ID
  name: String
  description: String
  timeline: [TimelineStep]
  simulators: [Simulator]
}

type Flight {
  id: ID
  name: String
  date: Float
  timelineStep: Int
  mission: Mission
  simulators: [Simulator]
}

input FlightSimulatorInput {
  missionSim: ID
  simulator: ID
  stationSet: ID
}

type Simulator {
  id: ID
  name: String
  alertlevel: String
  layout: String
  template: Boolean
  timelineStep: Int
  stations: [Station]
  timeline: [TimelineStep]
  decks: [Deck]
  rooms: [Room]
  ship: Ship
}

type TemplateSimulator {
  id: ID
  name: String
  timeline: [TimelineStep]
}

type Stationset {
  id: ID
  name: String
  stations: [Station]
}

type Station {
  name: String
  cards: [Card]
}

type Card {
  name: String
  component: String
  icon: String
}
`;
