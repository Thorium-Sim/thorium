export default `
decks(simulatorId: ID!, number: Int):[Deck]
rooms(simulatorId: ID, deck: ID, name: String):[Room]
inventory(simulatorId: ID, id: ID, deck: ID, room: ID):[InventoryItem]

`;
