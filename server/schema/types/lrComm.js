export default `
type LRCommunications {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  name: String
  messages: [LRMessage]
}
type LRMessage {
  id: ID
  message: String
  decodedMessage: String
  # True: This is a message to the crew, else a message to the control room
  crew: Boolean
  sender: String
  datestamp: String
  a: Int
  f: Int
  ra: Int
  rf: Int
}
`;