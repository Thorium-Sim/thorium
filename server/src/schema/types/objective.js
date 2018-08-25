export default `
type Objective{
  id: ID
  simulatorId: ID
  timestamp: String
  station: String
  title: String
  description: String
  completed: Boolean
}
input ObjectiveInput{
  id: ID
  simulatorId: ID
  station: String
  title: String
  description: String
  completed: Boolean
}
`;
