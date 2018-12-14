export default `
addCommandLine(name:String!):String
renameCommandLine(id:ID!, name:String!):String
removeCommandLine(id:ID!):String
updateCommandLine(id: ID!, components:JSON, connections:JSON, values:JSON, config:JSON):String
executeCommandLine(simulatorId:ID!, command:String!, arg:String):String
`;
