export default `
addTrigger(name:String!):String
renameTrigger(id:ID!, name:String!):String
removeTrigger(id:ID!):String
updateTrigger(id: ID!, components:JSON, connections:JSON, values:JSON, config:JSON):String

#Macro: Triggers: Add trigger to simulator
addTriggerToSimulator(simulatorId:ID!, trigger:ID!):String

#Macro: Triggers: Remove trigger to simulator
removeTriggerFromSimulator(simulatorId:ID!, trigger:ID!):String
`;
