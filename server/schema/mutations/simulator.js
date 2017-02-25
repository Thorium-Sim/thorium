export default `
#Macro: Rename Simulator
renameSimulator(
simulatorId: ID!, 

# {
#   "content":"Name",
#   "type":"text"
# }
name: String!): String

#Macro: Change Simulator Layout
changeSimulatorLayout(
simulatorId: ID!, 

# {
#   "content":"Layout",
#   "type":"select",
#   "varName":"Layouts"
# }
layout: String!): String

#Macro: Change Simulator Alert Level
changeSimulatorAlertLevel(
simulatorId: ID!, 

# {
#   "content":"Alert Level",
#   "type":"select",
#   "enum":["5","4","3","2","1","p"]
# }
alertLevel: String!): String

#Macro: Change Simulator Crew Count
changeSimulatorCrewCount(
simulatorId: ID!, 

# {
#   "content":"Crew Count",
#   "type":"text"
# }
crewCount: Int!): String
`;
