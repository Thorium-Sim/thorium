export default `
#Macro: Rename Simulator
renameSimulator(
simulatorId: ID!, 
name: String!): String

#Macro: Simulator Layout
changeSimulatorLayout(
simulatorId: ID!, 
layout: String!): String

changeSimulatorCaps(simulatorId: ID!, caps: Boolean!):String

#Macro: Alert Level
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
updateSimulatorPanels(simulatorId: ID!, panels: [ID]!):String
setStepDamage(simulatorId:ID!, stepDamage:Boolean!):String
setVerifyDamage(simulatorId:ID!, verifyStep:Boolean!):String
setBridgeMessaging(id:ID!, messaging:Boolean!):String
setSimulatorAssets(id:ID!, assets:SimulatorAssetsInput!):String
updateSimulatorLighting(id:ID!, lighting: LightingInput!):String
addSimulatorAmbiance(id: ID!, name: String!):String
updateSimulatorAmbiance(id: ID!, ambiance: AmbianceInput!):String
removeSimulatorAmbiance(id: ID!, ambianceId: ID!):String

## Stations
addSimulatorStationCard(simulatorId: ID!, station: String!, cardName: String!, cardComponent: String!):String
removeSimulatorStationCard(simulatorId: ID!, station: String!, cardName: String!):String
editSimulatorStationCard(simulatorId: ID!, station: String!, cardName: String!, newCardName: String, cardComponent: String):String
setSimulatorStationMessageGroup(simulatorId: ID!, station: String!,group: String!, state: Boolean!):String
setSimulatorStationLogin(simulatorId: ID!, station: String!, login: Boolean!):String
setSimulatorStationExecutive(simulatorId: ID!, station: String!, exec: Boolean!):String
setSimulatorStationWidget(simulatorId: ID!, station: String!, widget: String!, state: Boolean!):String
`;
