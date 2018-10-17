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
  values: JSON
  instructions: String
}

type TaskTemplate {
  id: ID
  values: JSON
  definition: String
}

type TaskDefinition {
  id: ID
  name: String
  active: Boolean
  valuesInput: JSON
  valuesValue: JSON
}
`;
