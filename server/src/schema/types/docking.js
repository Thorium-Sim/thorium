export default `
type DockingPort {
  id: ID
  simulatorId: ID
  name: String
  shipName: String
  type: DOCKING_TYPES
  clamps: Boolean
  compress: Boolean
  doors: Boolean
  image: String
  docked: Boolean
  damage: Damage
  direction: DOCKING_DIRECTION
  position: Coordinates
  deck: Deck
  inventory: [InventoryItem]
}

input DockingPortInput {
  id: ID
  simulatorId: ID
  name: String
  shipName: String
  type: String
  clamps: Boolean
  compress: Boolean
  doors: Boolean
  image: String
  docked: Boolean
  direction: DOCKING_DIRECTION
  position: CoordinatesInput
  deckId: ID
}

enum DOCKING_TYPES {
  shuttlebay
  dockingport
  specialized
}

enum DOCKING_DIRECTION {
  unspecified
  arriving
  departing
}
`;
