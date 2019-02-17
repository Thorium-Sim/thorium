export default `
toggleAutoUpdate(autoUpdate:Boolean!):String
triggerAutoUpdate:String
setTrackingPreference(pref:Boolean!):String
importTaskTemplates:String
setSpaceEdventuresToken(token:String!):SpaceEdventuresCenter

#Macro: Space EdVentures: Assign Space EdVentures Badge
assignSpaceEdventuresBadge(badgeId: ID!):String

#Macro: Space EdVentures: Assign Space EdVentures Mission
assignSpaceEdventuresMission(badgeId: ID!):String

assignSpaceEdventuresFlightRecord(flightId: ID!): String
`;
