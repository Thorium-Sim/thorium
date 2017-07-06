export default `
createMission(name: String!):String
removeMission(missionId: ID!):String
editMission(missionId: ID!, name: String, description: String, simulators: [String]):String

startFlight(name: String, simulators: [SimulatorInput!]!):String

#Macro: Create a simulator
createSimulator(
  # {
  #   "content":"Name",
  #   "type":"text"
  # }
  name: String!,

  template: Boolean):String

#Macro: Remove a simulator
removeSimulator(
  # {
  #   "content":"Simulator",
  #   "type":"select",
  #   "query": "simulators(template: false){id, name}",
  #   "queryName": "simulators",
  #   "key":"id",
  #   "value":"name"
  # }
  simulatorId: ID!):String

addTimelineStep(simulatorId: ID, missionId: ID, name: String!, description: String):String
removeTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!):String
reorderTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, order: Int!):String
updateTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, name: String, description: String):String
addTimelineItemToTimelineStep(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItem: TimelineitemInput!):String
removeTimelineStepItem(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItemId: ID!): String
updateTimelineStepItem(simulatorId: ID, missionId: ID, timelineStepId: ID!, timelineItemId: ID!, updateTimelineItem: TimelineitemInput!): String

createStationSet(name: String!, simulatorId: ID!):String
removeStationSet(stationSetID: ID!):String
renameStationSet(stationSetID: ID!, name: String!):String
addStationToStationSet(stationSetID: ID!, stationName: String!):String
removeStationFromStationSet(stationSetID: ID!, stationName: String!):String
editStationInStationSet(stationSetID: ID!, stationName: String!, newStationName: String!):String
addCardToStation(stationSetID: ID!, stationName: String!, cardName: String!, cardComponent: String!, cardIcon: String):String
#Macro: Removes the card from the station
removeCardFromStation(stationSetID: ID!, stationName: String!, cardName: String!):String
editCardInStationSet(stationSetID: ID!, stationName: String!, cardName: String!, newCardName: String, cardComponent: String, cardIcon: String):String
`;
