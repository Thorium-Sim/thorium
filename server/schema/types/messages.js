export default `
type Message {
  id: ID
  simulatorId: ID
  destination: String
  sender: String
  timestamp: String
  content: String
}

enum MESSAGE_GROUP {
  SecurityTeams
  DamageTeams
  MedicalTeams
}

input MessageInput {
  simulatorId: ID
  destination: String
  sender: String
  timestamp: String
  content: String
}
`;
