export default `
addCommandLine(name:String!):String
renameCommandLine(id:ID!, name:String!):String
removeCommandLine(id:ID!):String
updateCommandLine(id: ID!, components:JSON, connections:JSON, values:JSON, config:JSON):String
`;
