export default `
addDeck(simulatorId: ID!, number: Int!, svgPath: String, doors: Boolean, evac: Boolean): String
removeDeck(deckId: ID!): String
#Macro: Add decks
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

addRoom(simulatorId: ID!, deckId: ID! name: String!, svgPath: String): String
removeRoom(roomId: ID!): String

#Macro: Add rooms
addRoomsBulk(simulatorId: ID!, 
  # {
  #   "content":"Rooms (JSON Array)",
  #   "type":"text"
  # }
  rooms: String!): String
renameRoom(roomId: ID!, name: String!): String
updateRoomSvg(roomId: ID!, svg: String!): String
roomGas(roomId: ID!, gas: Boolean): String

### Inventory
addInventory(inventory: InventoryInput): String
moveInventory(): String
updateInventoryCount(): String
updateInventoryMetadata(): String
`;
