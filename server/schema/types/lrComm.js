export default `
type LRCommunications {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  name: String
  damage: Damage
  messages(crew: Boolean, sent: Boolean, approved:Boolean): [LRMessage]
  satellites: Int
  
  #Interception Properties
  interception: Boolean
  locked: Boolean
  decoded: Boolean
}
type LRMessage {
  id: ID
  message: String
  decodedMessage: String
  # True: This is a message to the crew, else a message to the control room
  crew: Boolean
  sent: Boolean
  deleted: Boolean
  encrypted: Boolean
  approved: Boolean
  sender: String
  datestamp: String
  a: Int
  f: Int
  ra: Int
  rf: Int
}

input LongRangeCommInput {
  id: ID
  interception: Boolean
  locked: Boolean
  decoded: Boolean
}
`;

/*
  #Messages from the crew to the control room
  outgoingMessages: [LRMessage]
  #Messages from the control room to the crew
  incomingMessages: [LRMessage]
  */
