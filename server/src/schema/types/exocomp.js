export default `
type Exocomp {
  id: ID
  simulatorId: ID
  class: String
  state: String
  completion: Float
  parts: [String]
  # Destination refers to a system
  destination: System
  logs: [ExocompLog]
  difficulty: Float
}

type ExocompLog {
  timestamp: Float
  message: String
}

input ExocompInput {
  id: ID
  simulatorId: ID
  parts: [String]
  # Destination refers to a system
  destination: ID
}
`;
