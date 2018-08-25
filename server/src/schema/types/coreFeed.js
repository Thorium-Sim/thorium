export default `
type CoreFeed {
  id: ID
  simulatorId: ID
  component: String
  ignored: Boolean
  timestamp: String
  title: String
  body: String
  color: String
}
type Timer {
  time: String
  active: Boolean
}
`;
