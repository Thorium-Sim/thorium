export default `
type TaskReport{
  id: ID
  simulatorId: ID
  system: System
  type: String
  stepCount: Int
  name: String
  tasks: [Task]
}
`;
