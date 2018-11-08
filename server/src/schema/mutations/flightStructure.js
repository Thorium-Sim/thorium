export default `
createMission(name: String!):String
removeMission(missionId: ID!):String
editMission(missionId: ID!, name: String, description: String):String
importMission(jsonString: String!):String



startFlight(name: String, simulators: [SimulatorInput!]!):String
createSimulator(name: String!,template: Boolean):String
#Macro: Reset Flight
resetFlight(flightId: ID!, full: Boolean): String
deleteFlight(flightId: ID!): String
pauseFlight(flightId:ID!): String
resumeFlight(flightId:ID!): String

removeSimulator(simulatorId: ID!):String

addTimelineStep(simulatorId: ID, missionId: ID, name: String!, description: String):ID
removeTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!):String
reorderTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, order: Int!):String
updateTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, name: String, description: String):String
addTimelineItemToTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItem: TimelineitemInput!):String
removeTimelineStepItem(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItemId: ID!): String
updateTimelineStepItem(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItemId: ID!, updateTimelineItem: TimelineitemInput!): String
triggerMacros(simulatorId: ID!, macros: [MacroInput]!): String
duplicateTimelineStep(missionId: ID!, timelineStepId: ID!):String

#Macro: Auto-Advance Timeline Step (Use with Delay)
autoAdvance(simulatorId: ID!, prev: Boolean): String

createStationSet(name: String!, simulatorId: ID!):String
removeStationSet(stationSetID: ID!):String
renameStationSet(stationSetID: ID!, name: String!):String
addStationToStationSet(stationSetID: ID!, stationName: String!):String
removeStationFromStationSet(stationSetID: ID!, stationName: String!):String
editStationInStationSet(stationSetID: ID!, stationName: String!, newStationName: String!):String
addCardToStation(stationSetID: ID!, stationName: String!, cardName: String!, cardComponent: String!, cardIcon: String):String
removeCardFromStation(stationSetID: ID!, stationName: String!, cardName: String!):String
editCardInStationSet(stationSetID: ID!, stationName: String!, cardName: String!, newCardName: String, cardComponent: String, cardIcon: String):String
setStationLogin(stationSetID: ID!, stationName: String!, login: Boolean!):String
setStationExecutive(stationSetID: ID!, stationName: String!, exec: Boolean!):String
toggleStationWidgets(stationSetID: ID!, stationName: String!, widget: String!, state: Boolean!): String
setStationDescription(stationSetID: ID!, stationName: String!, description: String!):String
setStationTraining(stationSetID: ID!, stationName: String!, training: String!):String
setStationAmbiance(stationSetID: ID!, stationName: String!, ambiance: String!):String

#Macro: Start Training Mode
trainingMode(simulatorId:ID!):String

#Macro: Set Alert Condition Lock
setAlertConditionLock(simulatorId: ID!, lock:Boolean!):String
`;
