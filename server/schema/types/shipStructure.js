export default `
type Deck {
  id: ID
  simulatorId: ID
  number: Int
  svgPath: String
  doors: Boolean
  evac: Boolean
  rooms: [Room]
  hallway: String
}

type Room {
  id: ID
  simulatorId: ID
  deck: Deck
  name: String
  gas: Boolean
  svgPath: String
}

type InventoryItem {
  id: ID
  simulatorId: ID
  name: String
  metadata: InventoryMetadata
  roomCount: [RoomCount] 
}

type InventoryMetadata {
  type: String
  size: Int
  description: String
  image: String

  # For Probes
  science: Boolean
  # For Probes
  defense: Boolean

}

type RoomCount {
  room: Room
  count: Int
}
`;

// TODO: Maybe eventaully add edges to the hallway and room
