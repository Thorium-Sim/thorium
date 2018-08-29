export default `
type Message {
  id: ID
  simulatorId: ID
  destination: String
  sender: String
  timestamp: String
  content: String
}

input MessageInput {
  simulatorId: ID
  destination: String
  sender: String
  timestamp: String
  content: String
}
`;
