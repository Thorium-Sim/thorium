export default `
setTractorBeamState(id: ID!, state: Boolean!): String
setTractorBeamTarget(id: ID!, target: Boolean!): String
setTractorBeamStrength(id: ID!, strength: Float!): String
setTractorBeamStress(id: ID!, stress: Float!): String
setTractorBeamScanning(id: ID!, scanning: Boolean!):String
setTractorBeamTargetLabel(id: ID!, label: String!): String

#Macro: Tractor Beam: Add Target
addTractorTarget(id: ID!, label: String):String
#Macro: Tractor Beam: Remove Target
removeTractorTarget(id: ID!):String
`;
