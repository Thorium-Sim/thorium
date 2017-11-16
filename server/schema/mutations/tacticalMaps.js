export default `
  updateTacticalMap(id:ID!):String
  freezeTacticalMap(id: ID!):String
  duplicateTacticalMap(id: ID!, name: String!):String
  loadTacticalMap(id: ID!, flightId: ID!):String

  addTacticalMapLayer(mapId: ID!):String
  updateTacticalMapLayer(mapId: ID!):String
  removeTacticalMapLayer(mapId: ID!):String

  addTacticalMapItem(mapId: ID!, layerId: ID!):String
  updateTacticalMapItem(mapId: ID!, layerId: ID!):String
  removeTacticalMapItem(mapId: ID!, layerId: ID!, itemId: ID!): String
`;
