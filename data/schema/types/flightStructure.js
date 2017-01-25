export default `

type Mission {
  id: ID
  name: String
  description: String
  simulators: [Simulator]
}

type Flight {
  id: ID
  name: String
  date: Float
  simulators: [Simulator]
}

type Simulator {
  id: ID
  name: String
  alertlevel: String
  layout: String
  template: Boolean
  timeline: [Timelinestep]
  stations: [Station]
}

type Timelinestep {
  id: ID!
  name: String
  description: String
  order: Int
  timelineitems: [Timelineitem]
}

type Timelineitem {
  name: String
  type: String
  command: String
  args: String
  delay: Int
}

input TimelineitemInput {
  name: String
  type: String
  command: String
  args: String
  delay: Int
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
