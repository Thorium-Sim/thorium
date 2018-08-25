export default `
addDeck(simulatorId: ID!, number: Int!, svgPath: String, doors: Boolean, evac: Boolean): String
removeDeck(deckId: ID!): String
addDecksBulk(simulatorId: ID!, 

  # {
  #   "content":"Decks (JSON Array)",
  #   "type":"text"
  # }
decks: String!): String
updateDeckSvg(deckId: ID!, svg: String!): String
deckDoors(deckId: ID!, doors: Boolean): String
deckEvac(deckId: ID!, evac: Boolean): String
updateHallwaySvg(deckId: ID!, svg: String): String

addRoom(simulatorId: ID!, deckId: ID, deckNumber: Int, name: String!, svgPath: String): String
removeRoom(roomId: ID!): String

addRoomsBulk(simulatorId: ID!, 
  # {
  #   "content":"Rooms (JSON Array)",
  #   "type":"text"
  # }
  rooms: String!): String
renameRoom(roomId: ID!, name: String!): String
updateRoomRoles(roomId: ID!, roles: [RoomRoles]): String
updateRoomSvg(roomId: ID!, svg: String!): String
roomGas(roomId: ID!, gas: Boolean): String
importRooms(simulatorId: ID!, rooms:[RoomInput]!): String

### Inventory
addInventory(inventory: InventoryItemInput): String
removeInventory(id: ID): String
moveInventory(id: ID!, fromRoom: ID!, toRoom: ID!, count: Int!, toSimulator: ID): String
updateInventoryCount(id: ID!, room: ID!, count: Int!): String
updateInventoryMetadata(id: ID, metadata: InventoryMetadataInput): String
updateCrewInventory(crewId:ID!, inventory:[InventoryCount]!, roomId:ID):String
removeCrewInventory(crewId:ID!, inventory:[InventoryCount]!, roomId:ID!):String
`;
