export default `
addCommandLine(name:String!):String
renameCommandLine(id:ID!, name:String!):String
removeCommandLine(id:ID!):String
updateCommandLine(id: ID!, components:JSON, connections:JSON, values:JSON, config:JSON):String
executeCommandLine(simulatorId:ID!, command:String!, arg:String):String
#Macro: Command Line: Add command line
addCommandLineToSimulator(simulatorId:ID!, commandLine:ID!):String
#Macro: Command Line: Remove command line
removeCommandLineFromSimulator(simulatorId:ID!, commandLine:ID!):String
`;
