export default `
  createTargetingContact(id: ID!, targetClass: ID!):String
  targetTargetingContact(id: ID!, targetId: ID!):String
  untargetTargetingContact(id: ID!, targetId: ID!):String
  targetSystem(id: ID!, targetId: ID!, system: String!):String
  removeTarget(id: ID!, targetId: ID!):String
  addTargetClass(id: ID!, classInput: TargetClassInput!): String
  removeTargetClass(id: ID!, classId: ID!): String
  updateTargetClass(id: ID!, classInput: TargetClassInput!): String
  setTargetClassCount(id: ID!, classId: ID!, count: Int!): String
  setCoordinateTargeting(id: ID!, which: Boolean!): String
  setTargetingCalculatedTarget(id: ID, simulatorId: ID,  coordinates:CoordinatesInput, contactId: ID): String
  setTargetingEnteredTarget(id: ID!, coordinates:StringCoordinatesInput): String
  #Macro: Targeting: Clear Targeting Classes
  clearAllTargetingContacts(id:ID!):String
  setTargetingRange(id:ID!, range:Float!):String

  #Macro: Targeting: Set Targeting Classes
  setTargetingClasses(id:ID!, classInput:[TargetClassInput]!):String
`;
