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
  dismissed: Boolean
  values: JSON
  instructions: String
}

input TaskInput {
  simulatorId: ID
  definition: String
  values: JSON
  station: String
}

type TaskTemplate {
  id: ID
  values: JSON
  definition: String
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
