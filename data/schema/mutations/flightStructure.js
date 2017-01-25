export default `
createMission(name: String!):String
removeMission(missionId: ID!):String
editMission(missionId: ID!, name: String, description: String, simulators: [String]):String
startFlight(missionID: ID!, stationSets:[ID]):String
createTemplateSimulator(name: String!):String
addTimelineStepToSimulator(simulatorId: ID!, name: String!, description: String):String
addTimelineItemToTimelineStep(simulatorId: ID!, timelineStepID: ID!, timelineItem: TimelineitemInput):String
removeTemplateSimulator(simulatorId: ID!):String


createStationSet(name: String!):String
removeStationSet(stationSetID: ID!):String
addStationToStationSet(stationSetID: ID!, stationName: String!):String
removeStationFromStationSet(stationSetID: ID!, stationName: String!):String
#editStationInStationSet(stationSetID: ID!, stationName: String!, newStationName: String!):String
addCardToStation(stationSetID: ID!, stationName: String!, cardName: String!, cardComponent: String!, cardIcon: String):String
removeCardFromStation(stationSetID: ID!, stationName: String!, cardName: String!):String
#editCardInStationSet(stationSetID: ID!, stationName: String!, cardName: String!, newCardName: String!, cardComponent: String, cardIcon: String):String
`;
