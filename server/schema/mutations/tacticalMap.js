export default `
  newTacticalMap(name: String!, flightId: ID):String
  updateTacticalMap(id:ID!):String
  freezeTacticalMap(id: ID!):String
  duplicateTacticalMap(id: ID!, name: String!):String
  loadTacticalMap(id: ID!, flightId: ID!):String

  addTacticalMapLayer(mapId: ID!, name: String!):String
  updateTacticalMapLayer(mapId: ID!, layer: TacticalLayerInput!):String
  reorderTacticalMapLayer(mapId: ID!, layer: ID!, order: Int!):String
  removeTacticalMapLayer(mapId: ID!, layerId: ID!):String

  addTacticalMapItem(mapId: ID!, layerId: ID!, item: TacticalItemInput!):String
  updateTacticalMapItem(mapId: ID!, layerId: ID!, item: TacticalItemInput!):String
  removeTacticalMapItem(mapId: ID!, layerId: ID!, itemId: ID!): String
`;
