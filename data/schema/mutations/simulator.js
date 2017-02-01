export default `
#Macro: Rename Simulator
renameSimulator(
# {
#   "content":"Simulator",
#   "type":"select",
#   "query": "simulators(template: false){id, name}",
#   "queryName": "simulators",
#   "key":"id",
#   "value":"name"
# }
simulatorId: ID!, 

# {
#   "content":"Name",
#   "type":"text"
# }
name: String!): String

#Macro: Change Simulator Layout
changeSimulatorLayout(
# {
#   "content":"Simulator",
#   "type":"select",
#   "query": "simulators(template: false){id, name}",
#   "queryName": "simulators",
#   "key":"id",
#   "value":"name"
# }
simulatorId: ID!, 

# {
#   "content":"Layout",
#   "type":"select",
#   "varName":"Layouts"
# }
layout: String!): String

#Macro: Change Simulator Alert Level
changeSimulatorAlertLevel(
# {
#   "content":"Simulator",
#   "type":"select",
#   "query": "simulators(template: false){id, name}",
#   "queryName": "simulators",
#   "key":"id",
#   "value":"name"
# }
simulatorId: ID!, 

# {
#   "content":"Alert Level",
#   "type":"select",
#   "enum":["5","4","3","2","1","p"]
# }
alertLevel: String!): String

#Macro: Change Simulator Crew Count
changeSimulatorCrewCount(
# {
#   "content":"Simulator",
#   "type":"select",
#   "query": "simulators(template: false){id, name}",
#   "queryName": "simulators",
#   "key":"id",
#   "value":"name"
# }
simulatorId: ID!, 

# {
#   "content":"Crew Count",
#   "type":"text"
# }
crewCount: String!): String
`;