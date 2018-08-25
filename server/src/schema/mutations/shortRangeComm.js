export default `
commAddSignal(id: ID!, commSignalInput: CommSignalInput!):String
commUpdateSignal(id: ID!, commSignalInput: CommSignalInput!):String
commUpdateSignals(id: ID!, signals: [CommSignalInput]!):String
commRemoveSignal(id: ID!, signalId: ID!):String
commAddArrow(id: ID!, commArrowInput: CommArrowInput!):String
commRemoveArrow(id: ID!, arrowId: ID!):String
commConnectArrow(id: ID!, arrowId: ID!):String
commDisconnectArrow(id: ID!, arrowId: ID!):String
commUpdate(id: ID!, commUpdateInput: CommUpdateInput!):String
commHail(id: ID!):String
cancelHail(id: ID!, core: Boolean):String
connectHail(id: ID!):String

#Macro: Short Range: Add
addShortRangeComm(simulatorId: ID!, frequency: Float, signalName: String): String

#Macro: Short Range: Remove
removeShortRangeComm(simulatorId: ID!, frequency: Float, signalName: String): String

muteShortRangeComm(id:ID!, arrowId:ID!, mute:Boolean!):String
`;
