export default `
type Task {
  id: ID
  simulatorId: ID
  station: String
  systemId: ID
  deck: Deck
  room: Room
  definition: String
  verified: Boolean
  verifyRequested: Boolean
  dismissed: Boolean
  values: JSON
  instructions: String
  startTime: String
  endTime: String
  macros: [TimelineItem]
}

input TaskInput {
  simulatorId: ID
  definition: String
  values: JSON
  station: String
  macros: [TimelineitemInput]
}

type TaskTemplate {
  id: ID
  name: String
  values: JSON
  definition: String
  reportTypes: [String]
  macros: [TimelineItem]
}

type TaskDefinition {
  id: ID
  name: String
  class: String
  stations: [Station]
  active: Boolean
  valuesInput: JSON
  valuesValue: JSON
}
`;
