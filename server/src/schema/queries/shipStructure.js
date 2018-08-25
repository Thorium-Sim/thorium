export default `
decks(simulatorId: ID!, number: Int):[Deck]
rooms(simulatorId: ID, deck: ID, name: String, role: RoomRoles):[Room]
inventory(simulatorId: ID, id: ID, name: String, deck: ID, room: ID):[InventoryItem]

`;
