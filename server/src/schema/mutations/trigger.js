export default `
addTrigger(name:String!):String
renameTrigger(id:ID!, name:String!):String
removeTrigger(id:ID!):String
updateTrigger(id: ID!, components:JSON, connections:JSON, values:JSON, config:JSON):String

addTriggerToSimulator(simulatorId:ID!, trigger:ID!):String
removeTriggerFromSimulator(simulatorId:ID!, trigger:ID!):String
`;
