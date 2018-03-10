export default `
decksUpdate(simulatorId: ID!):[Deck]
roomsUpdate(simulatorId: ID!, role: RoomRoles):[Room]
inventoryUpdate(simulatorId: ID!):[InventoryItem]
`;
