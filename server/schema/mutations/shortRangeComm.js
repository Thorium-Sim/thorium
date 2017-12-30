export default `
commAddSignal(id: ID!, commSignalInput: CommSignalInput!):String
commUpdateSignal(id: ID!, commSignalInput: CommSignalInput!):String
commRemoveSignal(id: ID!, signalId: ID!):String
commAddArrow(id: ID!, commArrowInput: CommArrowInput!):String
commRemoveArrow(id: ID!, arrowId: ID!):String
commConnectArrow(id: ID!, arrowId: ID!):String
commDisconnectArrow(id: ID!, arrowId: ID!):String
commUpdate(id: ID!, commUpdateInput: CommUpdateInput!):String
commHail(id: ID!):String
cancelHail(id: ID!):String
connectHail(id: ID!):String

#Macro: Add a short range comm
addShortRangeComm(simulatorId: ID!, frequency: Float, signalName: String): String

#Macro: Remove a short range comm
removeShortRangeComm(simulatorId: ID!, frequency: Float, signalName: String): String

`;
