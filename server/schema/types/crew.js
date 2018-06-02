export default `
type Crew {
  id: ID
  simulatorId: ID
  firstName: String
  lastName: String
  name: String
  gender: String
  age: Int
  rank: String
  position: String
  killed: Boolean
  workRoom: Room
  restRoom: Room
  inventory: [InventoryItem]
  notes: String
}

input CrewInput {
  id: ID
  simulatorId: ID
  firstName: String
  lastName: String
  gender: String
  age: String
  rank: String
  position: String
  killed: Boolean
  workRoom: Int
  restRoom: Int
  notes: String
}
`;

// TODO: Potentially make position a type
