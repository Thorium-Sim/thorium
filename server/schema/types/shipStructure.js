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
  roles: [RoomRoles]
  gas: Boolean
  svgPath: String
  inventory: [InventoryItem]
  systems: [System]
}

enum RoomRoles {
  probe
  torpedo
  damageTeam
  securityTeam
  medicalTeam
}
union Location = Deck | Room

type InventoryItem {
  id: ID
  simulatorId: ID
  name: String
  
  # Use only for subqueries with Room
  count: Int
  metadata: InventoryMetadata
  roomCount: [RoomCount] 
  teamCount: [TeamCount] 
}

input InventoryItemInput {
  simulatorId: ID
  name: String
  metadata: InventoryMetadataInput
  roomCount: [RoomCountInput] 
  crewCount: [CrewCountInput]
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

input InventoryCount {
  inventory: ID
  count: Int
}

input InventoryMetadataInput {
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
type TeamCount {
  team: Team
  count: Int
}
input RoomCountInput {
  room: ID
  count: Int
}
input CrewCountInput {
  crew: ID
  count: Int
}
type TeamCountInput {
  team: ID
  count: Int
}
`;

// TODO: Maybe eventaully add edges to the hallway and room
