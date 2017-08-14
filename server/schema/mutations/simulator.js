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

shipDockingChange(simulatorId: ID!, which: String!, state: Boolean!): String

remoteAccessSendCode(simulatorId: ID!, code: String!, station: String!): String
remoteAccessUpdateCode(simulatorId: ID!, codeId: ID!, state: String!): String

setSelfDestructTime(simulatorId: ID!, time: Float): String
setSelfDestructCode(simulatorId: ID!, code: String): String
setSelfDestructAuto(simulatorId: ID!, auto: Boolean): String
`;
