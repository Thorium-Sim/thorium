export default `
addComputerCoreUser(id:ID!, user:ComputerCoreUserInput):String
removeComputerCoreUser(id:ID!, userId:ID!):String
restoreComputerCoreFile(id:ID!, fileId:ID, all:Boolean, level: Int):String
deleteComputerCoreVirus(id:ID!, virusId:ID!):String
restartComputerCoreTerminal(id:ID!, terminalId:ID!):String
`;
