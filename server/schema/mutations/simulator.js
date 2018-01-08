export default `
#Macro: Rename Simulator
renameSimulator(
simulatorId: ID!, 
name: String!): String

#Macro: Change Simulator Layout
changeSimulatorLayout(
simulatorId: ID!, 
layout: String!): String

#Macro: Change Simulator Alert Level
changeSimulatorAlertLevel(
simulatorId: ID!, 
alertLevel: String!): String

changeSimulatorExocomps(simulatorId: ID!, exocomps: Int!): String
changeSimulatorBridgeCrew(simulatorId: ID!, crew: Int!): String
changeSimulatorRadiation(simulatorId: ID!, radiation: Float!):String
setSimulatorTimelineStep(simulatorId: ID!, step: Int!): String

shipDockingChange(simulatorId: ID!, which: String!, state: Boolean!): String

remoteAccessSendCode(simulatorId: ID!, code: String!, station: String!): String
remoteAccessUpdateCode(simulatorId: ID!, codeId: ID!, state: String!): String

setSelfDestructTime(simulatorId: ID!, time: Float): String
setSelfDestructCode(simulatorId: ID!, code: String): String
setSelfDestructAuto(simulatorId: ID!, auto: Boolean): String

addSimulatorDamageStep(simulatorId: ID!, step: DamageStepInput!): String
updateSimulatorDamageStep(simulatorId: ID!, step: DamageStepInput!): String
removeSimulatorDamageStep(simulatorId: ID!, step: ID!):String

setSimulatorMission(simulatorId: ID!, missionId: ID!): String
`;
