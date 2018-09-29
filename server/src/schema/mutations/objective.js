export default `
#Macro: Objective: Add Objective
addObjective(objective:ObjectiveInput!):String
#Macro: Objective: Complete Objective
completeObjective(id:ID!, title:String, state: Boolean, cancel: Boolean):String
`;
